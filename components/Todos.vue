<template>
  <div v-if="fetchingAuth || (pending && !data && !error)">
    Loading...
  </div>
  <div v-else-if="error">
    {{ error }}
  </div>
  <div v-else>
    <form
      method="post"
      @submit.prevent="((e:FormPayload) => submitCreateTodo(e))"
    >
      <label for="content">Content</label>
      <input
        type="text"
        name="content"
      >
      <button>Create</button>
    </form>
    <table>
      <tr>
        <th>Id</th>
        <th>Content</th>
        <th>Done</th>
        <th />
      </tr>
      <tr v-for="todo in data?.todos">
        <td>{{ todo.id }}</td>
        <td>{{ todo.content }}</td>
        <td>
          <input
            type="checkbox"
            :checked="todo.done"
            v-bind="todo.done"
            @change="((e: InputPayload) => handleDoneCheckboxChanged(e, todo))"
          >
        </td>
        <td>
          <button @click.prevent="deleteTodo(todo)">
            Delete
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { InsertTodoSansAuth, Todo } from '@/server/utils/drizzle/schema';

const { auth, fetchingAuth } = useAuth();

type FormPayload = Event & {
  currentTarget: EventTarget & HTMLFormElement;
};

type InputPayload = Event & { currentTarget: EventTarget & HTMLInputElement };

const { pending, error } = await useFetch(
  `/api/todos?user-id=${auth.value?.user.userId}`,
  {
    key: 'todos',
    headers: { Authorization: `Bearer ${auth.value?.accessToken}` },
  }
);

const { data } = useNuxtData<{ todos: Todo[] }>('todos');

onMounted(() => {
  if (!data.value) {
    refreshNuxtData('todos');
  }
});

async function submitCreateTodo(payload: FormPayload) {
  const formData = new FormData(payload.currentTarget);

  let prevData: { todos: Todo[] } | null;

  await useFetch('/api/todos', {
    method: 'post',
    body: { content: formData.get('content') },
    headers: { Authorization: `Bearer ${auth.value?.accessToken}` },
    key: 'addTodo',
    onRequest() {
      prevData = data.value;

      const newTodo: InsertTodoSansAuth = {
        content: formData.get('content')?.toString() ?? '',
      };

      data.value?.todos.push(newTodo as Todo);
    },
    onRequestError() {
      data.value = prevData;
    },
    async onResponse() {
      await refreshNuxtData('todos');
    },
  });
}

async function deleteTodo(todo: Todo) {
  let prevData: { todos: Todo[] } | null;

  await useFetch(`/api/todos/${todo.id}`, {
    method: 'delete',
    key: 'deleteTodo',
    headers: { Authorization: `Bearer ${auth.value?.accessToken}` },
    onRequest() {
      prevData = data.value;

      const newTodos = data.value?.todos.filter(({ id }) => id !== todo.id)!;

      data.value = { todos: newTodos };
    },
    onRequestError() {
      data.value = prevData;
    },
    async onResponse() {
      await refreshNuxtData('todos');
    },
  });
}

async function handleDoneCheckboxChanged(e: InputPayload, todo: Todo) {
  const done = e.currentTarget.checked;

  const updatedTodo = data.value?.todos.find(({ id }) => id === todo.id)!;

  await useFetch(`/api/todos/${todo.id}`, {
    method: 'PATCH',
    key: 'patchTodo',
    body: { done },
    headers: { Authorization: `Bearer ${auth.value?.accessToken}` },
    onRequest() {
      updatedTodo.done = done;
    },
    onRequestError() {
      updatedTodo.done = !done;
    },
    async onResponse() {
      await refreshNuxtData('todos');
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
