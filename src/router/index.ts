import {createRouter, createWebHistory} from 'vue-router'
import SearcherView from "@/views/SearcherView.vue";
import SearcherPageView from "@/views/SearcherPageView.vue";
import SearcherHistoryView from "@/views/SearcherHistoryView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        redirect: to => {
            return {path: '/searcher'}
        }
    }, {
        path: '/searcher',
        name: 'Searcher',
        component: SearcherView
    }, {
        path: '/searcher/:id',
        name: 'Searcher id',
        component: SearcherPageView
    }, {
        path: '/searcher/history',
        name: 'Searcher history',
        component: SearcherHistoryView
    }],
    linkActiveClass: "btn-success text-light",
});

export default router
