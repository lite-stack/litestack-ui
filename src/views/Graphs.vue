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
                    Grafana
                </th>
                <th class="text-left">
                    Matplotlib
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
                    <v-tooltip
                        v-if="server.tags && server.tags.find(elem => elem === 'loading')"
                        text="На сервері встановлюється додаток. На разі, неможливо зробити дію.">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" icon="mdi-information" color="primary"></v-icon>
                        </template>
                    </v-tooltip>
                </td>
                <td :class="font-weight-medium">
                    <v-chip :color="server.getStatusColor()">
                        {{ server.getStatus() }}
                    </v-chip>
                </td>
                <td>
                    <v-row>
                        <v-btn
                            v-if="!server.tags || !server.tags.find(elem => elem === 'grafana')"
                            color="primary"
                            class="mb-2"
                            v-bind="props"
                            variant="tonal"
                            @click="installGrafana(server.id)"
                            :loading="loading"
                            :disabled="server.tags && server.tags.find(elem => elem === 'loading')"
                        >
                            Встановити
                        </v-btn>
                        <v-btn
                            v-else
                            color="primary"
                            class="mb-2"
                            v-bind="props"
                            variant="tonal"
                            @click="deleteGrafana(server.id)"
                            :loading="loading"
                            :disabled="server.tags && server.tags.find(elem => elem === 'loading')"
                        >
                            Видалити
                        </v-btn>
                    </v-row>
                </td>
                <td>
                    <v-row>
                        <v-btn
                            v-if="!server.tags || !server.tags.find(elem => elem === 'matplotlib')"
                            color="primary"
                            class="mb-2"
                            v-bind="props"
                            variant="tonal"
                            @click="installMatplotlib(server.id)"
                            :loading="loading"
                            :disabled="server.tags && server.tags.find(elem => elem === 'loading')"
                        >
                            Встановити
                        </v-btn>
                        <v-btn
                            v-else
                            color="primary"
                            class="mb-2"
                            v-bind="props"
                            variant="tonal"
                            @click="deleteMatplotlib(server.id)"
                            :loading="loading"
                            :disabled="server.tags && server.tags.find(elem => elem === 'loading')"
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
    },
    data() {
        return {
            configs: [],
            servers: [],
            serverLimit: 0
        }
    },
    async mounted() {
        await this.pollServers();
    },
    methods: {
        async fetchAppropriateServers() {
            try {
                this.servers = await ServerService.getConfigurableServers()
            } catch (error) {
                useAlertStore().error(error);
            }
        },
        async pollServers() {
            while (true) {
                await this.fetchAppropriateServers();
                await new Promise(resolve => setTimeout(resolve, 10000)); 
            }
        },
        async fetchServersLimit() {
            try {
                this.serverLimit = await ServerService.getServersLimit()
            } catch (error) {
                useAlertStore().error(error);
            }
        }
        ,

        async installGrafana(id) {
            this.loading = true;
            try {
                await ServerService.runCommand(id, 'install_grafana');
            } catch (error) {
                useAlertStore().error(error);
            } finally {
                this.fetchAppropriateServers();
                this.loading = false;
            }
        }
        ,
        async deleteGrafana(id) {
            this.loading = true;
            try {
                await ServerService.runCommand(id, 'delete_grafana');
            } catch (error) {
                useAlertStore().error(error);
            } finally {
                this.fetchAppropriateServers();
                this.loading = false;
            }
        }
        ,
        async installMatplotlib(id) {
            this.loading = true;
            try {
                await ServerService.runCommand(id, 'install_matplotlib');
            } catch (error) {
                useAlertStore().error(error);
            } finally {
                this.fetchAppropriateServers();
                this.loading = false;
            }
        }
        ,
        async deleteMatplotlib(id) {
            this.loading = true;
            try {
                await ServerService.runCommand(id, 'delete_matplotlib');
            } catch (error) {
                useAlertStore().error(error);
            } finally {
                this.fetchAppropriateServers();
                this.loading = false;
            }
        }
        ,
    }
}
</script>

<style scoped>

</style>