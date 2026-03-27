import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { eq, sql } from "drizzle-orm";
import { db, projectsTable, projectFilesTable, projectTasksTable } from "@workspace/db";
import {
  CreateProjectBody,
  UpdateProjectBody,
  GetProjectParams,
  UpdateProjectParams,
  ListProjectFilesParams,
  UploadProjectFileParams,
  ListProjectsQueryParams,
  GetAdminStatsResponse,
} from "@workspace/api-zod";
import multer from "multer";
import { uploadFileToDrive, downloadFileFromDrive, deleteFileFromDrive } from "../lib/drive.js";

const router: IRouter = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

/* ── Admin auth ── */
const ADMIN_KEY = process.env.ADMIN_PASSWORD ?? "kompweb2024";

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const key = req.headers["x-admin-key"];
  if (!key || key !== ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

/* POST /admin/verify — check password, return ok */
router.post("/admin/verify", (req: Request, res: Response) => {
  const { password } = req.body as { password?: string };
  if (password && password === ADMIN_KEY) {
    return res.json({ ok: true });
  }
  return res.status(401).json({ error: "Invalid password" });
});

function formatProject(p: typeof projectsTable.$inferSelect) {
  let briefTodos: { id: string; text: string; done: boolean }[] = [];
  try { briefTodos = JSON.parse(p.briefTodos ?? "[]"); } catch { /* ignore */ }
  return {
    id: p.id,
    clientName: p.clientName,
    clientEmail: p.clientEmail,
    title: p.title,
    description: p.description,
    projectType: p.projectType,
    status: p.status,
    adminNotes: p.adminNotes ?? null,
    deadline: p.deadline ?? null,
    briefTodos,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

function formatFile(f: typeof projectFilesTable.$inferSelect) {
  return {
    id: f.id,
    projectId: f.projectId,
    filename: f.filename,
    originalName: f.originalName,
    mimeType: f.mimeType,
    size: f.size,
    driveFileId: f.driveFileId,
    driveWebViewLink: f.driveWebViewLink,
    uploadedBy: f.uploadedBy,
    createdAt: f.createdAt.toISOString(),
  };
}

router.get("/projects", async (req, res) => {
  try {
    const query = ListProjectsQueryParams.parse(req.query);
    let rows = await db.select().from(projectsTable).orderBy(sql`${projectsTable.createdAt} DESC`);
    if (query.status) {
      rows = rows.filter((p) => p.status === query.status);
    }
    if (query.clientEmail) {
      rows = rows.filter((p) => p.clientEmail.toLowerCase() === query.clientEmail!.toLowerCase());
    }
    res.json(rows.map(formatProject));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to list projects" });
  }
});

router.post("/projects", async (req, res) => {
  try {
    const body = CreateProjectBody.parse(req.body);
    const [project] = await db
      .insert(projectsTable)
      .values({
        clientName: body.clientName,
        clientEmail: body.clientEmail,
        title: body.title,
        description: body.description,
        projectType: body.projectType,
        deadline: body.deadline ?? null,
        status: "submitted",
      })
      .returning();
    res.status(201).json(formatProject(project));
  } catch (err) {
    req.log.error(err);
    res.status(400).json({ error: "Failed to create project", details: String(err) });
  }
});

router.get("/projects/:id", async (req, res) => {
  try {
    const { id } = GetProjectParams.parse({ id: Number(req.params.id) });
    const [project] = await db.select().from(projectsTable).where(eq(projectsTable.id, id));
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    const files = await db.select().from(projectFilesTable).where(eq(projectFilesTable.projectId, id));
    res.json({ ...formatProject(project), files: files.map(formatFile) });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to get project" });
  }
});

router.patch("/projects/:id", async (req, res) => {
  try {
    const { id } = UpdateProjectParams.parse({ id: Number(req.params.id) });
    const body = UpdateProjectBody.parse(req.body);
    const [existing] = await db.select().from(projectsTable).where(eq(projectsTable.id, id));
    if (!existing) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    const updateData: Partial<typeof projectsTable.$inferInsert> = {
      updatedAt: new Date(),
    };
    const isAdmin = req.headers["x-admin-key"] === ADMIN_KEY;
    if (body.status !== undefined) {
      if (!isAdmin) return res.status(403).json({ error: "Admin only" });
      updateData.status = body.status;
    }
    if (body.adminNotes !== undefined) {
      if (!isAdmin) return res.status(403).json({ error: "Admin only" });
      updateData.adminNotes = body.adminNotes ?? undefined;
    }
    if (body.deadline !== undefined) updateData.deadline = body.deadline ?? undefined;
    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;
    if ((body as any).briefTodos !== undefined) updateData.briefTodos = JSON.stringify((body as any).briefTodos);

    const [updated] = await db
      .update(projectsTable)
      .set(updateData)
      .where(eq(projectsTable.id, id))
      .returning();
    res.json(formatProject(updated));
  } catch (err) {
    req.log.error(err);
    res.status(400).json({ error: "Failed to update project", details: String(err) });
  }
});

router.get("/projects/:id/files", async (req, res) => {
  try {
    const { id } = ListProjectFilesParams.parse({ id: Number(req.params.id) });
    const files = await db.select().from(projectFilesTable).where(eq(projectFilesTable.projectId, id));
    res.json(files.map(formatFile));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to list files" });
  }
});

router.post("/projects/:id/upload", upload.single("file"), async (req, res) => {
  try {
    const { id } = UploadProjectFileParams.parse({ id: Number(req.params.id) });
    const [project] = await db.select().from(projectsTable).where(eq(projectsTable.id, id));
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    const uploadedBy = (req.body.uploadedBy as string) || "client";

    // Upload to Google Drive under: Root / clientName / projectTitle
    const { driveFileId, driveWebViewLink } = await uploadFileToDrive(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype,
      id,
      project.title,
      project.clientName
    );

    const [file] = await db
      .insert(projectFilesTable)
      .values({
        projectId: id,
        filename: req.file.originalname,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        driveFileId,
        driveWebViewLink,
        uploadedBy,
      })
      .returning();
    res.status(201).json(formatFile(file));
  } catch (err) {
    req.log.error(err);
    res.status(400).json({ error: "Failed to upload file", details: String(err) });
  }
});

// Download — proxy content from Google Drive
router.get("/files/:fileId", async (req, res) => {
  try {
    const fileId = Number(req.params.fileId);
    const [file] = await db.select().from(projectFilesTable).where(eq(projectFilesTable.id, fileId));
    if (!file) {
      res.status(404).json({ error: "File not found" });
      return;
    }
    const buffer = await downloadFileFromDrive(file.driveFileId);
    res.setHeader("Content-Type", file.mimeType);
    res.setHeader("Content-Disposition", `inline; filename="${file.originalName}"`);
    res.setHeader("Content-Length", buffer.length);
    res.send(buffer);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to download file" });
  }
});

// Delete from Drive + DB
router.delete("/files/:fileId", async (req, res) => {
  try {
    const fileId = Number(req.params.fileId);
    const [file] = await db.select().from(projectFilesTable).where(eq(projectFilesTable.id, fileId));
    if (!file) {
      res.status(404).json({ error: "File not found" });
      return;
    }
    await deleteFileFromDrive(file.driveFileId);
    await db.delete(projectFilesTable).where(eq(projectFilesTable.id, fileId));
    res.status(204).send();
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to delete file" });
  }
});

// ── Project Tasks ────────────────────────────────────────────────────────────

function formatTask(t: typeof projectTasksTable.$inferSelect) {
  return {
    id: t.id,
    projectId: t.projectId,
    title: t.title,
    completed: t.completed,
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
  };
}

router.get("/projects/:id/tasks", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const tasks = await db
      .select()
      .from(projectTasksTable)
      .where(eq(projectTasksTable.projectId, id))
      .orderBy(projectTasksTable.createdAt);
    res.json(tasks.map(formatTask));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to list tasks" });
  }
});

router.post("/projects/:id/tasks", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title } = req.body as { title: string };
    if (!title?.trim()) {
      res.status(400).json({ error: "Title is required" });
      return;
    }
    const [task] = await db
      .insert(projectTasksTable)
      .values({ projectId: id, title: title.trim() })
      .returning();
    res.status(201).json(formatTask(task));
  } catch (err) {
    req.log.error(err);
    res.status(400).json({ error: "Failed to create task" });
  }
});

