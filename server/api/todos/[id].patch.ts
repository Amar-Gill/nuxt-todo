import { eq } from 'drizzle-orm';
import { useDb } from '~/server/utils/drizzle/db';

export default defineProtectedEventHandler(async (event) => {
  const body = await readBody<Todo>(event);

  const id = getRouterParam(event, 'id');

  if (!id) {
    return;
  }

  return useDb()
    .update(todos)
    .set({ done: body.done, updatedAt: new Date() })
    .where(eq(todos.id, parseInt(id)))
    .returning()
    .get();
});
