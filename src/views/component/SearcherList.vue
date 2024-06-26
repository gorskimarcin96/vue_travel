<script lang="ts">
import {defineComponent} from 'vue';
import type {PropType} from 'vue';
import TripPage from "@/views/component/TripPage.vue";
import Weather from "@/views/component/Weather.vue";
import OptionalTrip from "@/views/component/OptionalTrip.vue";
import Flight from "@/views/component/Flight.vue";
import Hotel from "@/views/component/Hotel.vue";
import {OptionalTrip as ModelOptionalTrip} from "@/models/OptionalTrip";
import type {SearchEntityInterface} from "@/models/SearchEntityInterface";
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
    searchEntity: {
      type: Object as PropType<SearchEntityInterface>,
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
    trips: {
      type: Array as PropType<ModelHotel[]>,
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
  }
});
</script>

<template>
  <div class="container">
    <div v-for="service in uniqueSource(trips)" v-if="shower.trips">
      <h2 class="text-success" v-bind:id="getAnchorLink(service)">{{ parseNamespace(service) }}</h2>
      <div class="row">
        <div class="col-6" v-for="trip in trips.filter((trip) => trip.source === service)">
          <hotel :hotel="trip" :persons="(searchEntity?.adults ?? 0) + (searchEntity?.children ?? 0)"/>
        </div>
      </div>
    </div>

    <div v-for="service in uniqueSource(hotels)" v-if="shower.hotels">
      <h2 class="text-success" v-bind:id="getAnchorLink(service)">{{ parseNamespace(service) }}</h2>
      <div class="row">
        <div class="col-6" v-for="hotel in hotels.filter((hotel) => hotel.source === service)">
          <hotel :hotel="hotel" :persons="(searchEntity?.adults ?? 0) + (searchEntity?.children ?? 0)"/>
        </div>
      </div>
    </div>

    <div v-for="service in uniqueSource(flights)" v-if="shower.flights">
      <h2 class="text-success" v-bind:id="getAnchorLink(service)">{{ parseNamespace(service) }}</h2>
      <flight :flights="flights.filter((flight) => flight.source === service)"
              :persons="(searchEntity?.adults ?? 0) + (searchEntity?.children ?? 0)"/>
    </div>

    <div v-for="service in uniqueSource(optionalTrips)" v-if="shower.optionalTrips">
      <h2 class="text-success" v-bind:id="getAnchorLink(service)">{{ parseNamespace(service) }}</h2>
      <div v-for="optionalTrip in optionalTrips.filter((optionalTrip) => optionalTrip.source === service)">
        <optional-trip :optional-trip="optionalTrip" :persons="(searchEntity?.adults ?? 0) + (searchEntity?.children ?? 0)"/>
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
