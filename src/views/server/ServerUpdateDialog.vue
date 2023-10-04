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
                Змінити
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5 text-primary">Зміна серверу</span>
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

                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="primary"
                    variant="text"
                    @click="update"
                    :loading="loading"
                >
                    Змінити
                </v-btn>
                <v-btn
                    color="red"
                    variant="text"
                    @click="close"
                >
                    Назад

                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import ServerService from "@/services/server"
import ServerUpdate from "@/models/server_update.js"
import {useAlertStore} from '@/stores/alert.store.js';

export default {
    name: 'ServerUpdateDialog',
    props: ['server'],
    data() {
        return {
            dialog: false,
            server: new ServerUpdate(this.$props.server.id, this.$props.server.name, this.$props.server.description),
            loading: false,
        }
    },
    methods: {
        close() {
            this.dialog = false
        },
        async update() {
            this.loading = true
            try {
                await ServerService.updateServer(this.server);
                this.$emit('updated', this.$props.server.id);
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