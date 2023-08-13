<template>
  <form
    method="post"
    @submit.prevent="((e:FormPayload) => submitCreateTodo(e))"
  >
    <label for="content">Content</label>
    <input type="text" name="content" />
    <button>Create</button>
  </form>
  <ul>
    <li v-for="todo in data?.todos">{{ todo.content }} | {{ todo.done }}</li>
  </ul>
</template>

<script setup lang="ts">
type FormPayload = Event & {
  currentTarget: EventTarget & HTMLFormElement;
};

const { data } = await useFetch("/api/todos");

async function submitCreateTodo(payload: FormPayload) {
  const formData = new FormData(payload.currentTarget);

  const todo = await $fetch("/api/todos", {
    method: "POST",
    body: { content: formData.get("content") },
  });

  data.value?.todos.push(todo);
}
</script>
