<template>
    <v-dialog
        v-model="dialog"
        max-width="500px"
    >
        <template v-slot:activator="{ props }">
            <v-btn
                color="red"
                class="mb-2"
                v-bind="props"
                variant="tonal"
            >
                Видалити
            </v-btn>

        </template>
        <v-card>
            <v-card-title class="text">Ви впевненні, що хочете видалити сервер?</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" variant="tonal" @click="deleteServer" :loading="loading">Так</v-btn>
                <v-btn color="primary" variant="tonal" @click="close">Ні</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import ServerService from "@/services/server"
import {useAlertStore} from '@/stores/alert.store.js';

export default {
    name: 'ServerDeleteDialog',
    props: ['id'],
    data() {
        return {
            dialog: false,
            loading: false,
        }
    },
    methods: {
        close() {
            this.dialog = false
        },
        async deleteServer() {
            this.loading = true
            try {
                await ServerService.deleteServer(this.$props.id);
                this.$emit('deleted', this.$props.id);
            } catch (error) {
                useAlertStore().error(error);
            } finally {
                this.close();
                this.loading = false
            }
        }
    }
}
</script>