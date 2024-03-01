import { eq } from 'drizzle-orm';
import { useDb } from '~/server/utils/drizzle/db';

export default defineProtectedEventHandler(async (event) => {
  const idString = getRouterParam(event, 'id');

  const id = parseInt(idString!);

  if (isNaN(id)) {
    return createError({ statusCode: 400, message: 'Invalid id' });
  }

  const body = await readBody<BlogPost>(event);

  return useDb()
    .update(blogPosts)
    .set({
      title: body.title,
      content: body.content,
      updatedAt: new Date(),
    })
    .where(eq(blogPosts.id, id))
    .returning()
    .get();
});
