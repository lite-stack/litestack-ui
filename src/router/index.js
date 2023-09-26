import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Servers from "@/views/Servers.vue";
import Graphs from "@/views/Graphs.vue";
import Databases from "@/views/Databases.vue";
import Coding from "@/views/Coding.vue";

import { useAuthStore } from '@/stores/auth.store.js';
import LoginView from "@/views/LoginView.vue";

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/servs',
        name: 'Servers',
        component: Servers
    },
    {
        path: '/graphs',
        name: 'Graphs',
        component: Graphs
    },
    {
        path: '/databases',
        name: 'Databases',
        component: Databases
    },
    {
        path: '/coding',
        name: 'Coding',
        component: Coding
    },
    {
        path: '/instructions',
        name: 'Instructions',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Instructions.vue')
    }
]
export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

// router.beforeEach(async (to) => {
//     // redirect to login page if not logged in and trying to access a restricted page
//     const publicPages = ['/login'];
//     const authRequired = !publicPages.includes(to.path);
//     const auth = useAuthStore();
//
//     if (authRequired && !auth.user) {
//         auth.returnUrl = to.fullPath;
//         return '/login';
//     }
// });


export default router
