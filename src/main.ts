import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {createI18n} from "vue-i18n";
import pl from "./locales/pl.json";

const i18n = createI18n({
    locale: "pl",
    fallbackLocale: "pl",
    messages: {pl},
});

createApp(App)
    .use(router)
    .use(i18n)
    .mount('#app')
