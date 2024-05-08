<script lang="ts">
import {defineComponent} from 'vue';
import LastMinuteFrom from "@/views/component/LastMinuteForm.vue";
import SearcherList from "@/views/component/SearcherList.vue";
import Navigation from "@/views/component/Navigation.vue";
import AbstractLastMinuteView from "@/views/last_minute/AbstractLastMinuteView.vue";

export default defineComponent({
  components: {Navigation, SearcherList, LastMinuteFrom},
  extends: AbstractLastMinuteView,
});
</script>

<template>
  <LastMinuteFrom @request="sendForm" :timer="timer"/>
  <Navigation
      v-if="lastMinute"
      :search-entity="lastMinute"
      :shower="shower"
      :timer="timer"
      :pageTrips="[]"
      :optionalTrips="[]"
      :hotels="[]"
      :flights="[]"
      :weathers="[]"
      :trips="trips"/>
  <SearcherList
      v-if="lastMinute"
      :search-entity="lastMinute"
      :shower="shower"
      :page-trips="[]"
      :trips="trips"
      :flights="[]"
      :optional-trips="[]"
      :hotels="[]"
      :weathers="[]"/>
</template>
