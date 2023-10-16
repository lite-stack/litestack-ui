import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Graphs from "@/views/Graphs.vue";
import Databases from "@/views/Databases.vue";
import Instruments from "@/views/Instruments.vue";

import { useAuthStore } from '@/stores/auth.store.js';
import {useAlertStore} from "@/stores/alert.store.js";

import Login from "@/views/account/Login.vue";
import accountRoutes from "@/router/account.routes.js";
import usersRoutes from "@/router/users.routes.js";
import serverRoutes from "@/router/server.routes.js";

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
        path: '/instruments',
        name: 'Instruments',
        component: Instruments
    },
    {
        path: '/instructions',
        name: 'Instructions',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/instructions/Instructions.vue')
    },
    { ...accountRoutes },
    { ...usersRoutes },
    { ...serverRoutes },
    { path: '/:pathMatch(.*)*', redirect: '/' },
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
    const adminPages = ['/users'];
    const authRequired = !publicPages.includes(to.path);
    const adminRequired = adminPages.includes(to.path);
    const authStore = useAuthStore();

    if (authRequired && !authStore.auth) {
        authStore.returnUrl = to.fullPath;
        return '/account/login';
    }

    if (authRequired && adminRequired && !authStore.user.is_superuser) {
        return '/';
    }
});


export default router
