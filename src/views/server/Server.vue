<template>
    <v-row
        align="start"
        class="pa-2 ma-2"
    >
        <v-col
            cols="3"
            class="pa-2 ma-2"
        >
            <v-card
                variant="tonal"
                color="bg-secondary"
            >
                <v-card-item>
                    <div>
                        <div class="text-overline mb-1">
                            Базова інофрмація
                        </div>
                        <div class="text-caption" v-for="(value, name) in server">
                            <div v-if="serverMapLable[name] && value !== null">
                                <span class="font-weight-bold card-text">{{
                                        serverMapLable[name] || toTitle(name)
                                    }}</span>:
                                <span class="field_value card-text" v-if="name==='status'">{{
                                        server.getStatus()
                                    }}</span>
                                <span class="field_value card-text"
                                      v-else-if="(name==='public_ip' || name==='private_ip') && value !== ''">
                                    <a :href='"http://" + server.public_ip' class="text-decoration-none"
                                       target="_blank">{{ value }}</a>
                                </span>
                                <span class="field_value card-text" v-else>{{ value || '-' }}</span>
                            </div>

                        </div>
                    </div>
                </v-card-item>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <ServerUpdateDialog v-bind:server=server @updated="fetchServer"/>
                    <ServerDeleteDialog v-bind:id=server.id @deleted="goToServers"/>
                    <v-btn
                        class="mb-2"
                        variant="tonal"
                        color="primary"
                        append-icon="mdi-menu-down"
                        :loading="loading"
                    >
                        Дії
                        <v-menu activator="parent">
                            <v-list>
                                <v-list-item
                                    v-for="(item, index) in actions"
                                    :key="index"
                                    :value="index"
                                    @click="setServerStatus(item)"
                                >
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-btn>
                </v-card-actions>
            </v-card>
            <v-spacer class="ma-8"></v-spacer>
            <v-card
                variant="tonal"
                color="bg-secondary"
            >
                <v-card-item>
                    <div>
                        <div class="text-overline mb-1">
                            Конфігурація обладнання
                        </div>
                        <div class="text-caption" v-for="(value, name) in server.flavor">
                            <div v-if="flavorMapLable[name]">
                                <span class="font-weight-bold card-text">{{
                                        flavorMapLable[name] || toTitle(name)
                                    }}</span>: <span class="field_value card-text">{{ value || '-' }}</span>
                            </div>

                        </div>
                    </div>
                </v-card-item>
            </v-card>
            <v-spacer class="ma-8"></v-spacer>
            <v-card
                variant="tonal"
                color="bg-secondary"
            >
                <v-card-item>
                    <div>
                        <div class="text-overline mb-1">
                            Образ
                        </div>
                        <div class="text-caption" v-for="(value, name) in server.image">
                            <div v-if="imageMapLable[name]">
                                <span class="font-weight-bold card-text">{{
                                        imageMapLable[name] || toTitle(name)
                                    }}</span>:
                                <span class="field_value card-text" v-if="name==='status'">{{
                                        server.getStatus()
                                    }}</span>
                                <span class="field_value card-text" v-else>{{ value || '-' }}</span>
                            </div>

                        </div>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
        <v-col
            class="pa-2 ma-2"
        >
            <v-card
                variant="tonal"
                color="bg-secondary"
            >
                <v-card-item>
                    <div>
                        <div class="text-overline mb-1">
                            big block
                        </div>
                        <div class="text-caption">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut
                            labore et dolore magna aliqua. Laoreet id donec ultrices tincidunt arcu non sodales
                            neque.
                            Interdum velit laoreet id donec. Pharetra diam sit amet nisl suscipit adipiscing
                            bibendum.
                            Leo integer malesuada nunc vel risus commodo viverra maecenas. Auctor augue mauris augue
                            neque. Vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt. Eget
                            nullam
                            non nisi est sit amet. Massa tincidunt dui ut ornare lectus sit amet. Bibendum at varius
                            vel
                            pharetra vel. Sed egestas egestas fringilla phasellus.
                            Turpis cursus in hac habitasse platea. Sit amet porttitor eget dolor morbi non arcu.
                            Fringilla est ullamcorper eget nulla facilisi. In ante metus dictum at tempor commodo.
                            Sed
                            arcu non odio euismod lacinia at quis risus sed. Semper quis lectus nulla at volutpat
                            diam
                            ut venenatis. Ultrices tincidunt arcu non sodales. Faucibus scelerisque eleifend donec
                            pretium vulputate sapien nec sagittis. Sed vulputate odio ut enim blandit. Felis donec
                            et
                            odio pellentesque diam volutpat. Ac tincidunt vitae semper quis lectus nulla at volutpat
                            diam.
                        </div>
                    </div>
                </v-card-item>
            </v-card>
            <v-spacer class="mt-8"></v-spacer>
            <v-card
                variant="tonal"
                color="bg-secondary"
                v-if="server.metadata"
            >
                <v-card-item>
                    <div>
                        <div class="text-overline mb-1">
                            Метадані
                        </div>
                        <div class="text-caption">
                            <vue-json-pretty :data=JSON.parse(server.metadata) showLineNumber :deep=0
                                             showIcon/>
                        </div>
                    </div>
                </v-card-item>
            </v-card>
            <v-spacer class="mt-8"></v-spacer>
            <v-card
                variant="tonal"
                color="bg-secondary"
                v-if="server.full_info"
            >
                <v-card-item>
                    <div>
                        <div class="text-overline mb-1">
                            Уся інформація
                        </div>
                        <div class="text-caption">
                            <vue-json-pretty :data=JSON.parse(server.full_info) showLineNumber
                                             showIcon virtual/>
                        </div>
                    </div>
                </v-card-item>
            </v-card>

        </v-col>
    </v-row>
