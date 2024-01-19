<script lang="ts">
import {defineComponent} from 'vue';
import type {PropType} from 'vue';
import TripPage from "@/views/component/TripPage.vue";
import Weather from "@/views/component/Weather.vue";
import OptionalTrip from "@/views/component/OptionalTrip.vue";
import Flight from "@/views/component/Flight.vue";
import Hotel from "@/views/component/Hotel.vue";
import {OptionalTrip as ModelOptionalTrip} from "@/models/OptionalTrip";
import {Search as ModelSearch} from "@/models/Search";
import {PageTrip as ModelPageTrip} from "@/models/PageTrip";
import {Hotel as ModelHotel} from "@/models/Hotel";
import {Flight as ModelFlight} from "@/models/Flight";
import {Weather as ModelWeather} from "@/models/Weather";
import {Shower} from "@/models/Shower";
import {getAnchorLink, parseNamespace} from "@/helper/parser/namespace";
import {uniqueSource} from "@/helper/source";

export default defineComponent({
  components: {Hotel, Flight, OptionalTrip, Weather, TripPage},
  props: {
    searchData: {
      type: Object as PropType<ModelSearch>,
      required: false
    },
    shower: {
      type: Object as PropType<Shower>,
      required: true
    },
    weathers: {
      type: Array as PropType<ModelWeather[]>,
      required: true
    },
    hotels: {
      type: Array as PropType<ModelHotel[]>,
      required: true
    },
    optionalTrips: {
      type: Array as PropType<ModelOptionalTrip[]>,
      required: true
    },
    flights: {
      type: Array as PropType<ModelFlight[]>,
      required: true
    },
    pageTrips: {
      type: Array as PropType<ModelPageTrip[]>,
      required: true
    },
  },
  methods: {
    getAnchorLink,
    uniqueSource,
    parseNamespace,
    getNightNumber: function (): number {
      return this.searchData ? this.searchData.adults + this.searchData.children : 0;
    }
  }
});
</script>

<template>
  <div class="container">
    <div v-for="service in uniqueSource(hotels)" v-if="shower.hotels">
      <h2 class="text-success" v-bind:id="getAnchorLink(service)">{{ parseNamespace(service) }}</h2>
      <div class="row">
        <div class="col-6" v-for="hotel in hotels.filter((hotel) => hotel.source === service)">
          <hotel :hotel="hotel" :nightNumber="getNightNumber()"/>
        </div>
      </div>
    </div>

    <div v-for="service in uniqueSource(flights)" v-if="shower.flights">
      <h2 class="text-success" v-bind:id="getAnchorLink(service)">{{ parseNamespace(service) }}</h2>
      <flight :flights="flights.filter((flight) => flight.source === service)"/>
    </div>

    <div v-for="service in uniqueSource(optionalTrips)" v-if="shower.optionalTrips">
      <h2 class="text-success" v-bind:id="getAnchorLink(service)">{{ parseNamespace(service) }}</h2>
      <div v-for="optionalTrip in optionalTrips.filter((optionalTrip) => optionalTrip.source === service)">
        <optional-trip :optional-trip="optionalTrip"/>
      </div>
    </div>

    <div v-for="service in uniqueSource(weathers)" v-if="shower.weathers">
      <h2 class="text-success" v-bind:id="getAnchorLink(service)">{{ parseNamespace(service) }}</h2>
      <weather :weathers="weathers.filter((weather) => weather.source === service)"/>
    </div>

    <div v-for="service in uniqueSource(pageTrips)" v-if="shower.travelPages">
      <h2 class="text-success" v-bind:id="getAnchorLink(service)">{{ parseNamespace(service) }}</h2>
      <trip-page :page-trip="tripPage" v-for="tripPage in pageTrips.filter((pageTrip) => pageTrip.source === service)"/>
    </div>
  </div>
</template>
