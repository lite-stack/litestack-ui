<template>
  <v-app color="primary">
    <v-app-bar app
               color="primary"
               dark>
      <OpenHeader/>
    </v-app-bar>

    <v-content>
      <HelloWorld msg="test"></HelloWorld>

    </v-content>

    <OpenFooter />
  </v-app>
</template>

<script setup>
import HelloWorld from "@/components/HelloWorld.vue";
import OpenHeader from "@/components/OpenHeader.vue";
import OpenFooter from "@/components/OpenFooter.vue";
</script>