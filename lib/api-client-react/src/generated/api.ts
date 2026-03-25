import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";

export type ProjectStatus =
  | "submitted"
  | "in_review"
  | "in_progress"
  | "needs_feedback"
  | "delivered"
  | "cancelled";

export const ProjectStatus = {
  submitted: "submitted" as ProjectStatus,
  in_review: "in_review" as ProjectStatus,
  in_progress: "in_progress" as ProjectStatus,
  needs_feedback: "needs_feedback" as ProjectStatus,
  delivered: "delivered" as ProjectStatus,
  cancelled: "cancelled" as ProjectStatus,
};

export type ProjectType =
  | "logo_design"
  | "brand_identity"
  | "web_design"
  | "social_media"
  | "print_design"
  | "illustration"
  | "other";

export const ProjectType = {
  logo_design: "logo_design" as ProjectType,
  brand_identity: "brand_identity" as ProjectType,
  web_design: "web_design" as ProjectType,
  social_media: "social_media" as ProjectType,
  print_design: "print_design" as ProjectType,
  illustration: "illustration" as ProjectType,
  other: "other" as ProjectType,
};

export interface BriefTodo {
  id: string;
  text: string;
  done: boolean;
}

export interface ProjectFile {
  id: number;
  projectId: number;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  driveFileId: string;
  driveWebViewLink: string;
  uploadedBy: string;
  createdAt: string;
}

export interface ProjectTask {
  id: number;
  projectId: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  clientName: string;
  clientEmail: string;
  title: string;
  description: string;
  projectType: ProjectType;
  status: ProjectStatus;
  adminNotes: string | null;
  deadline: string | null;
  briefTodos: BriefTodo[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectWithFiles extends Project {
  files: ProjectFile[];
}

export interface AdminStats {
  totalProjects: number;
  byStatus: Record<string, number>;
  recentProjects: Project[];
}

export interface CreateProjectBody {
  clientName: string;
  clientEmail: string;
  title: string;
  description: string;
  projectType: ProjectType;
  deadline?: string | null;
}

export interface UpdateProjectBody {
  status?: ProjectStatus;
  adminNotes?: string | null;
  deadline?: string | null;
  title?: string;
  description?: string;
  briefTodos?: BriefTodo[];
}

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${text}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export function useListProjects(
  params?: { status?: ProjectStatus; clientEmail?: string },
  options?: Omit<UseQueryOptions<Project[]>, "queryKey" | "queryFn">,
) {
  const searchParams = new URLSearchParams();
  if (params?.status) searchParams.set("status", params.status);
  if (params?.clientEmail) searchParams.set("clientEmail", params.clientEmail);
  const qs = searchParams.toString();
  return useQuery<Project[]>({
    queryKey: ["projects", params],
    queryFn: () => apiFetch<Project[]>(`/api/projects${qs ? `?${qs}` : ""}`),
    ...options,
  });
}

export function useGetProject(
  id: number | undefined,
  options?: Omit<UseQueryOptions<ProjectWithFiles>, "queryKey" | "queryFn">,
) {
  return useQuery<ProjectWithFiles>({
    queryKey: ["projects", id],
    queryFn: () => apiFetch<ProjectWithFiles>(`/api/projects/${id}`),
    enabled: id !== undefined,
    ...options,
  });
}

export function useCreateProject(
  options?: UseMutationOptions<Project, Error, CreateProjectBody>,
) {
  const qc = useQueryClient();
  return useMutation<Project, Error, CreateProjectBody>({
    mutationFn: (body) =>
      apiFetch<Project>("/api/projects", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["projects"] });
    },
    ...options,
  });
}

