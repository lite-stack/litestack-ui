import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Servers from "@/views/Servers.vue";
import Graphs from "@/views/Graphs.vue";
import Databases from "@/views/Databases.vue";
import Coding from "@/views/Coding.vue";

import { useAuthStore } from '@/stores/auth.store.js';
import {useAlertStore} from "@/stores/alert.store.js";

import Login from "@/views/account/Login.vue";
import accountRoutes from "@/router/account.routes.js";
import usersRoutes from "@/router/users.routes.js";

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
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
    },
    { ...accountRoutes },
    { ...usersRoutes },
    { path: '/:pathMatch(.*)*', redirect: '/' }
]
export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes
})

router.beforeEach(async (to) => {
    // clear alert on route change
    const alertStore = useAlertStore();
    alertStore.clear();

    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/account/login', '/account/register'];
    const authRequired = !publicPages.includes(to.path);
    const authStore = useAuthStore();

    if (authRequired && !authStore.user) {
        authStore.returnUrl = to.fullPath;
        return '/account/login';
    }
});


export default router
