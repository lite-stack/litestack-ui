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
                    <v-col>

                        <v-row>
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
                            <div class="ml-2 d-flex justify-center align-baseline">
                                <v-btn class="mb-2"
                                       variant="tonal"
                                       color="primary"
                                       @click="openConsole"
                                >
                                <span class="mr-2">
                                    Консоль
                                </span>
                                    <v-tooltip
                                        text="Стандартні логін і пароль користувача будуть вказані при вході в консоль">
                                        <template v-slot:activator="{ props }">
                                            <v-icon v-bind="props" icon="mdi-information" color="primary"></v-icon>
                                        </template>
                                    </v-tooltip>
                                </v-btn>

                                <WindowPortal v-bind:open="consoleIsOpened" v-bind:url="consoleURL"
                                              @closed="closeConsole"/>
                            </div>
                        </v-row>
                        <v-row>
                            <ServerUpdateDialog v-bind:server=server @updated="fetchServer"/>
                            <ServerDeleteDialog v-bind:id=server.id @deleted="goToServers"/>
                        </v-row>

                    </v-col>
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
                v-if="server.image"
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
                                             showIcon height=635 virtual/>
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
import WindowPortal from '@/components/WindowPortal.vue';

export default {
    name: 'Server',
    components: {ServerDeleteDialog, ServerCreateDialog, ServerUpdateDialog, WindowPortal, VueJsonPretty},
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
            consoleIsOpened: false,
            consoleURL: ''
        }
    },
    methods: {
        async fetchServer(id) {
            try {
                this.server = await ServerService.getServer(id)
            } catch (error) {
                switch (error) {
                    case 'Server not found':
                        this.$router.push('/servs');
                        break;
                    default:
                        useAlertStore().error(error);
                }
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
                    case 'Server not found':
                        this.$router.push('/servs');
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
            this.$router.push('/servs');
        },
        async openConsole() {
            this.closeConsole();
            this.consoleURL = await ServerService.getServerConsoleURL(this.server.id);
            this.consoleIsOpened = true;
        },
        closeConsole() {
            this.consoleIsOpened = false;
            this.consoleURL = '';
        },
        toTitle(str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
        }
    }
}
</script>
