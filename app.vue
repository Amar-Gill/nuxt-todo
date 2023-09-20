<template>
  <nav>
    <ul>
      <li v-if="fetchingAuth">
        Loading...
      </li>
      <li v-if="auth">
        Loggin in as: {{ auth?.user.userId }}
      </li>
      <li>
        <NuxtLink to="/">
          Home
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/todos">
          Todos
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/login">
          Login
        </NuxtLink>
      </li>
      <li v-if="auth">
        <NuxtLink :to="`/users/${auth?.user.userId}/blog`">
          Blog
        </NuxtLink>
      </li>
      <li v-if="auth">
        <NuxtLink :to="`/users/${auth?.user.userId}/blog/new`">
          New blog post
        </NuxtLink>
      </li>
    </ul>
  </nav>
  <NuxtPage />
</template>

<script setup lang="ts">
const { auth, fetchingAuth } = useAuth();
</script>

<style></style>
