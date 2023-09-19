<script lang="ts" setup>
const authClient = useAuthClient();
</script>

<template>
  <div>
    <button @click="authClient.redirectToLoginPage">
      Login
    </button>
    <button @click="() => authClient.logout(true)">
      Logout
    </button>
  </div>
</template>

<style scoped></style>
