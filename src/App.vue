<template>
    <v-app>

      <Header v-if="authStore.isLogged"/>

      <Alert v-if="authStore.isLogged"/>
      <router-view></router-view>

      <Footer v-if="authStore.isLogged"/>
    </v-app>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

import { useAuthStore } from '@/stores/auth.store.js';
import Alert from "@/components/Alert.vue";

const authStore = useAuthStore();
</script>

<style>
@import './assets/css/global.css';
</style>

