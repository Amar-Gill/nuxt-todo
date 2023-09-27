<script setup lang="ts">
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';

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

const tiptapExtensions = [StarterKit];

const htmlString = computed(() =>
  generateHTML(data.value.post.content, tiptapExtensions)
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
    <div v-html="htmlString" />
  </div>
</template>
