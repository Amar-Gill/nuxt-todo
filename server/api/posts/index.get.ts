import { eq } from 'drizzle-orm';

export default defineProtectedEventHandler(async (event) => {
  const query = getQuery(event);

  const resourceOwnerId = query['author-id']?.toString() ?? '';

  return {
    posts: await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.authorId, resourceOwnerId))
      .all(),
  };
});
