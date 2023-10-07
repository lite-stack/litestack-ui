<script setup>

</script>

<template>
    <v-container>
        <v-card>
            <v-tabs
                v-model="tab"
                bg-color="dark"
            fixed-tabs >
                <v-tab value="servers">Сервери</v-tab>
                <v-tab value="graphs">Графіки</v-tab>
                <v-tab value="dbs">Бази даних</v-tab>
                <v-tab value="dev">Розробка</v-tab>

            </v-tabs>

            <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="servers">
                        <Servers/>
                    </v-window-item>
                    <v-window-item value="graphs">
                        Graphs
                    </v-window-item>
                    <v-window-item value="dbs">
                        DBs
                    </v-window-item>
                    <v-window-item value="dev">
                        Dev
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<style scoped>

</style>

<script>
import Servers from "@/views/instructions/Servers.vue"

export default {
    data: () => ({
        tab: null,
    }),
    components: {
        Servers,
    }
}
</script>