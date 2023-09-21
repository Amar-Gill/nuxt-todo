<script setup lang="ts">
import TipTap from '~/components/TipTap.vue';

definePageMeta({
  middleware: 'auth',
});

const tiptap = ref<InstanceType<typeof TipTap> | null>(null);

const save = () => {
  const json = tiptap.value?.json;
  console.log('editor json', json);
};
</script>

<template>
  <div>
    <div>
      <button @click="save">
        Save~~~
      </button>
    </div>
    <TipTap ref="tiptap" />
  </div>
</template>

<style scoped></style>
