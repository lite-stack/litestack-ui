<template>
    <v-container>
        <v-table
            class="elevation-1"
            :key="users">
            <template v-slot:top>
                <v-toolbar>
                    <v-toolbar-title class="text-h4 text--primary text-primary">
                        Користувачі
                    </v-toolbar-title>

                    <v-divider
                        class="mx-4"
                        inset
                        vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>
            <thead>
            <tr>
                <th class="text-left">
                    ID
                </th>
                <th class="text-left">
                    Пошта
                </th>
                <th class="text-left">
                    Ім`я
                </th>
                <th class="text-left">
                    Активний
                </th>
                <th class="text-left">
                    Верифікований
                </th>
                <th class="text-center">
                    Адмін
                </th>
                <th class="text-center">
                    Дії
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="user in withoutMe"
                :key="user.id"
            >
                <td>
                    {{ user.id }}
                </td>
                <td>{{ user.email || '-' }}</td>
                <td>{{ user.username || '-' }}</td>
                <td>
                    <v-icon v-if="user.is_active" icon="mdi-check-circle" style="color:var(--green);"></v-icon>
                    <v-icon v-else icon="mdi-close-circle" style="color:var(--red);"></v-icon>
                </td>
                <td>
                    <v-icon v-if="user.is_verified" icon="mdi-check-circle" style="color:var(--green);"></v-icon>
                    <v-icon v-else icon="mdi-close-circle" style="color:var(--red);"></v-icon>
                </td>
                <td>
                    <v-icon v-if="user.is_superuser" icon="mdi-check-circle" style="color:var(--green);"></v-icon>
                    <v-icon v-else icon="mdi-close-circle" style="color:var(--red);"></v-icon>
                </td>
                <td>
                    <v-row>
                        <v-spacer></v-spacer>
                        <UpdateDialog v-bind:user=user @updated="updateUser"/>
                        <v-spacer></v-spacer>
                        <DeleteDialog v-bind:id=user.id @deleted="deleteUser"/>
                        <v-spacer></v-spacer>
                    </v-row>
                </td>
            </tr>
            </tbody>
        </v-table>
    </v-container>
</template>


<script>
import UserService from "@/services/user.js"
import UpdateDialog from "@/views/users/UpdateDialog.vue"
import DeleteDialog from "@/views/users/DeleteDialog.vue"
import {useAuthStore} from '@/stores/auth.store.js';
import {useAlertStore} from '@/stores/alert.store.js';

export default {
    name: 'Users',
    components: {UpdateDialog, DeleteDialog},
    async created() {
        await this.fetchUsers()
    },
    data() {
        return {
            authStore: useAuthStore(),
            users: [],
            loading: true,
        }
    },
    computed: {
        withoutMe: function () {
            return this.users.filter(u => u.id !== this.authStore.user.id)
        },
    },
    methods: {
        async fetchUsers() {
            this.loading = true;
            try {
                this.users = await UserService.getUsers()
            } catch (error) {
                useAlertStore().error(error);
            } finally {
                this.loading = false;
            }
        },

        async deleteUser(id) {
            try {
                await this.fetchUsers()
            } catch (error) {
                useAlertStore().error(error);
            }
        },
        async updateUser(id) {
            try {
                await this.fetchUsers()
            } catch (error) {
                useAlertStore().error(error);
            }
        },
    }
}
</script>