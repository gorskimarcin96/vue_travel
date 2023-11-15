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
import {Flight as ModelFlight} from "@/models/Flight";
import {fromString} from "@/parser/namespace";
import type {SourceInterface} from "@/models/SourceInterface";
import {fromStringToDateString} from "@/parser/datetime";
import flyCodesJson from "@/data/fly_codes.json";
import {FlyCode} from "@/models/FlyCode";
import {SearchInput} from "@/models/SearchInput";
import Flight from "@/views/component/Flight.vue";

const flyCodes = flyCodesJson.map(flyCode => new FlyCode(flyCode.code, flyCode.city, flyCode.nation))

export default defineComponent({
  components: {Flight, TripPage, OptionalTrip, Hotel},
  data: function () {
    return {
      showHotels: true,
      showFlights: true,
      showTrips: true,
      showTravelPages: true,
      fromAirport: '',
      fromAirportSuggestions: [] as FlyCode[],
      toAirport: '',
      toAirportSuggestions: [] as FlyCode[],
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
      flights: [] as ModelFlight[],
      timer: new Date(),
    }
  },
  computed: {
    saveIsDisabled: function (): boolean {
      return !this.nation || !this.place;
    },
  },
  methods: {
    searching: async function (id: null | number = null) {
      this.timer = new Date();
      this.searchData = id ? await travel.get(id) : await travel.search(new SearchInput(
          this.nation, this.place, this.from, this.to, this.fromAirport, this.toAirport, this.adults, this.children, this.force
      ));
      this.force = false;

      if (!this.nation || !this.place) {
        this.nation = this.searchData.nation;
        this.place = this.searchData.place;
        this.from = this.parseDate(this.searchData.from);
        this.to = this.parseDate(this.searchData.to);
        this.adults = this.searchData.adults;
        this.children = this.searchData.children;
        this.fromAirport = this.searchData.fromAirport;
        this.toAirport = this.searchData.toAirport;
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
        } else if (service.includes('Flight')) {
          (await travel.getFlights(this.searchData.id, service))
              .map((flight: ModelFlight) => this.flights.push(flight));
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
      this.flights = [];
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
    prefixFromNamespace: function (input: string): string {
      return input.replace("App\\Utils\\Crawler\\", "").replace("\\" + this.parseNamespace(input), "");
    },
    getAnchorLink: function (input: string): string {
      return `${this.prefixFromNamespace(input)}${this.parseNamespace(input)}`;
    },
    serviceIsDisabled: function (namespace: string): boolean {
      return this.pageTrips.filter((pageTrip) => pageTrip.source === namespace).length === 0 &&
          this.optionalTrips.filter((optionalTrip) => optionalTrip.source === namespace).length === 0 &&
          this.hotels.filter((hotel) => hotel.source === namespace).length === 0 &&
          this.flights.filter((flight) => flight.source === namespace).length === 0;
    },
    countServices: function (namespace: string): number {
      return (this.optionalTrips as SourceInterface[])
          .concat(this.pageTrips)
          .concat(this.hotels)
          .concat(this.flights)
          .filter((service) => service.source === namespace).length ?? 0
    },
    addDays: function (date: Date, days: number) {
      date.setDate(date.getDate() + days);

      return date;
    },
    getBetweenDays: function (): number {
      return this.from && this.to ? (new Date(this.to).valueOf() - new Date(this.from).valueOf()) / (1000 * 3600 * 24) : 0;
    },
    autocompleteFromAirPort: function () {
      if (this.fromAirport.length < 2) {
        this.fromAirportSuggestions = [];

        return;
      }

      this.fromAirportSuggestions = flyCodes.filter((row) =>
          row.code.toLowerCase().includes(this.fromAirport.toLowerCase()) ||
          row.city.toLowerCase().includes(this.fromAirport.toLowerCase()) ||
          row.nation.toLowerCase().includes(this.fromAirport.toLowerCase())
      )
    },
    autocompleteToAirPort: function () {
      if (this.toAirport.length < 2) {
        this.toAirportSuggestions = [];

        return;
      }

      this.toAirportSuggestions = flyCodes.filter((row) =>
          row.code.toLowerCase().includes(this.toAirport.toLowerCase()) ||
          row.city.toLowerCase().includes(this.toAirport.toLowerCase()) ||
          row.nation.toLowerCase().includes(this.toAirport.toLowerCase())
      )
    },
    selectFromAirport: function (code: string) {
      const selected = flyCodes.filter((row) => row.code === code)[0];
      this.fromAirport = `${selected.code} - ${selected.city} ${selected.nation}`;
      this.fromAirportSuggestions = [];
    },
    selectToAirport: function (code: string) {
      const selected = flyCodes.filter((row) => row.code === code)[0];
      this.toAirport = `${selected.code} - ${selected.city} ${selected.nation}`;
      this.toAirportSuggestions = [];
      this.nation = selected.nation;

      if (!this.place) {
        this.place = selected.city;
      }
    },
    clearFromAirport: function () {
      this.fromAirport = '';
    },
    clearToAirport: function () {
      this.toAirport = '';
    },
    escapeFromAirport: function () {
      setTimeout(() => {
        if (this.fromAirportSuggestions.length) {
          this.selectFromAirport(this.fromAirportSuggestions[0].code)
        }
      }, 2000)
    },
    escapeToAirport: function () {
      setTimeout(() => {
        if (this.toAirportSuggestions.length) {
          this.selectToAirport(this.toAirportSuggestions[0].code)
        }
      }, 2000)
    }
  },
  async created() {
    this.from = this.parseDate(this.addDays(new Date(), 14).toISOString());
    this.to = this.parseDate(this.addDays(new Date(), 21).toISOString());
    this.selectFromAirport('WAW')

    if (this.$route.params.id !== undefined && typeof this.$route.params.id === 'string') {
      this.searching(parseInt(this.$route.params.id));
    }
  },
});
</script>

<style>
ol.autocomplete {
  width: 297.5px;
}
</style>

<template>
  <div class="container" id="form">
    <div class="row border border-success rounded mb-3 p-3 text-white" v-on:keyup.enter="onEnter">
      <div class="col-12">{{ $t('main.filters') }}</div>
      <div class="col-sm-4 col-md-2 mt-2">
        <div><label class="form-check-label" for="show_hotels">{{ $t('main.show_hotels') }}</label></div>
        <input type="checkbox" class="form-check-input" id="show_hotels" v-model="showHotels">
      </div>
      <div class="col-sm-4 col-md-2 mt-2">
        <div><label class="form-check-label" for="show_flights">{{ $t('main.show_flights') }}</label></div>
        <input type="checkbox" class="form-check-input" id="show_flights" v-model="showFlights">
      </div>
      <div class="col-sm-4 col-md-2 mt-2">
        <div><label class="form-check-label" for="show_trips">{{ $t('main.show_trips') }}</label></div>
        <input type="checkbox" class="form-check-input" id="show_trips" v-model="showTrips">
      </div>
      <div class="col-sm-4 col-md-2 mt-2">
        <div><label class="form-check-label" for="show_travel_pages">{{ $t('main.show_travel_pages') }}</label>
        </div>
        <input type="checkbox" class="form-check-input" id="show_travel_pages" v-model="showTravelPages">
      </div>
      <div class="col-12 border-bottom border-success my-2"/>
      <div class="col-12">{{ $t('main.searcher') }}</div>
      <div class="col-sm-12 col-md-3 mt-2">
        <label for="nation" class="form-label">{{ $t('main.nation') }}</label>
        <input type="text" class="form-control" id="nation" v-model="nation">
        <small id="nation" class="form-text text-muted">{{ $t('main.try_using_polish_sentence') }}.</small>
      </div>
      <div class="col-sm-12 col-md-3 mt-2">
        <label for="place" class="form-label">{{ $t('main.place') }}</label>
        <input type="text" class="form-control" id="place" v-model="place">
        <small id="place" class="form-text text-muted">{{ $t('main.try_using_polish_sentence') }}.</small>
      </div>
      <div class="col-sm-12 col-md-3 mt-2" v-if="showHotels || showFlights">
        <label for="from" class="form-label">{{ $t('main.from') }}</label>
        <input type="date" class="form-control" id="from" v-model="from">
      </div>
      <div class="col-sm-12 col-md-3 mt-2" v-if="showHotels || showFlights">
        <label for="to" class="form-label">{{ $t('main.to') }}</label>
        <input type="date" class="form-control" id="to" v-model="to">
      </div>
      <div class="col-sm-12 col-md-3 mt-2" v-if="showFlights">
        <label for="from" class="form-label">{{ $t('main.from_airport') }}</label>
        <input type="text" class="form-control" v-model="fromAirport" @keyup="autocompleteFromAirPort"
               @focusin="clearFromAirport" @focusout="escapeFromAirport">
        <ol class="list-group position-absolute autocomplete">
          <li class="list-group-item d-flex justify-content-between align-items-start cursor-pointer"
              v-for="suggestion in fromAirportSuggestions" @click="selectFromAirport(suggestion.code)">
            <div class="ms-2 me-auto"><span class="fw-bold">{{ suggestion.city }}</span> {{ suggestion.nation }}</div>
            <span class="badge bg-success rounded-pill">{{ suggestion.code }}</span>
          </li>
        </ol>
      </div>
      <div class="col-sm-12 col-md-3 mt-2" v-if="showFlights">
        <label for="from" class="form-label">{{ $t('main.to_airport') }}</label>
        <input type="text" class="form-control" v-model="toAirport" @keyup="autocompleteToAirPort"
               @focusin="clearToAirport" @focusout="escapeToAirport">
        <ol class="list-group position-absolute autocomplete">
          <li class="list-group-item d-flex justify-content-between align-items-start cursor-pointer"
              v-for="suggestion in toAirportSuggestions" @click="selectToAirport(suggestion.code)">
            <div class="ms-2 me-auto"><span class="fw-bold">{{ suggestion.city }}</span> {{ suggestion.nation }}</div>
            <span class="badge bg-success rounded-pill">{{ suggestion.code }}</span>
          </li>
        </ol>
      </div>
      <div class="col-sm-12 col-md-3 mt-2" v-if="showHotels || showFlights">
        <label for="adults" class="form-label">{{ $t('main.adults') }}</label>
        <input type="number" class="form-control" id="adults" min="1" step="1" pattern="\d+" v-model="adults">
      </div>
      <div class="col-sm-12 col-md-3 mt-2" v-if="showHotels || showFlights">
        <label for="children" class="form-label">{{ $t('main.children') }}</label>
        <input type="number" class="form-control" id="children" min="0" step="1" pattern="\d+" v-model="children">
      </div>
      <div class="col-sm-12 col-md-6" v-if="showFlights"></div>
      <div class="col-sm-12 col-md-3 mt-2">
        <div><label class="form-check-label" for="force">{{ $t('main.force_search') }}</label></div>
        <input type="checkbox" class="form-check-input" id="force" v-model="force" data-bs-toggle="tooltip"
               v-bind:title="$t('main.search_new_data')">
      </div>
      <div class="col-sm-12 col-md-3 mt-2 text-end" v-if="showHotels || showFlights">
        {{ $t('main.trip_period') }} <span class="text-success fw-bolder">{{ getBetweenDays() }}</span>
        {{ $t('main.days') }}.
      </div>
      <div class="col-12 text-end">
        <button type="submit" class="btn btn-success" @click="search" v-bind:disabled="saveIsDisabled">
          {{ $t('main.search') }}
        </button>
      </div>
    </div>
  </div>

  <nav class="bg-success sticky-top py-2" v-if="searchData">
    <div class="container">
      <div class="d-flex flex-row text-light">
        <div v-if="showHotels">
          <p class="pe-2">{{ $t('main.hotels') }}</p>
          <a v-bind:href="serviceIsDisabled(namespace) ? '#' : `#${getAnchorLink(namespace)}`"
             v-for="namespace in searchData.services.filter((service) => service.includes('Hotel'))">
            <button type="button" :disabled="serviceIsDisabled(namespace)" class="btn btn-dark me-2">
              {{ parseNamespace(namespace) }} ({{ countServices(namespace) }})
            </button>
          </a>
        </div>
        <div class="border-end border-dark me-2" v-if="showHotels"/>
        <div v-if="showFlights">
          <p class="pe-2">{{ $t('main.flights') }}</p>
          <a v-bind:href="serviceIsDisabled(namespace) ? '#' : `#${getAnchorLink(namespace)}`"
             v-for="namespace in searchData.services.filter((service) => service.includes('Flight'))">
            <button type="button" :disabled="serviceIsDisabled(namespace)" class="btn btn-dark me-2">
              {{ parseNamespace(namespace) }} ({{ countServices(namespace) }})
            </button>
          </a>
        </div>
        <div class="border-end border-dark me-2" v-if="showFlights"/>
        <div v-if="showTrips">
          <p class="pe-2">{{ $t('main.trips') }}</p>
          <a v-bind:href="serviceIsDisabled(namespace) ? '#' : `#${getAnchorLink(namespace)}`"
             v-for="namespace in searchData.services.filter((service) => service.includes('OptionalTrip'))">
            <button type="button" :disabled="serviceIsDisabled(namespace)" class="btn btn-dark me-2">
              {{ parseNamespace(namespace) }} ({{ countServices(namespace) }})
            </button>
          </a>
        </div>
        <div class="border-end border-dark me-2" v-if="showTrips"/>
        <div v-if="showTravelPages">
          <p class="pe-2">{{ $t('main.travel_pages') }}</p>
          <a v-bind:href="serviceIsDisabled(namespace) ? '#' : `#${getAnchorLink(namespace)}`"
             v-for="namespace in searchData.services.filter((service) => service.includes('PageAttraction'))">
            <button type="button" :disabled="serviceIsDisabled(namespace)" class="btn btn-dark me-2">
              {{ parseNamespace(namespace) }} ({{ countServices(namespace) }})
            </button>
          </a>
        </div>
        <div class="border-end border-dark me-2" v-if="showTravelPages"/>
        <div>
          <p class="pe-2">{{ $t('main.searcher') }}</p>
          <a href="#form">
            <button type="button" class="btn btn-dark me-2">
              {{ $t('main.searcher') }}
            </button>
          </a>
          <button class="btn btn-dark" disabled type="button" v-if="!searchData.finished">
            [{{ timer.toTimeString().split(' ')[0] }}] {{ $t('main.downloading') }}...
          </button>
        </div>
      </div>
    </div>
  </nav>

  <div class="container">
    <div v-for="service in uniqueSource(hotels)" v-if="showHotels">
      <h2 class="text-success" v-bind:id="getAnchorLink(service)">{{ parseNamespace(service) }}</h2>
      <div class="row">
        <div class="col-6" v-for="hotel in hotels.filter((hotel) => hotel.source === service)">
          <hotel :hotel="hotel" :nightNumber="getBetweenDays() - 1"/>
        </div>
      </div>
    </div>
    <div v-for="service in uniqueSource(flights)" v-if="flights">
      <h2 class="text-success" v-bind:id="getAnchorLink(service)">{{ parseNamespace(service) }}</h2>
      <flight :flights="flights.filter((flight) => flight.source === service)"/>
    </div>
    <div v-for="service in uniqueSource(optionalTrips)" v-if="showTrips">
      <h2 class="text-success" v-bind:id="getAnchorLink(service)">{{ parseNamespace(service) }}</h2>
      <div v-for="optionalTrip in optionalTrips.filter((optionalTrip) => optionalTrip.source === service)">
        <optional-trip :optional-trip="optionalTrip"/>
      </div>
    </div>
    <div v-for="service in uniqueSource(pageTrips)" v-if="showTravelPages">
      <h2 class="text-success" v-bind:id="getAnchorLink(service)">{{ parseNamespace(service) }}</h2>
      <trip-page :page-trip="tripPage" v-for="tripPage in pageTrips.filter((pageTrip) => pageTrip.source === service)"/>
    </div>
  </div>
</template>
