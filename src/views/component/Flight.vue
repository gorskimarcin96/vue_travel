<script lang="ts">
import {defineComponent} from 'vue';
import type {PropType} from 'vue';
import Money from "@/views/component/Money.vue";
import {Flight as FlightModel} from "@/models/Flight";
import {fromStringToDateTimeString} from "@/helper/parser/datetime";

export default defineComponent({
  computed: {
    Money() {
      return Money
    }
  },
  components: {Money},
  props: {
    flights: {
      type: Array as PropType<FlightModel[]>,
      required: true
    }
  },
  methods: {
    parseDateTime: function (input: string) {
      return fromStringToDateTimeString(input);
    },
  }
});
</script>

<template>
  <table class="table table-dark">
    <thead>
    <tr>
      <th colspan="4">{{ $t('main.from') }}</th>
      <th colspan="4">{{ $t('main.to') }}</th>
      <th>{{ $t('main.price') }}</th>
    </tr>
    <tr>
      <th>{{ $t('main.airport') }}</th>
      <th>{{ $t('main.start') }}</th>
      <th>{{ $t('main.end') }}</th>
      <th>{{ $t('main.stops') }}</th>
      <th>{{ $t('main.airport') }}</th>
      <th>{{ $t('main.start') }}</th>
      <th>{{ $t('main.end') }}</th>
      <th>{{ $t('main.stops') }}</th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="flight in flights">
      <td>{{ flight.fromAirport }}</td>
      <td>{{ parseDateTime(flight.fromStart) }}</td>
      <td>{{ parseDateTime(flight.fromEnd) }}</td>
      <td>{{ flight.fromStops }}</td>
      <td>{{ flight.toAirport }}</td>
      <td>{{ parseDateTime(flight.toStart) }}</td>
      <td>{{ parseDateTime(flight.toEnd) }}</td>
      <td>{{ flight.toStops }}</td>
      <td><money :money="flight.money"/></td>
    </tr>
    </tbody>
  </table>
</template>
