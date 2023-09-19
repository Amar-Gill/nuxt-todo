<script lang="ts" setup>
const { fetchingAuth } = useAuth();

definePageMeta({
  middleware: 'auth',
});
</script>

<template>
  <div v-if="fetchingAuth">
    Loading...
  </div>
  <div v-else>
    Da home page!
  </div>
</template>

<style scoped></style>
