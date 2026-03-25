import { z } from "zod";

export const ProjectStatusEnum = z.enum([
  "submitted",
  "in_review",
  "in_progress",
  "needs_feedback",
  "delivered",
  "cancelled",
]);
export type ProjectStatusEnum = z.infer<typeof ProjectStatusEnum>;

export const ProjectTypeEnum = z.enum([
  "logo_design",
  "brand_identity",
  "web_design",
  "social_media",
  "print_design",
  "illustration",
  "other",
]);
export type ProjectTypeEnum = z.infer<typeof ProjectTypeEnum>;

export const BriefTodo = z.object({
  id: z.string(),
  text: z.string(),
  done: z.boolean(),
});
export type BriefTodo = z.infer<typeof BriefTodo>;

export const ProjectFile = z.object({
  id: z.number(),
  projectId: z.number(),
  filename: z.string(),
  originalName: z.string(),
  mimeType: z.string(),
  size: z.number(),
  driveFileId: z.string(),
  driveWebViewLink: z.string(),
  uploadedBy: z.string(),
  createdAt: z.string(),
});
export type ProjectFile = z.infer<typeof ProjectFile>;

export const ProjectTask = z.object({
  id: z.number(),
  projectId: z.number(),
  title: z.string(),
  completed: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type ProjectTask = z.infer<typeof ProjectTask>;

export const Project = z.object({
  id: z.number(),
  clientName: z.string(),
  clientEmail: z.string(),
  title: z.string(),
  description: z.string(),
  projectType: ProjectTypeEnum,
  status: ProjectStatusEnum,
  adminNotes: z.string().nullable(),
  deadline: z.string().nullable(),
  briefTodos: z.array(BriefTodo),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Project = z.infer<typeof Project>;

export const ProjectWithFiles = Project.extend({
  files: z.array(ProjectFile),
});
export type ProjectWithFiles = z.infer<typeof ProjectWithFiles>;

export const HealthCheckResponse = z.object({
  status: z.literal("ok"),
});
export type HealthCheckResponse = z.infer<typeof HealthCheckResponse>;

export const ListProjectsQueryParams = z.object({
  status: ProjectStatusEnum.optional(),
  clientEmail: z.string().optional(),
});
export type ListProjectsQueryParams = z.infer<typeof ListProjectsQueryParams>;

export const CreateProjectBody = z.object({
  clientName: z.string().min(1),
  clientEmail: z.string().email(),
  title: z.string().min(1),
  description: z.string().min(1),
  projectType: ProjectTypeEnum,
  deadline: z.string().nullable().optional(),
});
export type CreateProjectBody = z.infer<typeof CreateProjectBody>;

export const UpdateProjectBody = z.object({
  status: ProjectStatusEnum.optional(),
  adminNotes: z.string().nullable().optional(),
  deadline: z.string().nullable().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  briefTodos: z.array(BriefTodo).optional(),
});
export type UpdateProjectBody = z.infer<typeof UpdateProjectBody>;

export const GetProjectParams = z.object({
  id: z.number().int().positive(),
});
export type GetProjectParams = z.infer<typeof GetProjectParams>;

export const UpdateProjectParams = z.object({
  id: z.number().int().positive(),
});
export type UpdateProjectParams = z.infer<typeof UpdateProjectParams>;

export const ListProjectFilesParams = z.object({
  id: z.number().int().positive(),
});
export type ListProjectFilesParams = z.infer<typeof ListProjectFilesParams>;

export const UploadProjectFileParams = z.object({
  id: z.number().int().positive(),
});
export type UploadProjectFileParams = z.infer<typeof UploadProjectFileParams>;

export const UploadProjectFileBody = z.object({
  uploadedBy: z.string().optional(),
});
export type UploadProjectFileBody = z.infer<typeof UploadProjectFileBody>;

export const GetAdminStatsResponse = z.object({
  totalProjects: z.number(),
  byStatus: z.record(z.string(), z.number()),
  recentProjects: z.array(Project),
});
export type GetAdminStatsResponse = z.infer<typeof GetAdminStatsResponse>;
