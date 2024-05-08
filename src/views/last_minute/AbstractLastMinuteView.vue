<script lang="ts">
import {defineComponent} from 'vue';
import {LastMinute as ModelLastMinute} from "@/models/LastMinute";
import {Hotel as ModelHotel} from "@/models/Hotel";
import {parseNamespace} from "@/helper/parser/namespace";
import travel from "@/api/travel";
import LastMinuteFrom from "@/views/component/LastMinuteForm.vue";
import type {LastMinuteInput} from "@/models/LastMinuteInput";
import SearcherList from "@/views/component/SearcherList.vue";
import {Shower} from "@/models/Shower";
import Navigation from "@/views/component/Navigation.vue";
import {TripInput} from "@/models/TripInput";

export default defineComponent({
  components: {Navigation, SearcherList, LastMinuteFrom},
  abstract: true,
  data: function () {
    return {
      lastMinute: null as null | ModelLastMinute,
      trips: [] as ModelHotel[],
      timer: new Date(),
      shower: new Shower(false, false, true, false, false, false),
    }
  },
  methods: {
    parseNamespace,
    search: async function (modelLastMinute: ModelLastMinute) {
      this.timer = new Date();
      this.lastMinute = modelLastMinute;

      for (const service of modelLastMinute.services) {
        (await travel.getTrips(new TripInput(null, modelLastMinute.id, service)))
            .map((trip: ModelHotel) => this.trips.filter(item => item.id === trip.id).length ? {} : this.trips.push(trip));
      }

      if (!modelLastMinute.finished) {
        setTimeout(async () => this.search(await travel.getLastMinute(modelLastMinute.id)), 1000);
      }
    },
    sendForm(input: LastMinuteInput) {
      this.trips = [];
      travel.lastMinute(input).then(model => this.search(model))
    }
  }
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
