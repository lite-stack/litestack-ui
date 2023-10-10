<script setup>

</script>

<template>
    <v-container>
        <v-slide-group
            show-arrows
        >
            <v-slide-group-item
                v-for="config in configs"
                :key="config.name"
            >
                <v-card
                    class="ma-3 d-flex flex-column pa-2"
                    max-width="450"
                    variant="tonal"
                >
                    <v-card-text>
                        <p class="text-h5 text--primary text-primary mb-1">
                            {{ config.name }}
                        </p>
                        <div class="text--primary">
                            {{ config.description }}
                        </div>
                    </v-card-text>
                    <v-spacer></v-spacer>
                    <v-card-actions>
                        <ServerCreateDialog @created="createdServer" v-bind:configs=get_config_name()
                                            v-bind:selected_config="config.name"/>
                    </v-card-actions>
                </v-card>
            </v-slide-group-item>
        </v-slide-group>
    </v-container>
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
                    <ServerCreateDialog @created="createdServer" v-bind:configs="get_config_name()"/>
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
                    Публіна IP-адреса
                </th>
                <th class="text-left">
                    Приватна IP-адреса
                </th>
                <th class="text-left">
                    Дата створення
                </th>
                <th class="text-center">
                    Дії
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
                <td><a :href='"http://" + server.public_ip' class="text-decoration-none"
                       target="_blank">{{ server.public_ip || '-' }}</a></td>
                <td><a :href='"http://" + server.private_ip' class="text-decoration-none"
                       target="_blank">{{ server.private_ip || '-' }}</a>
                </td>
                <td>{{ server.launched_at || '-' }}</td>
                <td>
                    <v-row>
                        <v-spacer></v-spacer>
                        <ServerUpdateDialog v-bind:server=server @updated="updateServer"/>
                        <v-spacer></v-spacer>
                        <ServerDeleteDialog v-bind:id=server.id @deleted="deleteServer"/>
                        <v-spacer></v-spacer>
                    </v-row>
                </td>
            </tr>
            </tbody>
        </v-table>
    </v-container>

</template>

<style scoped>

</style>

<script>
import {useAlertStore} from '@/stores/alert.store.js';

import ServerService from "@/services/server"
import ServerCreateDialog from "@/views/server/ServerCreateDialog.vue"
import ServerDeleteDialog from "@/views/server/ServerDeleteDialog.vue"
import ServerUpdateDialog from "@/views/server/ServerUpdateDialog.vue"

export default {
    name: 'Servers',
    components: {ServerDeleteDialog, ServerCreateDialog, ServerUpdateDialog},
    async created() {
        await this.fetchServerConfigs()
        await this.fetchServersLimit()
        await this.fetchServers()
    },
    data() {
        return {
            configs: [],
            servers: [],
            serverLimit: 0,
            loading: true,
        }
    },
    methods: {
        async fetchServerConfigs() {
            try {
                this.configs = await ServerService.getConfigs()
            } catch (error) {
                useAlertStore().error(error);
            }
        },
        async fetchServers() {
            try {
                this.servers = await ServerService.getServers()
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
        async createdServer() {
            await this.fetchServers()
        },
        async updateServer(id) {
            await this.fetchServers()
        },
        async deleteServer(id) {
            await this.fetchServers()
        },
        get_config_name() {
            let configNames = []

            for (let config of this.configs) {
                configNames.push(config.name)
            }

            return configNames
        }
    }
}
</script>