export function useUpdateProject(
  options?: UseMutationOptions<
    Project,
    Error,
    { id: number; body: UpdateProjectBody }
  >,
) {
  const qc = useQueryClient();
  return useMutation<Project, Error, { id: number; body: UpdateProjectBody }>({
    mutationFn: ({ id, body }) =>
      apiFetch<Project>(`/api/projects/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      }),
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({ queryKey: ["projects", vars.id] });
      void qc.invalidateQueries({ queryKey: ["projects"] });
    },
    ...options,
  });
}

export function useListProjectFiles(
  projectId: number | undefined,
  options?: Omit<UseQueryOptions<ProjectFile[]>, "queryKey" | "queryFn">,
) {
  return useQuery<ProjectFile[]>({
    queryKey: ["projects", projectId, "files"],
    queryFn: () => apiFetch<ProjectFile[]>(`/api/projects/${projectId}/files`),
    enabled: projectId !== undefined,
    ...options,
  });
}

export function useUploadProjectFile(
  options?: UseMutationOptions<
    ProjectFile,
    Error,
    { projectId: number; file: File; uploadedBy?: string }
  >,
) {
  const qc = useQueryClient();
  return useMutation<
    ProjectFile,
    Error,
    { projectId: number; file: File; uploadedBy?: string }
  >({
    mutationFn: ({ projectId, file, uploadedBy }) => {
      const formData = new FormData();
      formData.append("file", file);
      if (uploadedBy) formData.append("uploadedBy", uploadedBy);
      return fetch(`/api/projects/${projectId}/upload`, {
        method: "POST",
        body: formData,
      }).then((res) => {
        if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
        return res.json() as Promise<ProjectFile>;
      });
    },
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({
        queryKey: ["projects", vars.projectId, "files"],
      });
    },
    ...options,
  });
}

export function useDeleteFile(
  options?: UseMutationOptions<void, Error, number>,
) {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (fileId) =>
      apiFetch<void>(`/api/files/${fileId}`, { method: "DELETE" }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["projects"] });
    },
    ...options,
  });
}

export function useGetAdminStats(
  options?: Omit<UseQueryOptions<AdminStats>, "queryKey" | "queryFn">,
) {
  return useQuery<AdminStats>({
    queryKey: ["admin", "stats"],
    queryFn: () => apiFetch<AdminStats>("/api/admin/stats"),
    ...options,
  });
}

export function useGetProjectTasks(
  projectId: number | undefined,
  options?: Omit<UseQueryOptions<ProjectTask[]>, "queryKey" | "queryFn">,
) {
  return useQuery<ProjectTask[]>({
    queryKey: ["projects", projectId, "tasks"],
    queryFn: () =>
      apiFetch<ProjectTask[]>(`/api/projects/${projectId}/tasks`),
    enabled: projectId !== undefined,
    ...options,
  });
}

export function useCreateProjectTask(
  options?: UseMutationOptions<
    ProjectTask,
    Error,
    { projectId: number; title: string }
  >,
) {
  const qc = useQueryClient();
  return useMutation<ProjectTask, Error, { projectId: number; title: string }>({
    mutationFn: ({ projectId, title }) =>
      apiFetch<ProjectTask>(`/api/projects/${projectId}/tasks`, {
        method: "POST",
        body: JSON.stringify({ title }),
      }),
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({
        queryKey: ["projects", vars.projectId, "tasks"],
      });
    },
    ...options,
  });
}

export function useUpdateProjectTask(
  options?: UseMutationOptions<
    ProjectTask,
    Error,
    { taskId: number; title?: string; completed?: boolean; projectId: number }
  >,
) {
  const qc = useQueryClient();
  return useMutation<
    ProjectTask,
    Error,
    { taskId: number; title?: string; completed?: boolean; projectId: number }
  >({
    mutationFn: ({ taskId, title, completed }) =>
      apiFetch<ProjectTask>(`/api/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({ title, completed }),
      }),
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({
        queryKey: ["projects", vars.projectId, "tasks"],
      });
    },
    ...options,
  });
}

export function useDeleteProjectTask(
  options?: UseMutationOptions<
    void,
    Error,
    { taskId: number; projectId: number }
  >,
) {
  const qc = useQueryClient();
  return useMutation<void, Error, { taskId: number; projectId: number }>({
    mutationFn: ({ taskId }) =>
      apiFetch<void>(`/api/tasks/${taskId}`, { method: "DELETE" }),
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({
        queryKey: ["projects", vars.projectId, "tasks"],
      });
    },
    ...options,
  });
}
