import { defineStore } from 'pinia';

import { router } from '@/router';
import { useAlertStore } from '@/stores/alert.store.js';
import AuthAPI from '@/api/auth.js'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async register(user) {
            await AuthAPI.register(user)
        },
        async login(user) {
            try {
                const tokens = await AuthAPI.login(user)
                user.token = tokens["access_token"]
                user.password = ''

                // update pinia state
                this.user = user;

                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));

                // redirect to previous url or default to home page
                await router.push(this.returnUrl || '/servs');
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        async logout() {
            try {
                await AuthAPI.logout()
            } catch (error) {
                console.log(error);
            }
            this.user = null;
            localStorage.removeItem('user');
            await router.push('/account/login');
        }
    }
});