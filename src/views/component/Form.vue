<script lang="ts">
import {defineComponent} from 'vue';
import {FlyCode} from "@/models/FlyCode";
import flyCodesJson from "@/data/fly_codes.json";
import {fromStringToDateString} from "@/helper/parser/datetime";
import {SearchInput} from "@/models/SearchInput";
import {Shower} from "@/models/Shower";
import {foodStringToTranslate} from "@/helper/foodTranslate";

const flyCodes = flyCodesJson.map(flyCode => new FlyCode(flyCode.code, flyCode.city, flyCode.nation))

export default defineComponent({
  data: function () {
    return {
      shower: new Shower(),
      fromAirport: '',
      fromAirportSuggestions: [] as FlyCode[],
      toAirport: '',
      toAirportSuggestions: [] as FlyCode[],
      nation: '',
      place: '',
      from: '',
      to: '',
      staysFrom: 5 as null | number,
      staysTo: 10 as null | number,
      stars: null as null | number,
      rate: null as null | number,
      adults: 2 as null | number,
      children: 0 as null | number,
      food: [] as string[],
      force: false,
      foodOptions: [null, 'all-inclusive', 'breakfast, launch and dinner', 'breakfast and dinner', 'breakfast', 'without food']
    }
  },
  methods: {
    foodStringToTranslate,
    search: function () {
      this.$emit('request', new SearchInput(
          this.nation,
          this.place,
          this.from,
          this.to,
          this.fromAirport,
          this.toAirport,
          this.adults,
          this.children,
          this.food,
          this.stars,
          this.rate,
          this.staysFrom,
          this.staysTo,
          this.force
      ));
      this.force = false
    },
    changeShowerStatus: function () {
      this.$emit('shower', this.shower);
    },
    parseDate: function (input: string) {
      return fromStringToDateString(input);
    },
    addDays: function (date: Date, days: number) {
      date.setDate(date.getDate() + days);

      return date;
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
    },
  },
  computed: {
    saveIsDisabled: function (): boolean {
      return !this.nation || !this.place;
    },
  },
  created() {
    this.from = this.parseDate(this.addDays(new Date(), 30).toISOString());
    this.to = this.parseDate(this.addDays(new Date(), 60).toISOString());
    this.selectFromAirport('WAW');
  },
  props: {
    hideForm: {
      type: Boolean,
      required: true
    },
  }
});
</script>

<style>
ol.autocomplete {
  width: 297.5px;
}
</style>

