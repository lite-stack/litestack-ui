<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useUsersStore } from '@/stores/users.store.js';
import { useAlertStore } from '@/stores/alert.store.js';
import { router } from '@/router';

const schema = Yup.object().shape({
  firstName: Yup.string()
      .required("Введіть ім'я"),
  lastName: Yup.string()
      .required('Введіть прізвище'),
  username: Yup.string()
      .required("Введіть ім'я користувача"),
  password: Yup.string()
      .required('Введіть пароль')
      .min(6, 'Пароль повинен містити щонайменше 6 символів')
});

async function onSubmit(values) {
  const usersStore = useUsersStore();
  const alertStore = useAlertStore();
  try {
    await usersStore.register(values);
    await router.push('/account/login');
    alertStore.success('Registration successful');
  } catch (error) {
    alertStore.error(error);
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
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }" class="auth-form">
        <div class="form-group">
          <label>Ім'я</label>
          <Field name="firstName" type="text" class="form-control" :class="{ 'is-invalid': errors.firstName }" />
          <div class="invalid-feedback">{{ errors.firstName }}</div>
        </div>
        <div class="form-group">
          <label>Прізвище</label>
          <Field name="lastName" type="text" class="form-control" :class="{ 'is-invalid': errors.lastName }" />
          <div class="invalid-feedback">{{ errors.lastName }}</div>
        </div>
        <div class="form-group">
          <label>Ім'я користувача</label>
          <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
          <div class="invalid-feedback">{{ errors.username }}</div>
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
          <div class="invalid-feedback">{{ errors.password }}</div>
        </div>
        <span>Вже маєте обліковий запис? <router-link to="login" class="btn auth-link">Авторизуватися</router-link>.</span>
        <button class="auth-btn" :disabled="isSubmitting">
          <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
          Зареєструватися
        </button>


      </Form>
    </div>
  </div>
</template>

