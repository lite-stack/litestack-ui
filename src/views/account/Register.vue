<script setup>
import {Form, Field} from 'vee-validate';
import * as Yup from 'yup';

const schema = Yup.object().shape({
    email: Yup.string()
        .required('Введіть прізвище').email(),
    username: Yup.string()
        .required("Введіть ім'я користувача"),
    password: Yup.string()
        .required('Введіть пароль')
        .min(6, 'Пароль повинен містити щонайменше 6 символів')
});
</script>

<script>
import User from '@/models/user.js'

import {useAuthStore} from '@/stores/auth.store.js';
import {useAlertStore} from '@/stores/alert.store.js';

export default {
    name: 'Register',
    components: {},
    data() {
        return {
            user: new User(),
        }
    },
    methods: {
        async register() {
            try {
                await useAuthStore().register(this.user);
                await this.$router.push('/account/login');
                useAlertStore().success('Registration successful');
            } catch (error) {
                useAlertStore().error(error);
            }
        },
    }
}
</script>

<template>
    <div class="auth-box">
        <div class="auth-container">
            <div class="auth-title">
                <img class="auth-logo" src="../../assets/logo-full-white.svg" alt="">

                <p>Реєстрація облікового запису</p>
            </div>
            <Form @submit="register" :validation-schema="schema" v-slot="{ errors, isSubmitting }" class="auth-form">

                <div class="form-group">
                    <label>Пошта</label>
                    <Field name="email" type="text" class="form-control" :class="{ 'is-invalid': errors.email }"
                           v-model="user.email"/>
                    <div class="invalid-feedback">{{ errors.email }}</div>
                </div>
                <div class="form-group">
                    <label>Ім'я користувача</label>
                    <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }"
                           v-model="user.username"/>
                    <div class="invalid-feedback">{{ errors.username }}</div>
                </div>
                <div class="form-group">
                    <label>Пароль</label>
                    <Field name="password" type="password" class="form-control"
                           :class="{ 'is-invalid': errors.password }"
                           v-model="user.password"/>
                    <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
                <span>Вже маєте обліковий запис? <router-link to="login"
                                                              class="btn auth-link">Авторизуватися</router-link>.</span>
                <button class="auth-btn" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Зареєструватися
                </button>


            </Form>
        </div>
    </div>
</template>
