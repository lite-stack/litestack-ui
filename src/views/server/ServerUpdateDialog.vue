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
                    variant="text"
                    @click="update"
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

export default {
    name: 'ServerUpdateDialog',
    props: ['name'],
    data() {
        return {
            dialog: false,
        }
    },
    methods: {
        close() {
            this.dialog = false
        },
        update() {
            ServerService.updateServer(this.$props.name);
            this.close();
            this.$emit('updated', this.$props.name);
        }
    }
}
</script>