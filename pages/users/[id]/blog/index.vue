<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const { auth, fetchingAuth } = useAuth();

const { data, pending, error } = await useFetch(
  `/api/posts?author-id=${auth.value?.user.userId}`,
  { headers: { Authorization: `Bearer ${auth.value?.accessToken}` } }
);
</script>

<template>
  <div v-if="fetchingAuth || (pending && !data && !error)">
    Loading... 🚰
  </div>
  <div v-else-if="error">
    {{ error }}
  </div>
  <div v-else>
    Num posts: {{ data?.posts.length }}
  </div>
</template>

<style scoped></style>
