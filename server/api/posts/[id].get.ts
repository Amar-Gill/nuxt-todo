import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const idString = getRouterParam(event, 'id');

  const id = parseInt(idString ?? '0');

  if (isNaN(id)) {
    return createError({ statusCode: 400, message: 'Invalid id' });
  }

  const blogPost = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .get();

  if (!blogPost) {
    return createError({ statusCode: 404, message: 'Blog post not found' });
  }

  return { post: blogPost };
});
