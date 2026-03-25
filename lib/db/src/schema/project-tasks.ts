import { pgTable, serial, integer, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { projectsTable } from "./projects";

export const projectTasksTable = pgTable("project_tasks", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .notNull()
    .references(() => projectsTable.id),
  title: text("title").notNull(),
  completed: boolean("completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
