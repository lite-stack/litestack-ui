<template>
    <v-app>

      <Header v-if="authStore.user"/>


      <Alert/>
      <router-view></router-view>


      <Footer v-if="authStore.user"/>
    </v-app>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

import { useAuthStore } from '@/stores/auth.store.js';
import Alert from "@/components/Alert.vue";

const authStore = useAuthStore();
</script>


