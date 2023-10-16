<template>

    <v-container>
        <Alert/>
        <div class="text-h2 text-center">Огляд</div>
        <div v-if="!loaded"
             class="d-flex align-center justify-center"
        >
            <v-progress-circular
                indeterminate
                color="primary"
                :size="100"
            ></v-progress-circular>
        </div>
        <v-row class="ma-6" v-else>
            <v-col cols=3>
                <Pie :data="serversLimit" class="pie-chart" :options="serversLimitOptions"/>
                <v-divider class="ma-2"></v-divider>
                <Pie :data="serversLimit" class="pie-chart" :options="serversLimitOptions"/>
            </v-col>
            <v-divider vertical class="ma-2"></v-divider>
            <v-col>
                <Bar :data="serverTags" class="bar-chart"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import {storeToRefs} from 'pinia';
import {useAuthStore} from '@/stores/auth.store.js';
import Alert from "@/components/Alert.vue";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
} from 'chart.js'
import colors from 'vuetify/lib/util/colors'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

const authStore = useAuthStore();
const {user: authUser} = storeToRefs(authStore);
</script>

<script>
import {Pie, Bar} from 'vue-chartjs'
import ServerService from "@/services/server"

export default {
    name: 'Home',
    components: {
        Pie
    },
    async mounted() {
        this.loaded = false
        let servers = await this.fetchServers();
        console.log(servers)
        let serversLimit = await this.fetchServersLimit();
        this.serversLimit = {
            labels: ['Створено', 'Доступно'],
            datasets:
                [
                    {
                        label: 'Розподілення серверів за додтками',
                        backgroundColor: [colors.teal.lighten1, colors.blueGrey.lighten2],
                        data: [servers.length, serversLimit - servers.length],
                    }
                ]
        };
        let countServersByTag = ServerService.countsServersByTag(servers);
        this.serverTags = {
            labels: Object.keys(countServersByTag),
            datasets: [
                {
                    label: 'Розподілення серверів за додтками',
                    backgroundColor: colors.teal.lighten1,
                    data: Object.values(countServersByTag),
                }
            ]
        }
        this.loaded = true
    },
    data() {
        return {
            loaded: false,
            serversLimit: null,
            serversLimitOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Ліміт серверів'
                    }
                }
            },
            serverTags: null,
        }
    },
    methods: {
        async fetchServers() {
            try {
                return await ServerService.getServers()
            } catch (error) {
                useAlertStore().error(error);
            }
        },
        async fetchServersLimit() {
            try {
                return await ServerService.getServersLimit()
            } catch (error) {
                useAlertStore().error(error);
            }
        },
    }
}
</script>

<style>
.pie-chart {
    max-height: 300px;
}

.bar-chart {
    max-height: 600px;
}
</style>