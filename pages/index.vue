<script lang="ts" setup>
const { fetchingAuth } = useAuth();
</script>

<template>
  <div v-if="fetchingAuth">Loading...</div>
  <div v-else>Da home page!</div>
</template>

<style scoped></style>
