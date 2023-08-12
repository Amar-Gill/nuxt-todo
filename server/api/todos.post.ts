export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return db
    .insert(todos)
    .values({ content: body.content, done: false })
    .returning()
    .get();
});
