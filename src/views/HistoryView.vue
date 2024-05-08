<script lang="ts">
import {defineComponent} from 'vue';
import travel from "@/api/travel";
import type {Search} from "@/models/Search";
import type {LastMinute} from "@/models/LastMinute";
import SearchEntityTable from "@/views/component/SearchEntityTable.vue";

export default defineComponent({
  components: {SearchEntityTable},
  data: function () {
    return {
      searchesIsLoaded: false,
      searches: [] as Search[],
      lastMinutesIsLoaded: false,
      lastMinutes: [] as LastMinute[]
    }
  },
  created() {
    travel.getSearches().then((response) => this.searches = response).finally(() => this.searchesIsLoaded = true);
    travel.getLastMinutes().then((response) => this.lastMinutes = response).finally(() => this.lastMinutesIsLoaded = true);
  },
});
</script>

<template>
  <div class="container border border-success rounded mb-3 p-1 text-white bg-dark">
    <h2 class="p-2">{{ $t('main.last_minute') }}</h2>
    <search-entity-table route-name="last-minute" :is-loaded="lastMinutesIsLoaded" :rows="lastMinutes"/>
  </div>

  <div class="container border border-success rounded mb-3 p-1 text-white bg-dark">
    <h2 class="p-2">{{ $t('main.searcher') }}</h2>
    <search-entity-table route-name="searcher" :is-loaded="searchesIsLoaded" :rows="searches"/>
  </div>
</template>
