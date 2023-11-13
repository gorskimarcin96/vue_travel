<script lang="ts">
import {defineComponent} from 'vue';
import travel from "@/api/travel";
import TripPage from "@/views/component/TripPage.vue";
import OptionalTrip from "@/views/component/OptionalTrip.vue";
import Hotel from "@/views/component/Hotel.vue";
import {OptionalTrip as ModelOptionalTrip} from "@/models/OptionalTrip";
import {Search as ModelSearch} from "@/models/Search";
import {PageTrip as ModelPageTrip} from "@/models/PageTrip";
import {Hotel as ModelHotel} from "@/models/Hotel";
import {fromString} from "@/parser/namespace";
import type {SourceInterface} from "@/models/SourceInterface";
import {fromStringToDateString} from "@/parser/datetime";

export default defineComponent({
  components: {TripPage, OptionalTrip, Hotel},
  data: function () {
    return {
      nation: '',
      place: '',
      from: null as string | null,
      to: null as string | null,
      adults: 2,
      children: 0,
      force: false,
      searchData: null as null | ModelSearch,
      pageTrips: [] as ModelPageTrip[],
      optionalTrips: [] as ModelOptionalTrip[],
      hotels: [] as ModelHotel[],
      timer: new Date(),
    }
  },
  computed: {
    saveIsDisabled: function (): boolean {
      return !this.nation || !this.place || !this.from || !this.to || this.adults <= 0 || this.children < 0;
    },
  },
  methods: {
    searching: async function (id: null | number = null) {
      this.timer = new Date();
      this.searchData = id ? await travel.get(id) : await travel.search(this.nation, this.place, this.from ?? '', this.to ?? '', this.adults, this.children, this.force);
      this.force = false;

      if (!this.nation || !this.place) {
        this.nation = this.searchData.nation;
        this.place = this.searchData.place;
        this.from = this.parseDate(this.searchData.from);
        this.to = this.parseDate(this.searchData.to);
        this.adults = this.searchData.adults;
        this.children = this.searchData.children;
      }

      for (const service of this.searchData.services) {
        if (service.includes('PageAttraction')) {
          (await travel.getPageTrips(this.searchData.id, service))
              .map((pageTrip: ModelPageTrip) => this.pageTrips.push(pageTrip));
        } else if (service.includes('OptionalTrip')) {
          (await travel.getOptionalTrips(this.searchData.id, service))
              .map((optionalTrip: ModelOptionalTrip) => this.optionalTrips.push(optionalTrip));
        } else if (service.includes('Hotel')) {
          (await travel.getHotels(this.searchData.id, service))
              .map((hotel: ModelHotel) => this.hotels.push(hotel));
        }
      }

      if (!this.searchData.finished) {
        setTimeout(() => this.searching(), 10000);
      }
    },
    search: function () {
      this.pageTrips = [];
      this.optionalTrips = [];
      this.hotels = [];
      this.searching();
    },
    onEnter: function () {
      this.search();
    },
    uniqueSource: function (input: SourceInterface[]): string[] {
      return input.map((value) => value.source).filter(function (value, index, self) {
        return self.indexOf(value) === index;
      });
    },
    parseDate: function (input: string) {
      return fromStringToDateString(input);
    },
    parseNamespace: function (input: string): string {
      return fromString(input);
    },
    serviceIsDisabled: function (namespace: string): boolean {
      return this.pageTrips.filter((pageTrip) => pageTrip.source === namespace).length === 0 &&
          this.optionalTrips.filter((optionalTrip) => optionalTrip.source === namespace).length === 0 &&
          this.hotels.filter((hotel) => hotel.source === namespace).length === 0;
    },
    addDays: function (date: Date, days: number) {
      date.setDate(date.getDate() + days);

      return date;
    },
    getBetweenDays: function () {
      return (new Date(this.to) - new Date(this.from)) / (1000 * 3600 * 24);
    }
  },
  async created() {
    const date = new Date();
    this.from = this.parseDate(date.toISOString());
    this.to = this.parseDate(this.addDays(new Date(), 7).toISOString());

    if (this.$route.params.id !== undefined && typeof this.$route.params.id === 'string') {
      this.searching(parseInt(this.$route.params.id));
    }
  },
});
</script>

