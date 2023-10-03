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
                    ></v-text-field>

                    <v-textarea
                        label="Опис"
                    ></v-textarea>

                </v-container>
            </v-card-text>
            
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    @click="create"
                    variant="tonal"
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
import ServerService from "@/services/server"

export default {
    name: 'ServersCreateDialog',
    data() {
        return {
            dialog: false,
        }
    },
    methods: {
        close() {
            this.dialog = false
        },
        create() {
            ServerService.createServer();
            this.close();
            this.$emit('created');
        }
    }
}
</script>