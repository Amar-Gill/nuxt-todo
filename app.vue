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
