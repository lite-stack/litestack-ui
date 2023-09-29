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
                <router-view></router-view>
            </v-container>
        </v-main>

        <Footer/>
    </v-app>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

import { useAuthStore } from '@/stores/auth.store.js';
import Nav from "@/components/Nav.vue";
import Alert from "@/components/Alert.vue";

const authStore = useAuthStore();
</script>