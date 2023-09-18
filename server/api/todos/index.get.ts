import { eq } from "drizzle-orm";

export default defineProtectedEventHandler(async (event) => {
  const query = getQuery(event);

  const resourceOwnerId = query["user-id"]?.toString() ?? "";

  return {
    todos: await db
      .select()
      .from(todos)
      .where(eq(todos.userId, resourceOwnerId))
      .all(),
  };
});
