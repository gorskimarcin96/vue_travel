import {createRouter, createWebHistory} from 'vue-router'
import SearcherView from "@/views/SearcherView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        redirect: to => {
            return {path: '/searcher'}
        }
    }, {
        path: '/searcher/',
        name: 'Searcher',
        component: SearcherView
    }]
})

export default router
