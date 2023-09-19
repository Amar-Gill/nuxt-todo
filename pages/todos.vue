<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
});
</script>

<template>
  <div>
    <TodosContainer />
  </div>
</template>

<style scoped></style>
