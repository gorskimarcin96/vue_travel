<script lang="ts">
import {defineComponent} from 'vue';
import type {PropType} from 'vue';
import type {SourceInterface} from "@/models/SourceInterface";
import {Shower} from "@/models/Shower";
import {Weather as ModelWeather} from "@/models/Weather";
import {Hotel as ModelHotel} from "@/models/Hotel";
import {OptionalTrip as ModelOptionalTrip} from "@/models/OptionalTrip";
import {Flight as ModelFlight} from "@/models/Flight";
import {PageTrip as ModelPageTrip} from "@/models/PageTrip";
import {getAnchorLink, parseNamespace} from "@/helper/parser/namespace";
import type {SearchEntityInterface} from "@/models/SearchEntityInterface";

export default defineComponent({
  props: {
    searchEntity: {
      type: Object as PropType<SearchEntityInterface>,
      required: true
    },
    shower: {
      type: Object as PropType<Shower>,
      required: true
    },
    timer: {
      type: Object as PropType<Date>,
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
    parseNamespace,
    existsService: function (namespace: string): boolean {
      return !(
          this.optionalTrips.filter((optionalTrip) => optionalTrip.source === namespace).length === 0 &&
          this.pageTrips.filter((pageTrip) => pageTrip.source === namespace).length === 0 &&
          this.hotels.filter((hotel) => hotel.source === namespace).length === 0 &&
          this.flights.filter((flight) => flight.source === namespace).length === 0 &&
          this.trips.filter((trip) => trip.source === namespace).length === 0 &&
          this.weathers.filter((weather) => weather.source === namespace).length === 0
      );
    },
    countServices: function (namespace: string): number {
      return (this.optionalTrips as SourceInterface[])
          .concat(this.pageTrips)
          .concat(this.hotels)
          .concat(this.flights)
          .concat(this.weathers)
          .concat(this.trips)
          .filter((service) => service.source === namespace).length ?? 0
    },
  }
});
</script>

<template>
  <nav class="bg-success sticky-top py-2">
    <div class="container">
      <div class="d-flex flex-row text-light">
        <div class="border-end border-dark me-2"/>
        <div v-if="shower.trips">
          <p class="pe-2">{{ $t('main.offer_trips') }}</p>
          <a v-bind:href="existsService(namespace) ? `#${getAnchorLink(namespace)}` : '#'"
             v-for="namespace in searchEntity.services.filter((service) => service.includes('\\Trip'))">
            <button type="button" v-if="existsService(namespace)" class="btn btn-dark mt-2 me-2">
              {{ parseNamespace(namespace) }} ({{ countServices(namespace) }})
            </button>
          </a>
        </div>
        <div class="border-end border-dark me-2" v-if="shower.trips"/>

        <div v-if="shower.hotels">
          <p class="pe-2">{{ $t('main.hotels') }}</p>
          <a v-bind:href="existsService(namespace) ? `#${getAnchorLink(namespace)}` : '#'"
             v-for="namespace in searchEntity.services.filter((service) => service.includes('Hotel'))">
            <button type="button" v-if="existsService(namespace)" class="btn btn-dark mt-2 me-2">
              {{ parseNamespace(namespace) }} ({{ countServices(namespace) }})
            </button>
          </a>
        </div>
        <div class="border-end border-dark me-2" v-if="shower.hotels"/>

        <div v-if="shower.flights">
          <p class="pe-2">{{ $t('main.flights') }}</p>
          <a v-bind:href="existsService(namespace) ? `#${getAnchorLink(namespace)}` : '#'"
             v-for="namespace in searchEntity.services.filter((service) => service.includes('Flight'))">
            <button type="button" v-if="existsService(namespace)" class="btn btn-dark mt-2 me-2">
              {{ parseNamespace(namespace) }} ({{ countServices(namespace) }})
            </button>
          </a>
        </div>
        <div class="border-end border-dark me-2" v-if="shower.flights"/>

        <div v-if="shower.optionalTrips">
          <p class="pe-2">{{ $t('main.optional_tours') }}</p>
          <a v-bind:href="existsService(namespace) ? `#${getAnchorLink(namespace)}` : '#'"
             v-for="namespace in searchEntity.services.filter((service) => service.includes('OptionalTrip'))">
            <button type="button" v-if="existsService(namespace)" class="btn btn-dark mt-2 me-2">
              {{ parseNamespace(namespace) }} ({{ countServices(namespace) }})
            </button>
          </a>
        </div>
        <div class="border-end border-dark me-2" v-if="shower.optionalTrips"/>

        <div v-if="shower.weathers">
          <p class="pe-2">{{ $t('main.weather') }}</p>
          <a v-bind:href="existsService(namespace) ? `#${getAnchorLink(namespace)}` : '#'"
             v-for="namespace in searchEntity.services.filter((service) => service.includes('Weather'))">
            <button type="button" v-if="existsService(namespace)" class="btn btn-dark mt-2 me-2">
              {{ parseNamespace(namespace) }} ({{ countServices(namespace) }})
            </button>
          </a>
        </div>
        <div class="border-end border-dark me-2" v-if="shower.weathers"/>

        <div v-if="shower.travelPages">
          <p class="pe-2">{{ $t('main.travel_pages') }}</p>
          <a v-bind:href="existsService(namespace) ? `#${getAnchorLink(namespace)}` : '#'"
             v-for="namespace in searchEntity.services.filter((service) => service.includes('PageAttraction'))">
            <button type="button" v-if="existsService(namespace)" class="btn btn-dark mt-2 me-2">
              {{ parseNamespace(namespace) }} ({{ countServices(namespace) }})
            </button>
          </a>
        </div>
        <div class="border-end border-dark me-2" v-if="shower.travelPages"/>

        <div>
          <p class="pe-2">{{ $t('main.searcher') }}</p>
          <a href="#form">
            <button type="button" class="btn btn-dark mt-2 me-2">{{ $t('main.searcher') }}</button>
          </a>
          <button class="btn btn-dark mt-2 me-2" disabled type="button" v-if="!searchEntity.finished">
            [{{ timer.toTimeString().split(' ')[0] }}] {{ $t('main.downloading') }}...
          </button>
        </div>
        <div class="border-end border-dark me-2"/>
      </div>
    </div>
  </nav>
</template>
