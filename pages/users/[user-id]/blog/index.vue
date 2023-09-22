<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const { params } = useRoute();

const { auth, fetchingAuth } = useAuth();

const { data, pending, error } = await useFetch(
  `/api/posts?author-id=${params.userid.toString()}`,
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
    <ul>
      <li
        v-for="post in data.posts"
        :key="post.id"
      >
        {{ post.title }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
