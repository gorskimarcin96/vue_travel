<script lang="ts">
import {defineComponent} from 'vue';
import travel from "@/api/travel";
import AbstractSearcherView from "@/views/AbstractSearcherView.vue";
import {Search} from "@/models/Search";
import SearcherList from "@/views/component/SearcherList.vue";

export default defineComponent({
  components: {SearcherList, AbstractSearcherView},
  extends: AbstractSearcherView,
  created() {
    if (this.$route.params.id !== undefined && typeof this.$route.params.id === 'string') {
      travel.get(parseInt(this.$route.params.id)).then((search: Search) => this.search(search));
    }
  },
});
</script>

<template>
  <Form @request="sendForm" @shower="changeShowStatus" :hideForm="true"/>
  <Navigation
      v-if="searchData"
      :search-data="searchData"
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
      :search-data="searchData"
      :shower="shower"
      :page-trips="pageTrips"
      :trips="trips"
      :flights="flights"
      :optional-trips="optionalTrips"
      :hotels="hotels"
      :weathers="weathers"/>
</template>
