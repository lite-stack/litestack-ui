<template>
    <v-dialog
        v-model="dialog"
        max-width="500px"
    >
        <template v-slot:activator="{ props }">
            <v-btn
                color="primary"
                class="mb-2"
                v-bind="props"
                variant="tonal"
            >
                Створити сервер
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5 text-primary">Створення серверу</span>
            </v-card-title>

            <v-card-text>
                <v-container>

                    <v-text-field
                        label="Назва"
                        v-model="server.name"
                    ></v-text-field>

                    <v-textarea
                        label="Опис"
                        v-model="server.description"
                    ></v-textarea>

                    <v-select
                        label="Select"
                        :items=configs
                        v-model="server.configuration_name"
                    ></v-select>

                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    @click="create"
                    variant="tonal"
                    :loading="loading"
                >
                    Створити
                </v-btn>
                <v-btn
                    color="red"
                    @click="close"
                    variant="tonal"
                >
                    Назад
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import ServerCreate from '@/models/server_create.js'
import ServerService from "@/services/server"
import {useAlertStore} from '@/stores/alert.store.js';

export default {
    name: 'ServersCreateDialog',
    props: {
        configs: {
            type: Array,
            required: true,
            default: []
        },
        selected_config: {
            type: String,
            required: false,
            default: ''
        },

    },
    data() {
        return {
            loading: false,
            dialog: false,
            server: new ServerCreate('', '', this.$props.selected_config)
        }
    },
    methods: {
        close() {
            this.dialog = false
        },
        async create() {
            this.loading = true
            try {
                await ServerService.createServer(this.server);
                this.$emit('created');
            } catch (error) {
                useAlertStore().error(error);
            } finally {
                this.close();
                this.loading = false
            }
        },
    }
}
</script>