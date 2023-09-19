<template>
    <v-footer app class="bg-grey-lighten-4">
        <v-row justify="center" class="mt-2">
            <v-btn
                v-for="link in links"
                :key="link"
                variant="text"
            >
                {{ link }}
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
            'CЕРВЕРИ',
            'ГРАФІКИ',
            'БАЗИ ДАНИХ',
            'РОЗРОБКА',
            'ІНСТРУКЦІЇ',
        ],
    }),
}
</script>