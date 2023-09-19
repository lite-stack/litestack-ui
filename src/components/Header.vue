<template>
    <v-toolbar dense>
<v-img
            src="src/assets/logo.full.svg"
            width="250"
            max-width="350"
        ></v-img>

        <v-spacer></v-spacer>

        <v-btn
            v-for="link in links"
            :key="link"
            variant="text"
        >
            {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <div class="d-flex justify-space-around" style="width:250px; max-width:350px">
            <v-btn
                class="mx-4"
                icon="mdi-login"
                variant="plain"
            ></v-btn>
        </div>

    </v-toolbar>
</template>

<script>
export default {
    name: 'Header',
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