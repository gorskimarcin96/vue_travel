<script lang="ts">
import {defineComponent} from 'vue';
import AbstractSearcherView from "@/views/AbstractSearcherView.vue";
import SearcherList from "@/views/component/SearcherList.vue";

export default defineComponent({
  components: {SearcherList, AbstractSearcherView},
  extends: AbstractSearcherView,
});
</script>

<template>
  <Form @request="sendForm" @shower="changeShowStatus" :hideForm="false"/>
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