<template>
  <div class="container" id="form">
    <div class="row border border-success rounded mb-3 p-3 text-white" v-on:keyup.enter="search">
      <div class="col-12">{{ $t('main.filters') }}</div>
      <div class="col-sm-4 col-md-2 mt-2">
        <div>
          <label class="form-check-label" for="show_offers">{{ $t('main.show_offers') }}</label>
        </div>
        <input type="checkbox" class="form-check-input" id="show_offers" v-model="shower.trips"
               @change.prevent="changeShowerStatus">
      </div>
      <div class="col-sm-4 col-md-2 mt-2">
        <div>
          <label class="form-check-label" for="show_hotels">{{ $t('main.show_hotels') }}</label>
        </div>
        <input type="checkbox" class="form-check-input" id="show_hotels" v-model="shower.hotels"
               @change.prevent="changeShowerStatus">
      </div>
      <div class="col-sm-4 col-md-2 mt-2">
        <div>
          <label class="form-check-label" for="show_flights">{{ $t('main.show_flights') }}</label>
        </div>
        <input type="checkbox" class="form-check-input" id="show_flights" v-model="shower.flights"
               @change.prevent="changeShowerStatus">
      </div>
      <div class="col-sm-4 col-md-2 mt-2">
        <div>
          <label class="form-check-label" for="show_travel_pages">{{ $t('main.show_travel_pages') }}</label>
        </div>
        <input type="checkbox" class="form-check-input" id="show_travel_pages" v-model="shower.travelPages"
               @change.prevent="changeShowerStatus">
      </div>
      <div class="col-sm-4 col-md-2 mt-2">
        <div>
          <label class="form-check-label" for="show_optional_trips">{{ $t('main.show_optional_trips') }}</label>
        </div>
        <input type="checkbox" class="form-check-input" id="show_optional_trips" v-model="shower.optionalTrips"
               @change.prevent="changeShowerStatus">
      </div>
      <div class="col-sm-4 col-md-2 mt-2">
        <div>
          <label class="form-check-label" for="show_weathers">{{ $t('main.show_weathers') }}</label>
        </div>
        <input type="checkbox" class="form-check-input" id="show_weathers" v-model="shower.weathers"
               @change.prevent="changeShowerStatus">
      </div>

      <div class="col-12 border-bottom border-success my-2" v-if="!hideForm"/>
      <div class="col-12" v-if="!hideForm">{{ $t('main.searcher') }}</div>
      <div class="col-sm-12 col-md-3 mt-2" v-if="!hideForm">
        <label for="nation" class="form-label">{{ $t('main.nation') }}</label>
        <input type="text" class="form-control" id="nation" v-model="nation" required>
        <small id="nation" class="form-text text-muted">{{ $t('main.try_using_polish_sentence') }}.</small>
      </div>
      <div class="col-sm-12 col-md-3 mt-2" v-if="!hideForm">
        <label for="place" class="form-label">{{ $t('main.place') }}</label>
        <input type="text" class="form-control" id="place" v-model="place" required>
        <small id="place" class="form-text text-muted">{{ $t('main.try_using_polish_sentence') }}.</small>
      </div>
      <div class="col-sm-12 col-md-3 mt-2" v-if="!hideForm">
        <label for="from" class="form-label">{{ $t('main.from') }}</label>
        <input type="date" class="form-control" id="from" v-model="from">
      </div>
      <div class="col-sm-12 col-md-3 mt-2" v-if="!hideForm">
        <label for="to" class="form-label">{{ $t('main.to') }}</label>
        <input type="date" class="form-control" id="to" v-model="to">
      </div>
      <div class="col-sm-12 col-md-3 mt-2" v-if="(shower.trips || shower.hotels || shower.flights) && !hideForm">
        <label for="stays_from" class="form-label">{{ $t('main.stays_from') }}</label>
        <input type="number" class="form-control" id="stays_from" v-model="staysFrom">
      </div>
      <div class="col-sm-12 col-md-3 mt-2" v-if="(shower.trips || shower.hotels || shower.flights) && !hideForm">
        <label for="stays_to" class="form-label">{{ $t('main.stays_to') }}</label>
        <input type="number" class="form-control" id="stays_to" v-model="staysTo">
      </div>
      <div class="col-sm-12 col-md-3 mt-2" v-if="shower.flights && !hideForm">
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
      <div class="col-sm-12 col-md-3 mt-2" v-if="shower.flights && !hideForm">
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
      <div class="col-sm-12 col-md-3 mt-2" v-if="(shower.trips || shower.hotels || shower.flights) && !hideForm">
        <label for="adults" class="form-label">{{ $t('main.adults') }}</label>
        <input type="number" class="form-control" id="adults" min="1" step="1" pattern="\d+" v-model="adults">
      </div>
      <div class="col-sm-12 col-md-3 mt-2" v-if="(shower.trips || shower.hotels || shower.flights) && !hideForm">
        <label for="children" class="form-label">{{ $t('main.children') }}</label>
        <input type="number" class="form-control" id="children" min="0" step="1" pattern="\d+" v-model="children">
      </div>
      <div class="col-sm-12 col-md-3 mt-2" v-if="(shower.trips || shower.hotels) && !hideForm">
        <label for="stars" class="form-label">{{ $t('main.stars') }}</label>
        <input type="number" class="form-control" id="stars" v-model="stars" min="0" max="5" step="1">
      </div>
      <div class="col-sm-12 col-md-3 mt-2" v-if="(shower.trips || shower.hotels) && !hideForm">
        <label for="rate" class="form-label">{{ $t('main.rate') }}</label>
        <input type="number" class="form-control" id="rate" v-model="rate" min="0" max="10" step="0.1">
      </div>
      <div class="col-sm-12 col-md-3 mt-2" v-if="(shower.trips || shower.hotels) && !hideForm">
        <label for="food" class="form-label">{{ $t('main.food') }}</label>
        <select class="form-control" id="food" v-model="food" multiple>
          <option v-bind:value="option" v-for="option in foodOptions">
            {{ option ? $t(foodStringToTranslate(option)) : "" }}
          </option>
        </select>
      </div>
      <div class="col-sm-12 col-md-3 mt-2" v-if="!hideForm">
        <div><label class="form-check-label" for="force">{{ $t('main.force_search') }}</label></div>
        <input type="checkbox" class="form-check-input" id="force" v-model="force" data-bs-toggle="tooltip"
               v-bind:title="$t('main.search_new_data')">
      </div>
      <div class="col-12 text-end" v-if="!hideForm">
        <button type="submit" class="btn btn-success" @click="search" v-bind:disabled="saveIsDisabled">
          {{ $t('main.search') }}
        </button>
      </div>
    </div>
  </div>
</template>
