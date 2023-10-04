<template>
    <v-row
        align="start"
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
                            <div v-if="name !== 'full_info' && name !== 'metadata' && value !== null">
                                <span class="font-weight-bold">{{ toTitle(name) }}</span>: <span
                                class="field_value">{{ value }}</span>
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
                    >
                        Дії
                        <v-menu activator="parent">
                            <v-list>
                                <v-list-item
                                    v-for="(item, index) in actions"
                                    :key="index"
                                    :value="index"
                                >
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-btn>
                </v-card-actions>
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
                            <vue-json-pretty :data=JSON.parse(server.metadata) showLineNumber
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
        }
    },
    methods: {
        async fetchServer(id) {
            this.server = await ServerService.getServer(id)
        },
        getServerActions() {
            this.actions = ServerService.getServerActions()
            console.log(this.actions)
        },
        goToServers() {
            console.log('lol')
            this.$router.push('/servs')
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