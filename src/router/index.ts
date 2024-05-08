import {createRouter, createWebHistory} from 'vue-router'
import SearcherView from "@/views/searcher/SearcherView.vue";
import SearcherPageView from "@/views/searcher/SearcherPageView.vue";
import LastMinuteView from "@/views/last_minute/LastMinuteView.vue";
import LastMinutePageView from "@/views/last_minute/LastMinutePageView.vue";
import HistoryView from "@/views/HistoryView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        redirect: to => ({path: '/last-minute'})
    }, {
        path: '/last-minute',
        name: 'Last minute',
        component: LastMinuteView
    }, {
        path: '/last-minute/:id',
        name: 'Last minute id',
        component: LastMinutePageView
    }, {
        path: '/searcher',
        name: 'Searcher',
        component: SearcherView
    }, {
        path: '/searcher/:id',
        name: 'Searcher id',
        component: SearcherPageView
    }, {
        path: '/history',
        name: 'History',
        component: HistoryView
    }],
    linkActiveClass: "btn-success text-light",
});

export default router
