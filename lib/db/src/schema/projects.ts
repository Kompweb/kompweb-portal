import { pgTable, serial, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const projectStatusEnum = pgEnum("project_status", [
  "submitted",
  "in_review",
  "in_progress",
  "needs_feedback",
  "delivered",
  "cancelled",
]);

export const projectTypeEnum = pgEnum("project_type", [
  "logo_design",
  "brand_identity",
  "web_design",
  "social_media",
  "print_design",
  "illustration",
  "other",
]);

export const projectsTable = pgTable("projects", {
  id: serial("id").primaryKey(),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  projectType: projectTypeEnum("project_type").notNull(),
  status: projectStatusEnum("status").notNull().default("submitted"),
  adminNotes: text("admin_notes"),
  deadline: text("deadline"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  briefTodos: text("brief_todos").notNull().default("[]"),
});
