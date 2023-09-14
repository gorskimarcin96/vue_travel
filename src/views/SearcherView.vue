<script lang="ts">
import {defineComponent} from 'vue';
import travel from "@/api/travel";
import TripPage from "@/views/component/TripPage.vue";
import OptionalTrip from "@/views/component/OptionalTrip.vue";
import {OptionalTrip as ModelOptionalTrip} from "@/models/OptionalTrip";
import {Search as ModelSearch} from "@/models/Search";
import {PageTrip as ModelPageTrip} from "@/models/PageTrip";

export default defineComponent({
  components: {TripPage, OptionalTrip},
  data: function () {
    return {
      nation: '',
      place: '',
      force: false,
      searchData: null as null | ModelSearch,
      pageTrips: [] as ModelPageTrip[],
      optionalTrips: [] as ModelOptionalTrip[],
      timer: new Date(),
    }
  },
  methods: {
    searching: async function () {
      this.timer = new Date();
      this.searchData = await travel.search(this.nation, this.place, this.force);
      this.force = false;

      for (const service of this.searchData.services) {
        if (service.includes('PageAttraction')) {
          (await travel.getPageTrips(this.searchData.id, service))
              .map((pageTrip: ModelPageTrip) => this.pageTrips.push(pageTrip));
        } else if (service.includes('OptionalTrip')) {
          (await travel.getOptionalTrips(this.searchData.id, service))
              .map((optionalTrip: ModelOptionalTrip) => this.optionalTrips.push(optionalTrip));
        }
      }

      if (!this.searchData.finished) {
        setTimeout(() => this.searching(), 10000);
      }
    },
    search: function () {
      this.pageTrips = [];
      this.optionalTrips = [];
      this.searching();
    },
    uniqueSource: function (input: ModelPageTrip[] | ModelOptionalTrip[]) {
      return input.map((value) => value.source).filter(function (value, index, self) {
        return self.indexOf(value) === index;
      });
    },
    parseNamespace: function (input: string | string[]) {
      return typeof input === 'string' ? input.split('\\').pop() : input.map(this.parseNamespace);
    },
    parseError: function (input: object) {
      let error = [];

      for (const key of Object.keys(input)) {
        error.push(this.parseNamespace(key) + ' ' + input[key])
      }

      return error;
    },
    isDisabled: function (namespace: string): boolean {
      return this.pageTrips.filter((pageTrip: ModelPageTrip) => pageTrip.source === namespace).length === 0 &&
          this.optionalTrips.filter((optinalTrip: ModelOptionalTrip) => optinalTrip.source === namespace).length === 0;
    }
  }
});
</script>

<template>
  <div class="container">
    <div class="row border border-success rounded mb-3 p-3 text-white">
      <div class="col-4">
        <label for="nation" class="form-label">Nation</label>
        <input type="text" class="form-control" id="nation" v-model="nation">
      </div>
      <div class="col-4">
        <label for="place" class="form-label">Place</label>
        <input type="text" class="form-control" id="place" v-model="place">
      </div>
      <div class="col-4">
        <div><label class="form-check-label" for="force">Force</label></div>
        <input type="checkbox" class="form-check-input mt-2" id="force" v-model="force">
      </div>
      <div class="col-12 text-end">
        <button type="submit" class="btn btn-success" @click="search">Search</button>
      </div>
    </div>
  </div>

  <nav class="bg-success sticky-top py-2" v-if="searchData">
    <div class="container">
      <div class="row">
        <div v-bind:class="[searchData && searchData.finished && searchData.errors.length ? 'col-6' : 'col-12']">
          <a v-bind:href="isDisabled(namespace) ? '' : ('#'+parseNamespace(namespace))"
             v-for="namespace in searchData.services">
            <button type="button" :disabled="isDisabled(namespace)" class="btn btn-dark me-2">
              {{ parseNamespace(namespace) }}
            </button>
          </a>
          <button v-if="!searchData.finished" class="btn btn-dark" disabled type="button">
            [{{ timer.toTimeString().split(' ')[0] }}] Downloading...
          </button>
        </div>
        <div class="col-6" v-if="searchData.finished && searchData.errors.length">
          <ol class="text-light">
            <li v-for="error in parseError(searchData.errors)">{{ error }}</li>
          </ol>
        </div>
      </div>
    </div>
  </nav>

  <div class="container mt-2">
    <div v-for="service in uniqueSource(pageTrips)">
      <h2 class="text-success" v-bind:id="parseNamespace(service)">{{ parseNamespace(service) }}</h2>
      <trip-page v-bind:page-trip="tripPage"
                 v-for="tripPage in pageTrips.filter((pageTrip: ModelPageTrip) => pageTrip.source === service)"/>
    </div>
    <div v-for="service in uniqueSource(optionalTrips)">
      <h2 class="text-success" v-bind:id="parseNamespace(service)">{{ parseNamespace(service) }}</h2>
      <optional-trip v-bind:optional-trip="optionalTrip"
                     v-for="optionalTrip in optionalTrips.filter((optionalTrip: OptionalTrip) => optionalTrip.source === service)"/>
    </div>
  </div>
</template>
