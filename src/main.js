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

const customDarkTheme = {
    dark: true,
    colors: {
        background: "#23242a",
        // surface: "#15202b",
        // primary: "#3f51b5",
        // secondary: "#03dac6",
        // error: "#f44336",
        // info: "#2196F3",
        // success: "#4caf50",
        // warning: "#fb8c00",
    },
};

const vuetify = createVuetify({
    components,
    directives,
    styles,
    theme: {
        defaultTheme: "customDarkTheme",
        themes: {
            customDarkTheme,
        },
    },
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
