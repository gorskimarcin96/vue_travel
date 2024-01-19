<script lang="ts">
import {defineComponent} from 'vue';
import {OptionalTrip as ModelOptionalTrip} from "@/models/OptionalTrip";
import {Search as ModelSearch} from "@/models/Search";
import {PageTrip as ModelPageTrip} from "@/models/PageTrip";
import {Hotel as ModelHotel} from "@/models/Hotel";
import {Flight as ModelFlight} from "@/models/Flight";
import {Weather as ModelWeather} from "@/models/Weather";
import TripPage from "@/views/component/TripPage.vue";
import OptionalTrip from "@/views/component/OptionalTrip.vue";
import Hotel from "@/views/component/Hotel.vue";
import Flight from "@/views/component/Flight.vue";
import Weather from "@/views/component/Weather.vue";
import Form from "@/views/component/Form.vue";
import Navigation from "@/views/component/Navigation.vue";
import {parseNamespace} from "@/helper/parser/namespace";
import travel from "@/api/travel";
import {SearchInput} from "@/models/SearchInput";
import {Shower} from "@/models/Shower";

export default defineComponent({
  components: {Navigation, Form, Weather, Flight, TripPage, OptionalTrip, Hotel},
  abstract: true,
  data: function () {
    return {
      shower: new Shower(),
      searchData: null as null | ModelSearch,
      pageTrips: [] as ModelPageTrip[],
      optionalTrips: [] as ModelOptionalTrip[],
      hotels: [] as ModelHotel[],
      flights: [] as ModelFlight[],
      weathers: [] as ModelWeather[],
      trips: [] as ModelHotel[],
      timer: new Date(),
    }
  },
  methods: {
    parseNamespace,
    search: async function (modelSearch: ModelSearch) {
      this.timer = new Date();
      this.searchData = modelSearch;

      for (const service of modelSearch.services) {
        if (service.includes('\\Trip')) {
          (await travel.getTrips(modelSearch.id, service))
              .map((trip: ModelHotel) => this.trips.filter(item => item.id === trip.id).length ? {} : this.trips.push(trip));
        } else if (service.includes('PageAttraction')) {
          (await travel.getPageTrips(modelSearch.id, service))
              .map((pageTrip: ModelPageTrip) => this.pageTrips.filter(item => item.id === pageTrip.id).length ? {} : this.pageTrips.push(pageTrip));
        } else if (service.includes('OptionalTrip')) {
          (await travel.getOptionalTrips(modelSearch.id, service))
              .map((optionalTrip: ModelOptionalTrip) => this.optionalTrips.filter(item => item.id === optionalTrip.id).length ? {} : this.optionalTrips.push(optionalTrip));
        } else if (service.includes('Hotel')) {
          (await travel.getHotels(modelSearch.id, service))
              .map((hotel: ModelHotel) => this.hotels.filter(item => item.id === hotel.id).length ? {} : this.hotels.push(hotel));
        } else if (service.includes('Flight')) {
          (await travel.getFlights(modelSearch.id, service))
              .map((flight: ModelFlight) => this.flights.filter(item => item.id === flight.id).length ? {} : this.flights.push(flight));
        } else if (service.includes('Weather')) {
          (await travel.getWeathers(modelSearch.id, service))
              .map((weather: ModelWeather) => this.weathers.filter(item => item.id === weather.id).length ? {} : this.weathers.push(weather));
        }
      }

      if (!modelSearch.finished) {
        setTimeout(() => this.search(modelSearch), 10000);
      }
    },
    sendForm: function (searchInput: SearchInput) {
      travel.search(searchInput).then(searchModel => this.search(searchModel))
    },
    changeShowStatus: function (shower: Shower) {
      this.shower = shower;
    },
    getNightNumber: function (): number {
      return this.searchData ? this.searchData.adults + this.searchData.children : 0;
    }
  }
});
</script>
<template/>
