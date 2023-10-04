<script setup>
import { useAuthStore } from '@/stores/auth.store.js';
import { router } from '@/router';

// redirect home if already logged in
const authStore = useAuthStore();
if (authStore.user) {
  router.push('/');
}
</script>

<template>
  <div class="container">
    <div class="row">
        <router-view />
    </div>
  </div>
</template>