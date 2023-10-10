<template>
    <v-dialog
        v-model="dialog"
        max-width="500px"
    >
        <template v-slot:activator="{ props }">
            <v-btn
                color="primary"
                class="mb-2"
                v-bind="props"
                variant="tonal"
            >
                Змінити
            </v-btn>
        </template>
        <v-card>
            <form @submit.prevent="submit">
                <v-card-title>
                    <span class="text-h5 text-primary">Зміна користувача</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-text-field
                            label="Пошта"
                            v-model="email.value.value"
                            :error-messages="email.errorMessage.value"
                        ></v-text-field>

                        <v-text-field
                            label="Ім`я"
                            v-model="username.value.value"
                            :error-messages="username.errorMessage.value"
                        ></v-text-field>

                        <v-text-field
                            label="Пароль"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:append="showPassword = !showPassword"
                            v-model="password.value.value"
                            :error-messages="password.errorMessage.value"
                            :type="showPassword ? 'text' : 'password'"
                            hint="Введіть пароль, якщо хочете його змінити. Інакше залиште полу пустим."
                            persistent-hint
                        ></v-text-field>
                        <v-row class="mt-3">
                            <v-checkbox
                                v-if="authStore.isLogged && authStore.user.is_superuser"
                                v-model="isSuperUser.value.value"
                                :error-messages="isSuperUser.errorMessage.value"
                                label="Адмін"
                                type="checkbox"
                            ></v-checkbox>

                            <v-checkbox
                                v-if="authStore.isLogged && authStore.user.is_superuser"
                                v-model="isActive.value.value"
                                :error-messages="isActive.errorMessage.value"
                                label="Активований акаунт"
                                type="checkbox"
                            ></v-checkbox>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="primary"
                        variant="text"
                        type="submit"
                        :loading="loading"
                    >
                        Змінити
                    </v-btn>
                    <v-btn
                        color="red"
                        variant="text"
                        @click="close"
                    >
                        Назад

                    </v-btn>
                </v-card-actions>
            </form>
        </v-card>

    </v-dialog>
</template>

<script setup>
import {useAuthStore} from '@/stores/auth.store.js';
import {useAlertStore} from '@/stores/alert.store.js';
import {useField, useForm} from 'vee-validate'
import {ref} from 'vue'
import * as Yup from 'yup';
import UserService from '@/services/user.js'

const props = defineProps({
    user: Object,
});
const emit = defineEmits(['updated'])

const authStore = useAuthStore();

let dialog = ref(false);
let loading = ref(false);
let showPassword = ref(false);
const close = () => {
    dialog.value = false;
};

const update = async () => {
    loading.value = true
    try {
        if (authStore.user.is_superuser) {
            await UserService.updateUser(props.user.id, username.value.value, email.value.value, password.value.value, isActive.value.value, isSuperUser.value.value)
        } else {
            await UserService.updateMe(username.value.value, email.value.value, password.value.value)
        }
        emit('updated', props.user.id);
    } catch (error) {
        useAlertStore().error(error);
    } finally {
        close();
        loading.value = false
    }
};


const schema = Yup.object({
    email: Yup.string().email("Введіть пошту"),
    username: Yup.string().required("Введіть ім`я").min(3, 'Мінімальна довжина 3 символи'),
    password: Yup.string().test(
        'empty-or-8-characters-check',
        'Мінімальна довжина 8 символи',
        password => !password || password.length >= 8,
    ),
});

    const {handleSubmit, _} = useForm({
        initialValues: {
        email: props.user.email,
        username: props.user.username,
        isActive: props.user.is_active,
        isSuperUser: props.user.is_superuser,
        password: '',
    },
    validationSchema: schema,
})

const email = useField('email')
const username = useField('username')
const password = useField('password')
const isActive = useField('isActive')
const isSuperUser = useField('isSuperUser')
const submit = handleSubmit(async () => {
    await update();
})
</script>
