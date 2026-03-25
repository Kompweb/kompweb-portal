import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useParams, Link, useLocation } from "wouter";
import {
  useGetProject, useUploadProjectFile, ProjectStatus,
  useGetProjectTasks, useCreateProjectTask, useUpdateProjectTask, useDeleteProjectTask,
  useUpdateProject, useDeleteFile,
} from "@workspace/api-client-react";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import {
  FileText, UploadCloud, Download, FileArchive, FileSearch,
  Calendar, User, Tag, Clock, ArrowLeft, Loader2, CheckCheck, AlertCircle,
  Image, FileVideo, FileAudio, FileCode, File,
  ListChecks, Plus, Trash2, Check, Pencil, X as XIcon,
} from "lucide-react";

const IMAGE_EXTS = ["png","jpg","jpeg","gif","webp","avif","heic","bmp","tiff"];
const URL_SPLIT = /(\bhttps?:\/\/[^\s<>"']+)/g;

function linkifyText(text: string) {
  const parts = text.split(URL_SPLIT);
  return parts.map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline underline-offset-2 break-all hover:text-blue-700 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function isImageFile(name: string) {
  return IMAGE_EXTS.includes(name.split(".").pop()?.toLowerCase() ?? "");
}

function getFileIcon(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (IMAGE_EXTS.includes(ext))      return { Icon: Image,     color: "text-sky-400" };
  if (["mp4","mov","avi","mkv","webm"].includes(ext)) return { Icon: FileVideo, color: "text-violet-400" };
  if (["mp3","wav","aac","flac","ogg"].includes(ext)) return { Icon: FileAudio, color: "text-pink-400" };
  if (["zip","rar","tar","gz","7z"].includes(ext))    return { Icon: FileArchive, color: "text-amber-400" };
  if (["pdf"].includes(ext))          return { Icon: FileText,  color: "text-red-400" };
  if (["js","ts","tsx","jsx","html","css","json","py","php"].includes(ext)) return { Icon: FileCode, color: "text-green-400" };
  return { Icon: File, color: "text-white/30" };
}

const STATUS_STEPS = [
  { id: ProjectStatus.submitted,      label: "Submitted"   },
  { id: ProjectStatus.in_review,      label: "In Review"   },
  { id: ProjectStatus.in_progress,    label: "In Progress" },
  { id: ProjectStatus.needs_feedback, label: "Feedback"    },
  { id: ProjectStatus.delivered,      label: "Delivered"   },
];

function getStepIndex(status: ProjectStatus) {
  const idx = STATUS_STEPS.findIndex(s => s.id === status);
  return idx === -1 ? 0 : idx;
}

function ProjectStepper({ currentStatus }: { currentStatus: ProjectStatus }) {
  if (currentStatus === ProjectStatus.cancelled) {
    return (
      <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
        <AlertCircle size={14} /> This project has been cancelled.
      </div>
    );
  }

  const currentIndex = getStepIndex(currentStatus);
  const pct = (currentIndex / (STATUS_STEPS.length - 1)) * 100;

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-0 right-0 top-3.5 h-px bg-white/10">
          <div
            className="h-full bg-white/60 transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        {STATUS_STEPS.map((step, idx) => {
          const done    = idx < currentIndex;
          const current = idx === currentIndex;
          const ahead   = idx > currentIndex;
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-300
                  ${done    ? "bg-white border-white text-black" :
                    current ? "bg-white/20 border-white text-white ring-2 ring-white/20 scale-110" :
                              "bg-[#111] border-white/15 text-white/30"}`}
              >
                {done ? <CheckCheck size={10} /> : idx + 1}
              </div>
              <span className={`text-[10px] font-medium tracking-wide whitespace-nowrap
                ${current ? "text-white" : ahead ? "text-white/25" : "text-white/50"}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getSession(): { name: string; email: string } | null {
  try {
    const raw = sessionStorage.getItem("kw_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function ProjectView() {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || "0", 10);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [rightTab, setRightTab] = useState<"files" | "tasks">("files");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskText, setEditingTaskText] = useState("");
  const [, setLocation] = useLocation();
  const [editingBrief, setEditingBrief] = useState(false);
  const [briefDraft, setBriefDraft] = useState("");
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState("");
  const [confirmDeleteFileId, setConfirmDeleteFileId] = useState<number | null>(null);
  const [newTodoText, setNewTodoText] = useState("");

  const { data: project, isLoading, error } = useGetProject(projectId);
  const { data: tasks = [], isLoading: tasksLoading } = useGetProjectTasks(projectId);

  /* ── File upload ── */
  const { mutate: uploadFile, isPending: isUploading } = useUploadProjectFile({
    onSuccess: () => {
      toast({ title: "File uploaded" });
      void queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    onError: () => toast({ title: "Upload failed", variant: "destructive" }),
  });

  /* ── Tasks ── */
  const { mutate: createTask, isPending: isCreatingTask } = useCreateProjectTask();
  const { mutate: updateTask, isPending: isUpdatingTask } = useUpdateProjectTask();
  const { mutate: deleteTask } = useDeleteProjectTask();

  /* ── Brief / title ── */
  const { mutate: updateProject, isPending: isSavingBrief } = useUpdateProject({
    onSuccess: () => {
      toast({ title: "Brief updated" });
      void queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
      setEditingBrief(false);
    },
    onError: () => toast({ title: "Failed to save", variant: "destructive" }),
  });

  const { mutate: saveTitle, isPending: isSavingTitle } = useUpdateProject({
    onSuccess: () => {
      toast({ title: "Title updated" });
      void queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
      setEditingTitle(false);
    },
    onError: () => toast({ title: "Failed to save title", variant: "destructive" }),
  });

  const { mutate: saveTodos } = useUpdateProject({
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["projects", projectId] }),
  });

  /* ── File delete ── */
  const { mutate: deleteFile, isPending: isDeletingFile } = useDeleteFile({
    onSuccess: () => {
      toast({ title: "File deleted" });
      void queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
      setConfirmDeleteFileId(null);
    },
    onError: () => toast({ title: "Failed to delete file", variant: "destructive" }),
  });

  type BriefTodo = { id: string; text: string; done: boolean };
  const todos: BriefTodo[] = (project as any)?.briefTodos ?? [];

  const persistTodos = (next: BriefTodo[]) =>
    saveTodos({ id: projectId, body: { briefTodos: next } as any });

  const handleToggleTodo = (id: string) =>
    persistTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const handleDeleteTodo = (id: string) =>
    persistTodos(todos.filter(t => t.id !== id));

  const handleAddTodo = () => {
    const text = newTodoText.trim();
    if (!text) return;
    persistTodos([...todos, { id: crypto.randomUUID(), text, done: false }]);
    setNewTodoText("");
  };

  /* ── Ownership guard ── */
  useEffect(() => {
    if (!project) return;
    const session = getSession();
    if (!session) { setLocation("/"); return; }
    if (project.clientEmail.toLowerCase() !== session.email.toLowerCase()) {
      setLocation("/track");
    }
  }, [project, setLocation]);

  /* ── Handlers ── */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && project) {
      uploadFile({ projectId, file, uploadedBy: project.clientName });
    }
  };

  const handleAddTask = () => {
    const title = newTaskTitle.trim();
    if (!title) return;
    createTask({ projectId, title }, {
      onSuccess: () => setNewTaskTitle(""),
      onError: () => toast({ title: "Failed to add task", variant: "destructive" }),
    });
  };

  const handleToggleTask = (taskId: number, completed: boolean) =>
    updateTask({ taskId, completed: !completed, projectId });

  const handleDeleteTask = (taskId: number) =>
    deleteTask({ taskId, projectId }, {
      onError: () => toast({ title: "Failed to delete task", variant: "destructive" }),
    });

  const startEditTask = (taskId: number, currentTitle: string) => {
    setEditingTaskId(taskId);
    setEditingTaskText(currentTitle);
  };

  const saveEditTask = (taskId: number) => {
    const title = editingTaskText.trim();
    if (!title) return;
    updateTask({ taskId, title, projectId }, {
      onSuccess: () => setEditingTaskId(null),
    });
  };

  const handleEditBrief = () => {
    setBriefDraft(project?.description ?? "");
    setEditingBrief(true);
  };

  const handleSaveBrief = () =>
    updateProject({ id: projectId, body: { description: briefDraft } });

  const handleEditTitle = () => {
    setTitleDraft(project?.title ?? "");
    setEditingTitle(true);
  };

  const handleSaveTitle = () => {
    const trimmed = titleDraft.trim();
    if (!trimmed) return;
    saveTitle({ id: projectId, body: { title: trimmed } });
  };

  /* ── Loading ── */
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0a0a0a]">
        <Loader2 className="w-6 h-6 animate-spin text-white/30" />
      </div>
    );
  }

  /* ── Not found ── */
  if (error || !project) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0a0a0a] p-6">
        <div className="max-w-sm w-full text-center p-8 rounded-2xl border border-red-500/20 bg-red-500/5">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <p className="text-white font-semibold text-sm mb-1">Project Not Found</p>
          <p className="text-white/40 text-xs mb-6">The ID you entered doesn't exist or you don't have access.</p>
          <Link href="/track" className="inline-flex items-center gap-1.5 h-8 px-4 bg-white text-black text-xs font-semibold rounded-lg hover:bg-white/90 transition-colors">
            <ArrowLeft size={12} /> Try another ID
          </Link>
        </div>
      </div>
    );
  }

  const typeLabel = project.projectType.split("_").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const completedCount = tasks.filter(t => t.completed).length;
  const progressPct = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="flex-1 bg-[#0a0a0a] py-8">
      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-6">

        {/* ── Back ── */}
        <Link href="/track" className="inline-flex items-center gap-1.5 text-white/35 hover:text-white/70 text-xs transition-colors">
          <ArrowLeft size={13} /> My projects
        </Link>

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {editingTitle ? (
              <div className="flex items-center gap-2 mb-2">
                <input
                  autoFocus
                  value={titleDraft}
                  onChange={(e) => setTitleDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveTitle();
                    if (e.key === "Escape") setEditingTitle(false);
                  }}
                  className="text-xl font-bold text-white tracking-tight bg-transparent border-b border-white/30 focus:border-white/60 outline-none w-full max-w-sm"
                />
                <button onClick={() => setEditingTitle(false)} disabled={isSavingTitle} className="text-white/30 hover:text-white/60 transition-colors">
                  <XIcon size={14} />
                </button>
                <button
                  onClick={handleSaveTitle}
                  disabled={isSavingTitle || !titleDraft.trim()}
                  className="text-white/60 hover:text-white disabled:opacity-30 transition-colors"
                >
                  {isSavingTitle ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                </button>
              </div>
            ) : (
              <button onClick={handleEditTitle} className="group flex items-center gap-2 mb-2 text-left" title="Click to edit title">
                <h1 className="text-xl font-bold text-white tracking-tight truncate">{project.title}</h1>
                <Pencil size={12} className="text-white/0 group-hover:text-white/40 transition-colors shrink-0 mt-0.5" />
              </button>
            )}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/35 text-xs">
              <span className="flex items-center gap-1"><User size={11} /> {project.clientName}</span>
              <span className="text-white/15">·</span>
              <span className="flex items-center gap-1"><Tag size={11} /> {typeLabel}</span>
              <span className="text-white/15">·</span>
              <span className="flex items-center gap-1"><Calendar size={11} /> Created {format(new Date(project.createdAt), "MMM d, yyyy")}</span>
              {project.deadline && (
                <>
                  <span className="text-white/15">·</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> Due {format(new Date(project.deadline), "MMM d, yyyy")}</span>
                </>
              )}
            </div>
          </div>

          {/* Status pill */}
          <span className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest border
            ${project.status === "delivered"      ? "bg-green-500/10 border-green-500/30 text-green-400" :
              project.status === "cancelled"      ? "bg-red-500/10 border-red-500/30 text-red-400" :
              project.status === "needs_feedback" ? "bg-amber-500/10 border-amber-500/30 text-amber-400" :
              project.status === "in_progress"    ? "bg-blue-500/10 border-blue-500/30 text-blue-400" :
                                                   "bg-white/5 border-white/15 text-white/50"}`}>
            {project.status.replace(/_/g, " ")}
          </span>
        </div>

        {/* ── Stepper ── */}
        <div className="p-5 rounded-2xl border border-white/[0.08] bg-white/[0.02]">
          <ProjectStepper currentStatus={project.status} />
          {project.adminNotes && (
            <div className="mt-5 pt-5 border-t border-white/[0.06]">
              <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Clock size={10} /> Update from designer
              </p>
              <p className="text-white/60 text-xs leading-relaxed whitespace-pre-wrap">{project.adminNotes}</p>
            </div>
          )}
        </div>

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Project Brief ── */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white h-full flex flex-col overflow-hidden">
              {/* Brief header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06]">
                <p className="text-black/30 text-[10px] font-semibold uppercase tracking-widest flex items-center gap-1.5">
                  <FileText size={10} /> Project Brief
                </p>
                {!editingBrief && (
                  <button
                    onClick={handleEditBrief}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/5 hover:bg-black/10 text-black/40 hover:text-black/70 text-[11px] font-medium transition-all"
                  >
                    <Pencil size={11} /> Edit
                  </button>
                )}
              </div>

              {editingBrief ? (
                <div className="flex flex-col gap-3 flex-1 p-5">
                  <textarea
                    value={briefDraft}
                    onChange={(e) => setBriefDraft(e.target.value)}
                    autoFocus
                    rows={8}
                    className="w-full flex-1 resize-none rounded-xl border border-black/10 bg-black/[0.02] px-3 py-2.5 text-xs text-black/80 leading-relaxed focus:outline-none focus:border-black/25 transition-colors"
                  />
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => setEditingBrief(false)}
                      disabled={isSavingBrief}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/10 text-black/40 hover:text-black/70 text-xs font-medium transition-all disabled:opacity-40"
                    >
                      <XIcon size={12} /> Cancel
                    </button>
                    <button
                      onClick={handleSaveBrief}
                      disabled={isSavingBrief || !briefDraft.trim()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black text-white text-xs font-semibold hover:bg-black/80 disabled:opacity-40 transition-all"
                    >
                      {isSavingBrief ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col flex-1 gap-0">
                  {/* Description */}
                  <div className="px-5 py-4">
                    <p className="text-black/70 text-xs leading-relaxed whitespace-pre-wrap">{linkifyText(project.description)}</p>
                  </div>

                  {/* ── To-Do Checklist ── */}
                  <div className="border-t border-black/[0.06]">
                    <div className="px-5 py-3 flex items-center justify-between">
                      <p className="text-black/25 text-[10px] font-semibold uppercase tracking-widest flex items-center gap-1.5">
                        <ListChecks size={10} /> Notes / To-Do
                      </p>
                      {todos.length > 0 && (
                        <span className="text-black/25 text-[10px]">
                          {todos.filter(t => t.done).length}/{todos.length} done
                        </span>
                      )}
                    </div>

                    <div className="px-5 pb-2">
                      {todos.length === 0 && (
                        <p className="text-black/25 text-xs italic mb-2">No notes yet — add one below.</p>
                      )}
                      <ul className="space-y-1.5 mb-3">
                        {todos.map((todo) => (
                          <li key={todo.id} className="group flex items-start gap-2.5">
                            <button
                              onClick={() => handleToggleTodo(todo.id)}
                              className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-all ${
                                todo.done ? "bg-black border-black" : "border-black/20 hover:border-black/50 bg-white"
                              }`}
                            >
                              {todo.done && <Check size={9} className="text-white" />}
                            </button>
                            <span className={`flex-1 text-xs leading-relaxed transition-all ${
                              todo.done ? "line-through text-black/25" : "text-black/70"
                            }`}>
                              {todo.text}
                            </span>
                            <button
                              onClick={() => handleDeleteTodo(todo.id)}
                              className="opacity-0 group-hover:opacity-100 text-black/20 hover:text-red-400 transition-all flex-shrink-0 mt-0.5 p-0.5 rounded"
                            >
                              <XIcon size={10} />
                            </button>
                          </li>
                        ))}
                      </ul>

                      <div className="flex gap-1.5 pb-2">
                        <input
                          value={newTodoText}
                          onChange={(e) => setNewTodoText(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") handleAddTodo(); }}
                          placeholder="Add a note…"
                          className="flex-1 rounded-lg border border-black/10 bg-black/[0.02] px-2.5 py-1.5 text-xs text-black/70 placeholder:text-black/25 focus:outline-none focus:border-black/25 transition-colors"
                        />
                        <button
                          onClick={handleAddTodo}
                          disabled={!newTodoText.trim()}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-black text-white text-xs font-semibold hover:bg-black/80 disabled:opacity-30 transition-all"
                        >
                          <Plus size={11} /> Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Right panel — Files / Tasks ── */}
          <div>
            <div className="rounded-2xl bg-white overflow-hidden">

              {/* Tab bar */}
              <div className="flex border-b border-black/[0.06]">
                {(["files", "tasks"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setRightTab(tab)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-[10px] font-semibold uppercase tracking-widest transition-colors
                      ${rightTab === tab ? "text-black border-b-2 border-black" : "text-black/30 hover:text-black/50"}`}
                  >
                    {tab === "files" ? (
                      <>
                        <FileArchive size={10} /> Files
                        <span className="ml-0.5 bg-black/8 text-black/40 px-1.5 py-0.5 rounded-full text-[9px]">{project.files.length}</span>
                      </>
                    ) : (
                      <>
                        <ListChecks size={10} /> Tasks
                        <span className="ml-0.5 bg-black/8 text-black/40 px-1.5 py-0.5 rounded-full text-[9px]">{tasks.length}</span>
                      </>
                    )}
                  </button>
                ))}
              </div>

              {/* ── Files panel ── */}
              {rightTab === "files" && (
                <>
                  <div className="px-4 py-3 border-b border-black/[0.06]">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="w-full flex items-center justify-center gap-2 h-9 rounded-xl border border-dashed border-black/15 hover:border-black/30 text-black/35 hover:text-black/60 text-xs font-medium transition-all"
                    >
                      {isUploading
                        ? <><Loader2 size={13} className="animate-spin" /> Uploading…</>
                        : <><UploadCloud size={13} /> Upload File</>}
                    </button>
                    <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                  </div>

                  <div className="divide-y divide-black/[0.05] max-h-[400px] overflow-y-auto">
                    {project.files.length === 0 ? (
                      <div className="p-8 flex flex-col items-center gap-2">
                        <FileSearch size={22} className="text-black/15" />
                        <p className="text-black/25 text-xs">No files uploaded yet.</p>
                      </div>
                    ) : (
                      project.files.map(file => {
                        const { Icon, color } = getFileIcon(file.originalName);
                        const isImg = isImageFile(file.originalName);
                        const isConfirming = confirmDeleteFileId === file.id;
                        const isDeleting = isDeletingFile && isConfirming;
                        return (
                          <div
                            key={file.id}
                            className={`px-4 py-3 flex items-center gap-3 group transition-colors ${isConfirming ? "bg-red-50" : "hover:bg-black/[0.02]"}`}
                          >
                            {isImg ? (
                              <a href={`/api/files/${file.id}`} target="_blank" rel="noreferrer"
                                 className="shrink-0 w-10 h-10 rounded-lg overflow-hidden border border-black/[0.08] bg-black/[0.04] block">
                                <img src={`/api/files/${file.id}`} alt={file.originalName} className="w-full h-full object-cover" />
                              </a>
                            ) : (
                              <div className={`shrink-0 w-10 h-10 rounded-lg bg-black/[0.05] flex items-center justify-center ${color}`}>
                                <Icon size={15} />
                              </div>
                            )}
                            <div className="flex-1 overflow-hidden">
                              <p className="text-black/70 text-xs font-medium truncate" title={file.originalName}>{file.originalName}</p>
                              <p className="text-black/35 text-[10px]">{format(new Date(file.createdAt), "MMM d")} · {file.uploadedBy}</p>
                            </div>

                            {isConfirming ? (
                              <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                  onClick={() => setConfirmDeleteFileId(null)}
                                  disabled={isDeleting}
                                  className="px-2 py-1 text-[10px] font-medium text-black/40 hover:text-black/70 border border-black/10 rounded-lg transition-all disabled:opacity-40"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => deleteFile(file.id)}
                                  disabled={isDeleting}
                                  className="flex items-center gap-1 px-2 py-1 text-[10px] font-semibold bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all disabled:opacity-60"
                                >
                                  {isDeleting ? <Loader2 size={10} className="animate-spin" /> : <Trash2 size={10} />}
                                  Delete
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-all">
                                <a href={`/api/files/${file.id}`} target="_blank" rel="noreferrer"
                                   className="w-7 h-7 flex items-center justify-center rounded-lg text-black/25 hover:text-black hover:bg-black/10 transition-all">
                                  <Download size={13} />
                                </a>
                                <button
                                  onClick={() => setConfirmDeleteFileId(file.id)}
                                  className="w-7 h-7 flex items-center justify-center rounded-lg text-black/20 hover:text-red-500 hover:bg-red-50 transition-all"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </>
              )}

              {/* ── Tasks panel ── */}
              {rightTab === "tasks" && (
                <>
                  {/* Add task input */}
                  <div className="px-4 py-3 border-b border-black/[0.06] flex gap-2">
                    <input
                      type="text"
                      value={newTaskTitle}
                      onChange={e => setNewTaskTitle(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleAddTask()}
                      placeholder="Add a task…"
                      className="flex-1 h-9 px-3 rounded-xl border border-black/12 text-xs text-black/70 placeholder:text-black/25 focus:outline-none focus:border-black/30 bg-black/[0.02] transition-colors"
                    />
                    <button
                      onClick={handleAddTask}
                      disabled={isCreatingTask || !newTaskTitle.trim()}
                      className="w-9 h-9 flex items-center justify-center rounded-xl bg-black text-white hover:bg-black/80 disabled:opacity-30 transition-all"
                    >
                      {isCreatingTask ? <Loader2 size={13} className="animate-spin" /> : <Plus size={14} />}
                    </button>
                  </div>

                  {/* Task list */}
                  <div className="divide-y divide-black/[0.05] max-h-[400px] overflow-y-auto">
                    {tasksLoading ? (
                      <div className="p-8 flex items-center justify-center">
                        <Loader2 size={16} className="animate-spin text-black/20" />
                      </div>
                    ) : tasks.length === 0 ? (
                      <div className="p-8 flex flex-col items-center gap-2">
                        <ListChecks size={22} className="text-black/15" />
                        <p className="text-black/25 text-xs">No tasks yet.</p>
                      </div>
                    ) : (
                      tasks.map(task => (
                        <div key={task.id} className="px-4 py-3 group transition-colors hover:bg-black/[0.02]">
                          {editingTaskId === task.id ? (
                            /* ── Inline edit mode ── */
                            <div className="flex items-center gap-2">
                              <input
                                autoFocus
                                value={editingTaskText}
                                onChange={e => setEditingTaskText(e.target.value)}
                                onKeyDown={e => {
                                  if (e.key === "Enter") saveEditTask(task.id);
                                  if (e.key === "Escape") setEditingTaskId(null);
                                }}
                                className="flex-1 px-2 py-1 text-xs text-black/80 bg-black/[0.03] border border-black/15 rounded-lg focus:outline-none focus:border-black/30 transition-colors"
                              />
                              <button
                                onClick={() => setEditingTaskId(null)}
                                className="w-6 h-6 flex items-center justify-center text-black/25 hover:text-black/50 transition-colors"
                              >
                                <XIcon size={12} />
                              </button>
                              <button
                                onClick={() => saveEditTask(task.id)}
                                disabled={isUpdatingTask || !editingTaskText.trim()}
                                className="w-6 h-6 flex items-center justify-center text-black/50 hover:text-black disabled:opacity-30 transition-colors"
                              >
                                {isUpdatingTask ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                              </button>
                            </div>
                          ) : (
                            /* ── Normal mode ── */
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleToggleTask(task.id, task.completed)}
                                className={`shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                                  ${task.completed ? "bg-black border-black text-white" : "border-black/20 hover:border-black/50"}`}
                              >
                                {task.completed && <Check size={10} />}
                              </button>
                              <span
                                className={`flex-1 text-xs leading-relaxed cursor-pointer transition-colors ${
                                  task.completed ? "line-through text-black/25" : "text-black/70"
                                }`}
                                onDoubleClick={() => !task.completed && startEditTask(task.id, task.title)}
                                title={task.completed ? "" : "Double-click to edit"}
                              >
                                {task.title}
                              </span>
                              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                                {!task.completed && (
                                  <button
                                    onClick={() => startEditTask(task.id, task.title)}
                                    className="w-6 h-6 flex items-center justify-center rounded-lg text-black/20 hover:text-black/60 hover:bg-black/8 transition-all"
                                    title="Edit task"
                                  >
                                    <Pencil size={11} />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteTask(task.id)}
                                  className="w-6 h-6 flex items-center justify-center rounded-lg text-black/20 hover:text-red-500 hover:bg-red-50 transition-all"
                                  title="Delete task"
                                >
                                  <Trash2 size={11} />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Progress bar */}
                  {tasks.length > 0 && (
                    <div className="px-4 py-3 border-t border-black/[0.06]">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-black/30 text-[10px]">{completedCount} of {tasks.length} done</p>
                        <p className="text-black/40 text-[10px] font-semibold">{progressPct}%</p>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-black/[0.06]">
                        <div
                          className="h-full rounded-full bg-black transition-all duration-500"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
