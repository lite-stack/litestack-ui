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
                    max-width="330"
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
                        <ServerCreateDialog @created="createdServer"/>
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
                <v-toolbar class="px-2"
                >
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
                    <ServerCreateDialog @created="createdServer"/>
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
                    <router-link :to="{ name: 'Server instanse', params: {name: server.name} }"
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
                       target="_blank">{{ server.public_ip }}</a></td>
                <td><a :href='"http://" + server.private_ip' class="text-decoration-none"
                       target="_blank">{{ server.private_ip }}</a>
                </td>
                <td>{{ server.launched_at }}</td>
                <td>
                    <v-row>
                        <v-spacer></v-spacer>
                        <ServerUpdateDialog v-bind:name=server.name @updated="updateServer"/>
                        <v-spacer></v-spacer>
                        <ServerDeleteDialog v-bind:name=server.name @deleted="deleteServer"/>
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
import ServerService from "@/services/server"
import ServerCreateDialog from "@/views/server/ServerCreateDialog.vue"
import ServerDeleteDialog from "@/views/server/ServerDeleteDialog.vue"
import ServerUpdateDialog from "@/views/server/ServerUpdateDialog.vue"

export default {
    name: 'Servers',
    components: {ServerDeleteDialog, ServerCreateDialog, ServerUpdateDialog},
    created() {
        this.fetchServerConfigs()
        this.fetchServers()
        this.fetchServersLimit()
    },
    data() {
        return {
            configs: [],
            servers: [],
            serverLimit: 0,
        }
    },
    methods: {
        fetchServerConfigs() {
            this.configs = ServerService.getConfigs()
        },
        fetchServers() {
            this.servers = ServerService.getServers()
        },
        fetchServersLimit() {
            this.serverLimit = ServerService.getServersLimit()
        },
        createdServer() {
            console.log("server created")
            this.fetchServers()
        },
        updateServer(name) {
            console.log("server updated " + name)
        },
        deleteServer(name) {
            console.log("server deleted " + name)
        },
    }
}
</script>