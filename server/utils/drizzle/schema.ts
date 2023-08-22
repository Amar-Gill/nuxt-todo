import { InferModel } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todos", {
  id: integer("id").primaryKey(),
  content: text("content"),
  done: integer("done", { mode: "boolean" }).default(false),
});

export type Todo = InferModel<typeof todos>;
export type InsertTodo = InferModel<typeof todos, "insert">;
