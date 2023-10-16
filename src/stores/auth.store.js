import { defineStore } from 'pinia';

import { router } from '@/router';
import { useAlertStore } from '@/stores/alert.store.js';
import AuthAPI from '@/api/auth.js'
import UserAPI from '@/api/user.js'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        auth: JSON.parse(localStorage.getItem('auth')),
        returnUrl: null,
    }),
    getters: {
        isLogged: (state) => state.auth && state.user,
    },
    actions: {
        async register(user) {
            await AuthAPI.register(user)
        },
        async login(user) {
            const alertStore = useAlertStore();
            try {
                let  tokens = await AuthAPI.login(user);
                this.auth = tokens;
                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('auth', JSON.stringify(tokens));
            } catch (error) {
                switch (error) {
                    case 'LOGIN_BAD_CREDENTIALS':
                        alertStore.error('Неправильний логін чи пароль');
                        break;
                        default:
                            alertStore.error(error);
                }
                return;
            }
            
           await this.getMe();

            // redirect to previous url or default to home page
            await router.push(this.returnUrl || '/');
        },
        async getMe() {
            const alertStore = useAlertStore();
            try {
                // get additional user info
                let userInfo = await UserAPI.getMe();
                this.user = userInfo;
                localStorage.setItem('user', JSON.stringify(userInfo));
            } catch (error) {
                alertStore.error(error);
            }
        },
        async logout() {
            this.user = null;
            this.auth = null;
            localStorage.removeItem('user');
            localStorage.removeItem('auth');
            await router.push('/account/login');
        },
    }
});