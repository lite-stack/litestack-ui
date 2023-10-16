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
import colors from 'vuetify/lib/util/colors'
import {
    VDataTable,
    VDataTableVirtual,
} from "vuetify/labs/VDataTable";
import 'vue-json-pretty/lib/styles.css';

const theme = {
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: colors.teal.lighten1,
                    secondary: colors.blueGrey.lighten2,
                    red: colors.red.lighten1,
                    dark: colors.grey.darken4
                }
            },
        },
};


const vuetify = createVuetify({
    components: {
        ...components,
        VDataTable,
        VDataTableVirtual,
    },
    directives,
    styles,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    theme: theme,
})

// setup fake backend
import { backendWrapper } from '@/helpers/backend-wrapper.js';
import {createApp} from "vue";
backendWrapper();

const app = createApp(App);
const pinia = createPinia();

app.use(vuetify);
app.use(router);
app.use(pinia);

app.mount("#app");


