import { eq } from 'drizzle-orm';
import { useDb } from '~/server/utils/drizzle/db';

export default defineProtectedEventHandler(async (event) => {
  const query = getQuery(event);

  const resourceOwnerId = query['author-id']?.toString() ?? '';

  return {
    posts: await useDb()
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.authorId, resourceOwnerId))
      .all(),
  };
});
