<script setup lang="ts">
import TipTap from '~/components/TipTap.vue';

definePageMeta({
  middleware: 'auth',
});

const tiptap = ref<InstanceType<typeof TipTap> | null>(null);

const saving = ref(false);

const save = async () => {
  saving.value = true;
  const json = tiptap.value?.json;
  console.log('editor json', json);
  const res = await $fetch('/api/posts', {
    method: 'POST',
    body: json,
  });
  console.log('res', res);
  saving.value = false;
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
