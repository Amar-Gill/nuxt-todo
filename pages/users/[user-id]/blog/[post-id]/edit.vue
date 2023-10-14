<script lang="ts" setup>
import TipTap from '~/components/TipTap.vue';
import { InsertBlogPostSansAuth } from '~/server/utils/drizzle/schema';

const { params } = useRoute();

const { auth, fetchingAuth } = useAuth();

const { data, pending, error } = await useFetch(
  `/api/posts/${params.postid.toString()}`,
  { headers: { Authorization: `Bearer ${auth.value?.accessToken}` } }
);

const tiptap = ref<InstanceType<typeof TipTap> | null>(null);

const saving = ref(false);

const autosave = ref(true);

const save = async () => {
  saving.value = true;

  const json = tiptap.value?.editor?.getJSON();

  const patchProps = {
    title: 'updated title',
    content: json,
  } satisfies InsertBlogPostSansAuth;

  $fetch(`/api/posts/${params.postid.toString()}`, {
    method: 'PATCH',
    body: patchProps,
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
  <div v-if="fetchingAuth || (pending && !data && !error)">
    Loading... 🚰
  </div>
  <div v-else-if="error">
    {{ error }}
  </div>
  <div v-else>
    <button
      :disabled="saving"
      @click="save"
    >
      Omg le Save!
    </button>
    autosave:
    <input
      v-model="autosave"
      type="checkbox"
    >
    <TipTap
      ref="tiptap"
      :content="data?.post.content"
      @update="autosave && save()"
    />
  </div>
</template>

<style scoped></style>