<template>
  <div class="container">
    <div class="row border border-success rounded mb-3 p-3 text-white" v-on:keyup.enter="onEnter">
      <div class="col-3 mt-2">
        <label for="nation" class="form-label">{{ $t('main.nation') }}</label>
        <input type="text" class="form-control" id="nation" v-model="nation">
      </div>
      <div class="col-3 mt-2">
        <label for="place" class="form-label">{{ $t('main.place') }}</label>
        <input type="text" class="form-control" id="place" v-model="place">
      </div>
      <div class="col-3 mt-2">
        <label for="from" class="form-label">{{ $t('main.from') }}</label>
        <input type="date" class="form-control" id="from" v-model="from">
      </div>
      <div class="col-3 mt-2">
        <label for="to" class="form-label">{{ $t('main.to') }}</label>
        <input type="date" class="form-control" id="to" v-model="to">
      </div>
      <div class="col-3 mt-2">
        <label for="adults" class="form-label">{{ $t('main.adults') }}</label>
        <input type="number" class="form-control" id="adults" min="1" step="1" pattern="\d+" v-model="adults">
      </div>
      <div class="col-3 mt-2">
        <label for="children" class="form-label">{{ $t('main.children') }}</label>
        <input type="number" class="form-control" id="children" min="0" step="1" pattern="\d+" v-model="children">
      </div>
      <div class="col-3 mt-2">
        <div><label class="form-check-label" for="force">{{ $t('main.force_search') }}</label></div>
        <input type="checkbox" class="form-check-input" id="force" v-model="force">
      </div>
      <div class="col-3 mt-2 text-end">
        {{ $t('main.trip_period') }} <span class="text-success fw-bolder">{{ getBetweenDays() }}</span> {{ $t('main.days') }}.
      </div>
      <div class="col-12 text-end">
        <button type="submit" class="btn btn-success" @click="search" v-bind:disabled="saveIsDisabled">{{ $t('main.search') }}</button>
      </div>
    </div>
  </div>

  <nav class="bg-success sticky-top py-2" v-if="searchData">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <a v-bind:href="serviceIsDisabled(namespace) ? '#' : ('#'+parseNamespace(namespace))"
             v-for="namespace in searchData.services">
            <button type="button" :disabled="serviceIsDisabled(namespace)" class="btn btn-dark me-2">
              {{ parseNamespace(namespace) }}
              ({{
                (optionalTrips as SourceInterface[]).concat(pageTrips).concat(hotels).filter((service) => service.source === namespace).length ?? 0
              }})
            </button>
          </a>
          <button v-if="!searchData.finished" class="btn btn-dark" disabled type="button">
            [{{ timer.toTimeString().split(' ')[0] }}] Downloading...
          </button>
        </div>
      </div>
    </div>
  </nav>

  <div class="container">
    <div v-for="service in uniqueSource(hotels)">
      <h2 class="text-success" v-bind:id="parseNamespace(service)">{{ parseNamespace(service) }}</h2>
      <div class="row">
        <div class="col-6" v-for="hotel in hotels.filter((hotel) => hotel.source === service)">
          <hotel :hotel="hotel" :nightNumber="getBetweenDays() - 1"/>
        </div>
      </div>
    </div>
    <div v-for="service in uniqueSource(pageTrips)">
      <h2 class="text-success" v-bind:id="parseNamespace(service)">{{ parseNamespace(service) }}</h2>
      <trip-page :page-trip="tripPage" v-for="tripPage in pageTrips.filter((pageTrip) => pageTrip.source === service)"/>
    </div>
    <div v-for="service in uniqueSource(optionalTrips)">
      <h2 class="text-success" v-bind:id="parseNamespace(service)">{{ parseNamespace(service) }}</h2>
      <div v-for="optionalTrip in optionalTrips.filter((optionalTrip) => optionalTrip.source === service)">
        <optional-trip :optional-trip="optionalTrip"/>
      </div>
    </div>
  </div>
</template>
