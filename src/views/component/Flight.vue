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
    },
    persons: {
      type: Number,
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
      <th colspan="2">{{ $t('main.price') }}</th>
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
      <th>{{ $t('main.full_price') }}</th>
      <th>{{ $t('main.one_person') }}</th>
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
      <td>
        <span class="badge bg-success">
          <money :money="flight" v-bind:persons="persons"/>
        </span>
      </td>
      <td>
        <span class="badge bg-black">
          <money :money="flight" v-bind:persons="persons" v-bind:showForOne="true"/> {{ $t('main.one_person') }}
        </span>
      </td>
    </tr>
    </tbody>
  </table>
</template>
