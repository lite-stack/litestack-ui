import { createApp } from 'vue'
import router from "@/router/index.js";
import { createPinia } from 'pinia'

import App from '@/App.vue'

// Vuetify
import 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as styles from 'vuetify/styles'

const vuetify = createVuetify({
    components,
    directives,
    styles,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
})

// setup fake backend
import { fakeBackend } from '@/helpers/fake-backend.js';
fakeBackend();

const app = createApp(App);
const pinia = createPinia();

app.use(vuetify);
app.use(router);
app.use(pinia);

app.mount("#app");