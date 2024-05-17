//import './assets/styles/all.scss'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

const useImage = ((url) => {
    const src = `/src${url}`;
    console.log(src);
    return new URL(src, import.meta.url).href;
});

app.config.globalProperties.$image = useImage;

import eng from './locales/eng.json'
import ru from './locales/ru.json'

const i18n = createI18n({
    legacy: true,
    fallbackLocale: 'ru',
    messages: {
        eng: eng,
        ru: ru,
    }
})

app.use(router).use(store).use(i18n)

app.mount('#app')
