import { eq } from 'drizzle-orm';
import { useDb } from '~/server/utils/drizzle/db';

export default defineEventHandler(async (event) => {
  const idString = getRouterParam(event, 'id');

  const id = parseInt(idString ?? '0');

  if (isNaN(id)) {
    return createError({ statusCode: 400, message: 'Invalid id' });
  }

  const blogPost = await useDb()
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .get();

  if (!blogPost) {
    return createError({ statusCode: 404, message: 'Blog post not found' });
  }

  return { post: blogPost };
});
