<template>
  <v-app color="primary">
    <v-app-bar app
               color="primary"
               dark>
      <Header/>
    </v-app-bar>

    <v-main>
      <v-container>
        <Alert/>
        Hi {{authUser?.firstName || "unknown user"}}!
        <ul v-if="users.length">
          <li v-for="user in users" :key="user.id">{{user.firstName}} {{user.lastName}}</li>

          <a @click="authStore.logout()" class="nav-item nav-link">Logout</a>
        </ul>
        <div v-if="users.loading" class="spinner-border spinner-border-sm"></div>
        <div v-if="users.error" class="text-danger">Error loading users: {{users.error}}</div>
      </v-container>
    </v-main>

    <Footer/>
  </v-app>
</template>

<script setup>
import { storeToRefs } from 'pinia';

import { useUsersStore } from '@/stores/users.store.js';
import { useAuthStore } from '@/stores/auth.store.js';
import Alert from "@/components/Alert.vue";

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

usersStore.getAll();
</script>