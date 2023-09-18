import { eq } from "drizzle-orm";

export default defineProtectedEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    return;
  }

  return db
    .delete(todos)
    .where(eq(todos.id, parseInt(id)))
    .returning()
    .get();
});
