<template>
  <form
    method="post"
    @submit.prevent="((e:FormPayload) => submitCreateTodo(e))"
  >
    <label for="content">Content</label>
    <input type="text" name="content" />
    <button>Create</button>
  </form>
</template>

<script setup lang="ts">
type FormPayload = Event & {
  currentTarget: EventTarget & HTMLFormElement;
};

async function submitCreateTodo(payload: FormPayload) {
  const data = new FormData(payload.currentTarget);

  const todo = await $fetch("/api/todos/create", {
    method: "POST",
    body: { content: data.get("content") },
  });

  console.log(todo);
}
</script>
