<script lang="ts" setup>
const { params } = useRoute();

const { auth, fetchingAuth } = useAuth();

const { data, pending, error } = await useFetch(
  `/api/posts/${params.postid.toString()}`,
  { headers: { Authorization: `Bearer ${auth.value?.accessToken}` } }
);
</script>

<template>
  <div>
    omg le edit!!!!!!!!!!!!
    <TipTap
      ref="tiptap"
      :content="data.post.content"
    />
  </div>
</template>

<style scoped></style>
