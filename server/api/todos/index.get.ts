export default defineProtectedEventHandler(async (event) => {
  return {
    todos: await db.select().from(todos).all(),
  };
});
