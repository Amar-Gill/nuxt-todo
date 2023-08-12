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
    <li v-for="todo in todos">{{ todo.content }} | {{ todo.done }}</li>
  </ul>
</template>

<script setup lang="ts">
type Todo = {
  content: string;
  done: boolean;
};

type FormPayload = Event & {
  currentTarget: EventTarget & HTMLFormElement;
};

const todos = ref<Todo[]>([
  { content: "build app", done: false },
  { content: "get rich", done: false },
]);

async function submitCreateTodo(payload: FormPayload) {
  const data = new FormData(payload.currentTarget);

  const todo: Todo = await $fetch("/api/todos", {
    method: "POST",
    body: { content: data.get("content") },
  });

  todos.value.push(todo);
}
</script>
