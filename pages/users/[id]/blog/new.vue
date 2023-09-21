<script setup lang="ts">
import TipTap from '~/components/TipTap.vue';
import { InsertBlogPostSansAuth } from '~/server/utils/drizzle/schema';

definePageMeta({
  middleware: 'auth',
});

const { auth } = useAuth();

const tiptap = ref<InstanceType<typeof TipTap> | null>(null);

const saving = ref(false);

const save = async () => {
  saving.value = true;

  const json = tiptap.value?.editor?.getJSON();

  const newBlogPost = {
    title: 'New Blog Post',
    content: json,
  } satisfies InsertBlogPostSansAuth;

  $fetch('/api/posts', {
    method: 'POST',
    body: newBlogPost,
    headers: { Authorization: `Bearer ${auth.value?.accessToken}` },
  })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      saving.value = false;
    });
};
</script>

<template>
  <div>
    <div>
      <button
        :disabled="saving"
        @click="save"
      >
        Save~~~
      </button>
    </div>
    <TipTap ref="tiptap" />
  </div>
</template>

<style scoped></style>
