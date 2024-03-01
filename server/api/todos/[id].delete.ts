import { eq } from 'drizzle-orm';
import { useDb } from '~/server/utils/drizzle/db';

export default defineProtectedEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  if (!id) {
    return;
  }

  return useDb()
    .delete(todos)
    .where(eq(todos.id, parseInt(id)))
    .returning()
    .get();
});
