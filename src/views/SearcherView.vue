<script lang="ts">
import {defineComponent} from 'vue';
import AbstractSearcherView from "@/views/AbstractSearcherView.vue";
import SearcherList from "@/views/component/SearcherList.vue";
import Form from "@/views/component/Form.vue";
import Navigation from "@/views/component/Navigation.vue";
import {SearchInput} from "@/models/SearchInput";
import travel from "@/api/travel";

export default defineComponent({
  components: {Form, Navigation, SearcherList, AbstractSearcherView},
  extends: AbstractSearcherView,
  methods: {
    sendForm(searchInput: SearchInput) {
      travel.search(searchInput).then(searchModel => this.search(searchModel))
    },
  }
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
