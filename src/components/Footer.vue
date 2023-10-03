<template>
    <v-footer app color="#222222">
        <v-row justify="center" class="mt-2">
            <v-btn
                v-for="link in links"
                :key="link"
                variant="text"
                :to="{ path: link[1]}"
                class="mx-2"
            >
                {{ link[0] }}
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