import { eq } from 'drizzle-orm';
import { useDb } from '~/server/utils/drizzle/db';

export default defineProtectedEventHandler(async (event) => {
  const query = getQuery(event);

  const resourceOwnerId = query['user-id']?.toString() ?? '';

  return {
    todos: await useDb()
      .select()
      .from(todos)
      .where(eq(todos.userId, resourceOwnerId))
      .all(),
  };
});
