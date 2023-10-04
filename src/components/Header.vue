<template>
    <v-toolbar
        color="#222222"
        dark
    >
      <router-link to="/">
        <v-img
            src="../src/assets/logo-full-white.svg"
            width="150"
            max-width="150"
            class="mx-8"
        ></v-img>
      </router-link>

        <v-spacer></v-spacer>
          <v-btn
              v-for="link in links"
              :key="link"
              variant="text"
          >
            <router-link :to="{ path: link[1]}">
            {{ link[0] }}
            </router-link>
          </v-btn>



        <v-spacer></v-spacer>

        <div class="d-flex justify-space-around" style="width:250px; max-width:350px">
          <router-link v-if="!authStore.user" to="/login">
            <v-btn
                class="mx-4"
                icon="mdi-login"
                variant="plain"
            ></v-btn>
          </router-link>
          <router-link v-if="authStore.user" to="/users" class="nav-item nav-link">Users</router-link>
          <button v-if="authStore.user" @click="authStore.logout()" class="btn btn-link nav-item nav-link">Logout</button>
        </div>

    </v-toolbar>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.store.js';

const authStore = useAuthStore();
</script>

<script>
export default {
    name: 'Header',
    data: () => ({
        links: [
            ['CЕРВЕРИ', '/servs'],
            ['ГРАФІКИ', '/graphs'],
            ['БАЗИ ДАНИХ', '/databases'],
            ['РОЗРОБКА', '/coding'],
            ['ІНСТРУКЦІЇ', '/instructions'],
        ],
    }),
}
</script>