router.patch("/tasks/:taskId", async (req, res) => {
  try {
    const taskId = Number(req.params.taskId);
    const { title, completed } = req.body as { title?: string; completed?: boolean };
    const update: Partial<typeof projectTasksTable.$inferInsert> = { updatedAt: new Date() };
    if (title !== undefined) update.title = title;
    if (completed !== undefined) update.completed = completed;
    const [task] = await db
      .update(projectTasksTable)
      .set(update)
      .where(eq(projectTasksTable.id, taskId))
      .returning();
    if (!task) { res.status(404).json({ error: "Task not found" }); return; }
    res.json(formatTask(task));
  } catch (err) {
    req.log.error(err);
    res.status(400).json({ error: "Failed to update task" });
  }
});

router.delete("/tasks/:taskId", async (req, res) => {
  try {
    const taskId = Number(req.params.taskId);
    await db.delete(projectTasksTable).where(eq(projectTasksTable.id, taskId));
    res.status(204).send();
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

router.get("/admin/stats", requireAdmin, async (req, res) => {
  try {
    const allProjects = await db.select().from(projectsTable).orderBy(sql`${projectsTable.createdAt} DESC`);
    const byStatus: Record<string, number> = {};
    for (const p of allProjects) {
      byStatus[p.status] = (byStatus[p.status] || 0) + 1;
    }
    const recentProjects = allProjects.slice(0, 5).map(formatProject);
    const statsPayload = GetAdminStatsResponse.parse({
      totalProjects: allProjects.length,
      byStatus,
      recentProjects,
    });
    res.json(statsPayload);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to get stats" });
  }
});

export default router;
