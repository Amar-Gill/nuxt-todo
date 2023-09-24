<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});

const { params } = useRoute();

const { auth, fetchingAuth } = useAuth();

const { data, pending, error } = await useFetch(
  `/api/posts/${params.postid.toString()}`,
  {
    headers: { Authorization: `Bearer ${auth.value?.accessToken}` },
  }
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
    a blog id: {{ data?.post.id }}
  </div>
</template>
