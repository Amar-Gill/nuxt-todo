import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ done: boolean }>(event);

  const id = getRouterParam(event, "id");

  if (!id) {
    return;
  }

  return db
    .update(todos)
    .set({ done: body.done })
    .where(eq(todos.id, parseInt(id)))
    .returning()
    .get();
});
