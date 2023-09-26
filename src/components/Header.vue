<template>
    <v-toolbar dense>
      <router-link to="/">
        <v-img
            src="src/assets/logo.full.svg"
            width="150"
            max-width="150"
        ></v-img>
      </router-link>

        <v-spacer></v-spacer>
          <v-btn
              v-for="link in links"
              :key="link"
              variant="text"
          >
            <router-link :to="{ path: link[1]}">
            {{ link[0] }}
            </router-link>
          </v-btn>



        <v-spacer></v-spacer>

        <div class="d-flex justify-space-around" style="width:250px; max-width:350px">
          <router-link to="/login">
            <v-btn
                class="mx-4"
                icon="mdi-login"
                variant="plain"
            ></v-btn>
          </router-link>
        </div>

    </v-toolbar>
</template>

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