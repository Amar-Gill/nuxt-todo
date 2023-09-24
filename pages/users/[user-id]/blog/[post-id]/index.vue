<script setup lang="ts">
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import CodeBlock from '@tiptap/extension-code-block';
import ListItem from '@tiptap/extension-list-item';
import Italic from '@tiptap/extension-italic';
import Bold from '@tiptap/extension-bold';
import HardBreak from '@tiptap/extension-hard-break';
import { generateHTML } from '@tiptap/html';

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

const tiptapExtensions = [
  Document,
  Paragraph,
  Text,
  Heading,
  Blockquote,
  BulletList,
  CodeBlock,
  ListItem,
  Italic,
  Bold,
  HardBreak,
];

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
