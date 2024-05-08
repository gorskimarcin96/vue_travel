<script lang="ts">
import {defineComponent} from 'vue';
import travel from "@/api/travel";
import AbstractSearcherView from "@/views/searcher/AbstractSearcherView.vue";
import {Search} from "@/models/Search";
import SearcherList from "@/views/component/SearcherList.vue";
import Navigation from "@/views/component/Navigation.vue";
import SearchForm from "@/views/component/SearchForm.vue";

export default defineComponent({
  components: {SearchForm, Navigation, SearcherList},
  extends: AbstractSearcherView,
  created() {
    if (this.$route.params.id !== undefined && typeof this.$route.params.id === 'string') {
      travel.getSearch(parseInt(this.$route.params.id)).then((search: Search) => this.search(search));
    }
  },
});
</script>

<template>
  <SearchForm @shower="changeShowStatus" :hideForm="true"/>
  <Navigation
      v-if="searchData"
      :search-entity="searchData"
      :shower="shower"
      :timer="timer"
      :pageTrips="pageTrips"
      :optionalTrips="optionalTrips"
      :hotels="hotels"
      :flights="flights"
      :weathers="weathers"
      :trips="trips"/>
  <SearcherList
      v-if="searchData"
      :search-entity="searchData"
      :shower="shower"
      :page-trips="pageTrips"
      :trips="trips"
      :flights="flights"
      :optional-trips="optionalTrips"
      :hotels="hotels"
      :weathers="weathers"/>
</template>
