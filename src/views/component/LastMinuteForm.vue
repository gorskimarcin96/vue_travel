<script lang="ts">
import {defineComponent, type PropType} from 'vue';
import {FlyCode} from "@/models/FlyCode";
import flyCodesJson from "@/data/fly_codes.json";
import {fromStringToDateString} from "@/helper/parser/datetime";
import {foodStringToTranslate} from "@/helper/foodTranslate";
import {LastMinuteInput} from "@/models/LastMinuteInput";

const flyCodes = flyCodesJson.map(flyCode => new FlyCode(flyCode.code, flyCode.city, flyCode.nation))

export default defineComponent({
  props: {
    timer: {
      type: Object as PropType<Date>,
      required: false
    },
  },
  data: function () {
    return {
      fromAirport: '',
      fromAirportSuggestions: [] as FlyCode[],
      from: null,
      to: null,
      staysFrom: 7 as null | number,
      staysTo: 30 as null | number,
      stars: 4 as null | number,
      rate: 7.5 as null | number,
      adults: 2 as null | number,
      children: 0 as null | number,
      food: ['all-inclusive'] as string[],
      force: false,
      foodOptions: [null, 'all-inclusive', 'breakfast, launch and dinner', 'breakfast and dinner', 'breakfast', 'without food']
    }
  },
  methods: {
    foodStringToTranslate,
    search: function () {
      this.$emit('request', new LastMinuteInput(
          this.from,
          this.to,
          this.fromAirport,
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
    selectFromAirport: function (code: string) {
      const selected = flyCodes.filter((row) => row.code === code)[0];
      this.fromAirport = `${selected.code} - ${selected.city} ${selected.nation}`;
      this.fromAirportSuggestions = [];
    },
    clearFromAirport: function () {
      this.fromAirport = '';
    },
    escapeFromAirport: function () {
      setTimeout(() => {
        if (this.fromAirportSuggestions.length) {
          this.selectFromAirport(this.fromAirportSuggestions[0].code)
        }
      }, 2000)
    },
  },
  created() {
    this.selectFromAirport('LUZ');
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
    <div class="row border border-success rounded mb-3 p-3 text-white" v-on:keyup.enter="search">
      <div class="col-12">{{ $t('main.searcher') }}</div>
      <div class="col-sm-12 col-md-3 mt-2">
        <label for="from" class="form-label">{{ $t('main.from') }}</label>
        <input type="date" class="form-control" id="from" v-model="from">
      </div>
      <div class="col-sm-12 col-md-3 mt-2">
        <label for="to" class="form-label">{{ $t('main.to') }}</label>
        <input type="date" class="form-control" id="to" v-model="to">
      </div>
      <div class="col-sm-12 col-md-3 mt-2">
        <label for="stays_from" class="form-label">{{ $t('main.stays_from') }}</label>
        <input type="number" class="form-control" id="stays_from" v-model="staysFrom">
      </div>
      <div class="col-sm-12 col-md-3 mt-2">
        <label for="stays_to" class="form-label">{{ $t('main.stays_to') }}</label>
        <input type="number" class="form-control" id="stays_to" v-model="staysTo">
      </div>
      <div class="col-sm-12 col-md-3 mt-2">
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
      <div class="col-sm-12 col-md-3 mt-2">
        <label for="adults" class="form-label">{{ $t('main.adults') }}</label>
        <input type="number" class="form-control" id="adults" min="1" step="1" pattern="\d+" v-model="adults">
      </div>
      <div class="col-sm-12 col-md-3 mt-2">
        <label for="children" class="form-label">{{ $t('main.children') }}</label>
        <input type="number" class="form-control" id="children" min="0" step="1" pattern="\d+" v-model="children">
      </div>
      <div class="col-sm-12 col-md-3 mt-2">
        <label for="stars" class="form-label">{{ $t('main.stars') }}</label>
        <input type="number" class="form-control" id="stars" v-model="stars" min="0" max="5" step="1">
      </div>
      <div class="col-sm-12 col-md-3 mt-2">
        <label for="rate" class="form-label">{{ $t('main.rate') }}</label>
        <input type="number" class="form-control" id="rate" v-model="rate" min="0" max="10" step="0.1">
      </div>
      <div class="col-sm-12 col-md-3 mt-2">
        <label for="food" class="form-label">{{ $t('main.food') }}</label>
        <select class="form-control" id="food" v-model="food" multiple>
          <option v-bind:value="option" v-for="option in foodOptions">
            {{ option ? $t(foodStringToTranslate(option)) : "" }}
          </option>
        </select>
      </div>
      <div class="col-sm-12 col-md-3 mt-2">
        <div><label class="form-check-label" for="force">{{ $t('main.force_search') }}</label></div>
        <input type="checkbox" class="form-check-input" id="force" v-model="force" data-bs-toggle="tooltip"
               v-bind:title="$t('main.search_new_data')">
      </div>
      <div class="col-12 text-end">
        <button type="submit" class="btn btn-success" @click="search">
          {{ $t('main.search') }}
        </button>
      </div>
    </div>
  </div>
</template>
