<script lang="ts">
import {defineComponent} from 'vue';
import type {PropType} from 'vue';
import {
  fromStringToDayAndMonthString,
} from "@/parser/datetime";
import type {Weather} from "@/models/Weather";

export default defineComponent({
  props: {
    weathers: {
      type: Array as PropType<Weather[]>,
      required: true
    }
  },
  data: function () {
    return {
      min: 0,
      max: 0,
    }
  },
  methods: {
    parseDayAndMonth: function (input: string) {
      return fromStringToDayAndMonthString(input);
    },
    range: function (start: number, end: number): number {
      return new Array(end - start).fill().map((d, i) => i + start);
    }
  },
  created() {
    this.min = new Date(Math.min(...(this.weathers.map((weather: Weather) => Date.parse(weather.date))))).getFullYear();
    this.max = new Date(Math.max(...(this.weathers.map((weather: Weather) => Date.parse(weather.date))))).getFullYear();
  }
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-3 m-0 p-0" v-for="year in range(min,max)">
        <table class="table table-dark table-striped m-0">
          <thead>
          <tr>
            <th class="table-light text-center">{{ year }}</th>
            <th>{{ $t('main.temperature') }}</th>
            <th>{{ $t('main.precipitation') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="weather in weathers.filter((weather: Weather) => new Date(Date.parse(weather.date)).getFullYear() === year)">
            <td class="table-light text-center">{{ parseDayAndMonth(weather.date) }}</td>
            <td :class="{ 'text-warning': weather.temperature2mMean >= 20 && weather.temperature2mMean <= 30, 'text-danger': weather.temperature2mMean > 30 }">
              {{ weather.temperature2mMean }}°C
            </td>
            <td>
              {{ weather.precipitationHours }}h
              <span class="badge bg-primary rounded-pill float-end" v-if="weather.precipitationSum">
                {{ weather.precipitationSum }}mm
              </span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
