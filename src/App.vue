<template>
    <v-app color="primary">
        <v-app-bar app
                   color="primary"
                   dark>
            <Header/>
        </v-app-bar>

        <v-main>
            <v-container>
                <HelloWorld/>
            </v-container>
        </v-main>

        <Footer/>
    </v-app>
</template>

<script setup>
import HelloWorld from "@/components/HelloWorld.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>