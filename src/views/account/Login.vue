<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAuthStore } from '@/stores/auth.store.js';

const schema = Yup.object().shape({
  username: Yup.string().required("Введіть ім'я користувача"),
  password: Yup.string().required('Введіть пароль')
});

async function onSubmit(values) {
  const authStore = useAuthStore();
  const { username, password } = values;
  await authStore.login(username, password);
}
</script>

<template>
  <div class="auth-box">
    <div class="auth-container">
      <div class="auth-title">
        <img class="auth-logo" src="../../assets/logo-full-white.svg" alt="">

        <p>Вхід в обліковий запис</p>
      </div>
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }" class="auth-form">
        <div class="form-group">
          <label>Ім'я користувача</label>
          <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
          <div class="invalid-feedback">{{errors.username}}</div>
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
          <div class="invalid-feedback">{{errors.password}}</div>
        </div>

        <span>У вас ще немає облікового запису? <router-link to="register" class="auth-link">Зареєструватися</router-link>.</span>
        <button class="auth-btn" :disabled="isSubmitting">
          <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
          Увійти
        </button>
      </Form>
    </div>
  </div>
</template>

<style>
  .auth-box{
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #23242a;
  }
  .auth-box .auth-container{
    padding: 30px 0;
    color: #fff;
    border: 4px solid #1c1c1c;
    background: #222;
    border-radius: 8px;
    width: 450px;
  }
  .auth-box .auth-container .auth-title{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 22px;
  }
  .auth-box .auth-container .auth-title .auth-logo{
    width: 250px;
    max-width: 250px;
  }
  .auth-box .auth-container .auth-form{
    padding: 15px 15px 20px;
    border-radius: 8px;
    z-index: 2;
    display: flex;
    flex-direction: column;
  }
  .auth-box .auth-container .auth-form .form-group{
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
  }
  .auth-box .auth-container .auth-form .form-group .form-control{
    background-color: #fff;
    color: #000;
    border-radius: 5px;
    outline: none;
    font-size: 20px;
    margin: 5px 0;
    padding-left: 5px;
  }
  .auth-box .auth-container .auth-form .auth-btn{
    background-color: rgba(89, 164, 124, 1);
    border-radius: 10px;
    padding: 8px 0;
    width: 300px;
    display: block;
    margin: 20px auto 0;
  }
  .auth-box .auth-container .auth-form .auth-btn:hover{
    background-color: rgba(89, 164, 124, 0.8);
  }
  .auth-box .auth-container .auth-form .auth-link{
    text-decoration: underline;
    color: #fff;
  }
  .auth-box .auth-container .auth-form span{
    text-align: center;
  }
  .auth-box .auth-container .auth-form .auth-link:hover{
    color: rgba(89, 164, 124, 0.8);
  }
</style>
