<template>
    <v-container>
        <v-table
            class="elevation-1"
            :key="servers">
            <template v-slot:top>
                <v-toolbar>
                    <v-toolbar-title class="text-h4 text--primary text-primary">
                        Сервери
                        <v-chip color="primary">{{ servers.length }} / {{ serverLimit }}</v-chip>
                    </v-toolbar-title>

                    <v-divider
                        class="mx-4"
                        inset
                        vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>
            <thead>
            <tr>
                <th class="text-left">
                    Назва
                </th>
                <th class="text-left">
                    Статус
                </th>
                <th class="text-left">
                    Torch
                </th>
                <th class="text-left">
                    Tesnorflow
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="server in servers"
                :key="server.name"
            >
                <td>
                    <router-link :to="{ name: 'Server instanse', params: {id: server.id} }"
                                 class="text-decoration-none">
                        {{ server.name }}
                    </router-link>
                </td>
                <td :class="font-weight-medium">
                    <v-chip :color="server.getStatusColor()">
                        {{ server.getStatus() }}
                    </v-chip>
                </td>
                <td>
                    <v-row>
                        <v-btn
                            v-if="!server.tags || !server.tags.find(elem => elem === 'torch')"
                            color="primary"
                            class="mb-2"
                            v-bind="props"
                            variant="tonal"
                            @click="installTorch(server.id)"
                            :loading="loading"
                            :disabled="server.tags.find(elem => elem === 'loading')"
                        >
                            Встановити
                        </v-btn>
                        <v-btn
                            v-else
                            color="primary"
                            class="mb-2"
                            v-bind="props"
                            variant="tonal"
                            @click="deleteTorch(server.id)"
                            :loading="loading"
                            :disabled="server.tags.find(elem => elem === 'loading')"
                        >
                            Видалити
                        </v-btn>
                    </v-row>
                </td>
                <td>
                    <v-row>
                        <v-btn
                            v-if="!server.tags || !server.tags.find(elem => elem === 'tensorflow')"
                            color="primary"
                            class="mb-2"
                            v-bind="props"
                            variant="tonal"
                            @click="installTensorflow(server.id)"
                            :loading="loading"
                            :disabled="server.tags.find(elem => elem === 'loading')"
                        >
                            Встановити
                        </v-btn>
                        <v-btn
                            v-else
                            color="primary"
                            class="mb-2"
                            v-bind="props"
                            variant="tonal"
                            @click="deleteTensorflow(server.id)"
                            :loading="loading"
                            :disabled="server.tags.find(elem => elem === 'loading')"
                        >
                            Видалити
                        </v-btn>
                    </v-row>
                </td>
            </tr>
            </tbody>
        </v-table>
    </v-container>
</template>

<script>
import {useAlertStore} from '@/stores/alert.store.js';

import ServerService from "@/services/server"
import ServerDeleteDialog from "@/views/server/ServerDeleteDialog.vue"
import ServerUpdateDialog from "@/views/server/ServerUpdateDialog.vue"

export default {
    name: 'Instruments',
    components: {ServerDeleteDialog, ServerUpdateDialog},
    async created() {
        await this.fetchServersLimit()
        await this.fetchAppropriateServers()
    },
    data() {
        return {
            configs: [],
            servers: [],
            serverLimit: 0
        }
    },
    methods: {
        async fetchAppropriateServers() {
            try {
                this.servers = await ServerService.getConfigurableServers()
            } catch (error) {
                useAlertStore().error(error);
            }
        },
        async fetchServersLimit() {
            try {
                this.serverLimit = await ServerService.getServersLimit()
            } catch (error) {
                useAlertStore().error(error);
            }
        },

        async installTorch(id) {
            this.loading = true;
            try {
                await ServerService.runCommand(id, 'install_torch');
            } catch (error) {
                useAlertStore().error(error);
            } finally {
                this.fetchAppropriateServers();
                this.loading = false;
            }
        },
        async deleteTorch(id) {
           this.loading = true;
           try {
              await ServerService.runCommand(id, 'delete_torch');
           } catch (error) {
              useAlertStore().error(error);
           } finally {
              this.fetchAppropriateServers();
              this.loading = false;
           }
        },
        async installTensorflow(id) {
           this.loading = true;
           try {
              await ServerService.runCommand(id, 'install_tensorflow');
           } catch (error) {
              useAlertStore().error(error);
           } finally {
              this.fetchAppropriateServers();
              this.loading = false;
           }
        },
        async deleteTensorflow(id) {
           this.loading = true;
           try {
              await ServerService.runCommand(id, 'delete_tensorflow');
           } catch (error) {
              useAlertStore().error(error);
           } finally {
              this.fetchAppropriateServers();
              this.loading = false;
           }
        },
    }
}
</script>

<style scoped>

</style>