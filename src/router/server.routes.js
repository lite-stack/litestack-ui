import Servers from "@/views/server/Servers.vue";
import Server from "@/views/server/Server.vue"
import Layout from '@/views/server/Layout.vue';

export default {
    path: '/servs',
    component: Layout,
    children: [
           {path: '', name: 'Servers', component: Servers},
           {path: '/:name', name: 'Server instanse', component: Server},
        ]
    };