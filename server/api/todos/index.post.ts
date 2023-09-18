export default defineProtectedEventHandler(async (event) => {
  const body = await readBody<Todo>(event);

  return db
    .insert(todos)
    .values({ content: body.content, userId: event.context.user.userId })
    .returning()
    .get();
});