</template>

<script>
import {useAlertStore} from '@/stores/alert.store.js';
import VueJsonPretty from 'vue-json-pretty';
import ServerService from "@/services/server"
import ServerCreateDialog from "@/views/server/ServerCreateDialog.vue"
import ServerDeleteDialog from "@/views/server/ServerDeleteDialog.vue"
import ServerUpdateDialog from "@/views/server/ServerUpdateDialog.vue"


export default {
    name: 'Server',
    components: {ServerDeleteDialog, ServerCreateDialog, ServerUpdateDialog, VueJsonPretty},
    async created() {
        await this.fetchServer(this.$route.params.id)
        this.getServerActions()
    },
    data() {
        return {
            server: {
                id: this.$route.params.id,
            },
            actions: [],
            loading: false,
            serverMapLable: {
                "id": "Ідентифікатор",
                "name": "Назва",
                "status": "Статус",
                "public_ip": "Публічна IP-адреса",
                "private_ip": "Приватна IP-адреса",
                "launched_at": "Запущено о",
                "terminated_at": "Вбито о",
                "description": "Опис",
                "created_at": "Створено о",
                "updated_at": "Оновлено о",
            },
            flavorMapLable: {
                "name": "Назва",
                "description": "Опис",
                "ram": "RAM (Мб)",
                "vcpus": "Віртуальні процесори",
                "disk_size": "Розмір диска (Гб)",
                "swap_size": "Розмір SWAP (Мб)",
                "ephemeral_size": "Ефемерний диск (Гб)",
            },
            imageMapLable: {
                "name": "Назва",
                "min_disk_size": "Мінімальний розмір диску (Гб)",
                "min_ram_size": "Мінімальний розмір RAM (Мб)",
                "status": "Статус",
                "size": "Розмір (б)",
            },
        }
    },
    methods: {
        async fetchServer(id) {
            try {
                this.server = await ServerService.getServer(id)
            } catch (error) {
                useAlertStore().error(error);
            }
        },
        async setServerStatus(actionItem) {
            this.loading = true
            try {
                await ServerService.actServer(this.server.id, actionItem.action)
                await this.fetchServer(this.server.id)
                useAlertStore().success('Дія успішно виконана');
            } catch (error) {
                switch (error) {
                    case 'Invalid status':
                        useAlertStore().error('Неможлива дія при даному статусі машини');
                        break;
                    default:
                        useAlertStore().error(error);
                        break;
                }
            } finally {
                this.loading = false
            }
        },
        getServerActions() {
            this.actions = ServerService.getServerActions()
        },
        goToServers() {
            console.log('lol')
        },
        toTitle(str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
        }
    }
}
</script>


<style scoped>
.field_name {
    font-weight: bold;
}

.field_value {
}
</style>