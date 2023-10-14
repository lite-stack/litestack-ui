<template>
<!--    <v-toolbar-->
<!--        color="#222222"-->
<!--        dark-->
<!--    >-->
<!--        <router-link to="/">-->
<!--            <v-img-->
<!--                src="../src/assets/logo-full-white.svg"-->
<!--                width="150"-->
<!--                max-width="150"-->
<!--                class="mx-8"-->
<!--            ></v-img>-->
<!--        </router-link>-->


<!--        <v-spacer></v-spacer>-->
<!--        <v-btn-->
<!--            v-for="link in links"-->
<!--            :key="link"-->
<!--            variant="text"-->
<!--            :to="{ path: link[1]}"-->
<!--            class="mx-2"-->
<!--        >-->
<!--            {{ link[0] }}-->
<!--        </v-btn>-->


<!--        <v-spacer></v-spacer>-->

<!--        <div class="d-flex justify-space-around align-center" style="width:250px; max-width:350px">-->
<!--            <v-btn-->
<!--                v-if="!authStore.isLogged" to="/login"-->
<!--                class="mx-4"-->
<!--                icon="mdi-login"-->
<!--                variant="plain"-->
<!--            ></v-btn>-->
<!--            <v-btn v-if="authStore.isLogged" to="/users/me" class="nav-item nav-link">-->
<!--                Аккаунт-->
<!--                <span v-if="authStore.user.is_superuser">&nbsp;та користувачі-->
<!--                </span>-->
<!--            </v-btn>-->
<!--            <v-btn v-if="authStore.isLogged" @click="authStore.logout()" class="btn btn-link nav-item nav-link"-->
<!--                   icon="mdi-logout"></v-btn>-->
<!--        </div>-->
<!--        <v-spacer></v-spacer>-->

<!--    </v-toolbar>-->

   <nav class="navbar">
      <router-link to="/"><img class="navbar-logo" src="@/assets/logo-full-white.svg" alt=""></router-link>
      <div class="navbar-nav">
         <router-link class="navbar-links" v-for="link in links" :key="link" :to="link[1]">{{link[0]}}</router-link>
      </div>
      <div class="navbar-btn">
         <router-link v-if="authStore.isLogged && authStore.user.is_superuser" to="/users/me" class="material-symbols-outlined">supervisor_account</router-link>
         <router-link v-else-if="authStore.isLogged" to="/users/me" class="material-symbols-outlined">person</router-link>
         <button v-if="authStore.isLogged" @click="authStore.logout()" class="material-symbols-outlined">logout</button>
      </div>
   </nav>
</template>

<style scoped>
   .navbar{
      width: 100%;
      height: 80px;
      background-color: #222;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 80px;
   }
   .navbar-logo{
      height: 65px;
      width: 180px;
      cursor: pointer;
   }
   .navbar-nav{
      width: 850px;
      display: flex;
      justify-content: space-between;
   }
   .navbar-links{
      color: #fff;
      text-decoration: none;
      font-size: 16px;
      letter-spacing: 3px;
      padding: 10px 25px;
   }
   .navbar-links:hover,
   .material-symbols-outlined:hover{
      background-color: rgba(46, 46, 46);
      border-radius: 8px;
   }
   .navbar-btn{
      width: 126px;
      display: flex;
      justify-content: space-between;
   }
   .material-symbols-outlined {
      color: #fff;
      font-size: 32px;
      text-decoration: none;
      padding: 6px 12px;
      font-variation-settings:
          'FILL' 1,
          'wght' 400,
          'GRAD' 0
    }
   .router-link-active, .router-link-exact-active{
      background-color: rgba(60, 60, 60);
      border-radius: 8px;
   }
   .router-link-active:hover, .router-link-exact-active:hover{
      background-color: rgba(75, 75, 75);
      border-radius: 8px;
   }
</style>

<script setup>
import {useAuthStore} from '@/stores/auth.store.js';

const authStore = useAuthStore();
</script>

<script>
export default {
    name: 'Header',
    data: () => ({
        links: [
            ['CЕРВЕРИ', '/servs'],
            ['ГРАФІКИ', '/graphs'],
            ['БАЗИ ДАНИХ', '/databases'],
            ['РОЗРОБКА', '/coding'],
            ['ІНСТРУКЦІЇ', '/instructions'],
        ],
    }),
}
</script>
