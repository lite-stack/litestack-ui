<template>
    <v-footer app color="#222222">
        <v-row justify="center" class="mt-2">
          <v-btn
              v-for="link in links"
              :key="link"
              variant="text"
          >
            <router-link :to="{ path: link[1]}">
              {{ link[0] }}
            </router-link>
          </v-btn>
            <v-col class="text-center mt-2" cols="12">
                {{ new Date().getFullYear() }} — <strong>LiteStack</strong>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script>
export default {
    name: 'Footer',
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