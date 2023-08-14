export default defineEventHandler(async (event) => {
  return {
    todos: await db.select().from(todos).all(),
  };
});
