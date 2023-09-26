export default defineProtectedEventHandler(async (event) => {
  const body = await readBody<InsertBlogPost>(event);

  return db
    .insert(blogPosts)
    .values({
      title: body.title,
      content: body.content,
      authorId: event.context.user.userId,
    })
    .returning()
    .get();
});
