<template>
    <v-row
        align="center"
        class="pa-2 ma-2"
    >
        <v-col
            cols="3"
        >
            <v-card
                variant="tonal"
                color="bg-secondary"
                class="pa-3"
            >
                <v-card-item>
                    <div>
                        <div class="text-caption" v-for="(value, name) in user">
                            <span class="font-weight-bold card-text">{{ mapLable[name] || name }}</span>:
                            <span class="card-text">
                            <span class="field_value " v-if="typeof value !=='boolean'">{{ value }}</span>
                            <span v-else>
                                <v-icon v-if="value" icon="mdi-check-circle"
                                        style="color:var(--green);"></v-icon>
                                <v-icon v-else icon="mdi-close-circle" style="color:var(--red);"></v-icon>
                            </span>
                            </span>
                        </div>
                    </div>
                </v-card-item>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <UpdateDialog v-bind:user=user @updated="fetchMe"/>

                </v-card-actions>
            </v-card>
        </v-col>
        <v-col v-if="authStore.user.is_superuser"
        >
            <UsersList v-if="authStore.user.is_superuser"/>
        </v-col>
    </v-row>
</template>

<script>
import UpdateDialog from "@/views/users/UpdateDialog.vue"
import UsersList from "@/views/users/List.vue"
import {useAuthStore} from '@/stores/auth.store.js';
import {useAlertStore} from '@/stores/alert.store.js';


export default {
    name: 'User',
    components: {UpdateDialog, UsersList},
    async created() {
        await this.fetchMe();
    },
    data() {
        const authStore = useAuthStore();
        return {
            user: authStore.user,
            authStore: authStore,
            mapLable: {
                "id": "Ідентифікатор",
                "email": "Пошта",
                "username": "Ім`я",
                "is_active": "Активний",
                "is_superuser": "Адмін",
                "is_verified": "Верифікований",
            },
        }
    },
    methods: {
        async fetchMe() {
            try {
                await this.authStore.getMe()
                this.user = this.authStore.user
            } catch (error) {
                useAlertStore().error(error);
            }
        },
    }
}
</script>
