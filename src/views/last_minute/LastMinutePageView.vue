<script lang="ts">
import {defineComponent} from 'vue';
import SearcherList from "@/views/component/SearcherList.vue";
import Navigation from "@/views/component/Navigation.vue";
import AbstractLastMinuteView from "@/views/last_minute/AbstractLastMinuteView.vue";
import travel from "@/api/travel";
import type {LastMinute} from "@/models/LastMinute";

export default defineComponent({
  components: {Navigation, SearcherList},
  extends: AbstractLastMinuteView,
  created() {
    if (this.$route.params.id !== undefined && typeof this.$route.params.id === 'string') {
      travel.getLastMinute(parseInt(this.$route.params.id)).then((lastMinute: LastMinute) => this.search(lastMinute));
    }
  },
});
</script>

<template>
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
