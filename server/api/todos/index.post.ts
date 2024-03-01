import { useDb } from '~/server/utils/drizzle/db';

export default defineProtectedEventHandler(async (event) => {
  const body = await readBody<Todo>(event);

  return useDb()
    .insert(todos)
    .values({ content: body.content, userId: event.context.user.userId })
    .returning()
    .get();
});
