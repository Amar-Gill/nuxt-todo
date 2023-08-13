<template>
  <form
    method="post"
    @submit.prevent="((e:FormPayload) => submitCreateTodo(e))"
  >
    <label for="content">Content</label>
    <input type="text" name="content" />
    <button>Create</button>
  </form>
  <table>
    <tr>
      <th>Id</th>
      <th>Content</th>
      <th>Done</th>
    </tr>
    <tr v-for="todo in data?.todos">
      <td>{{ todo.id }}</td>
      <td>{{ todo.content }}</td>
      <td>{{ todo.done }}</td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { Todo } from "server/utils/drizzle/schema";

type FormPayload = Event & {
  currentTarget: EventTarget & HTMLFormElement;
};

await useFetch("/api/todos", { key: "todos" });

const { data } = useNuxtData<{ todos: Todo[] }>("todos");

async function submitCreateTodo(payload: FormPayload) {
  const formData = new FormData(payload.currentTarget);

  let prevData: { todos: Todo[] } | null;

  await useFetch("/api/todos", {
    method: "post",
    body: { content: formData.get("content") },
    key: "addTodo",
    onRequest() {
      prevData = data.value;

      const newTodo: Omit<Todo, "id"> = {
        content: formData.get("content")?.toString() ?? null,
        done: false,
      };

      data.value?.todos.push(newTodo as Todo);
    },
    onRequestError() {
      data.value = prevData;
    },
    async onResponse() {
      await refreshNuxtData("todos");
    },
  });
}
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}

table,
th,
td {
  border: solid black 1px;
}

tr:nth-child(odd) {
  background: lightgray;
}
</style>
