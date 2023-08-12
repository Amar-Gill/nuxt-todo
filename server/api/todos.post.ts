export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return {
    content: body.content as string,
    done: false,
  };
});
