<script lang="ts">
import {defineComponent} from 'vue';
import type {PropType} from 'vue';
import {Money} from "@/models/Money";
import {OptionalTrip as ModelOptionalTrip} from "@/models/OptionalTrip";

export default defineComponent({
  props: {
    money: {
      type: Object as PropType<Money>,
      required: true
    }
  }
});
</script>

<template>
  <span class="badge bg-success">{{ money.price }} {{ money.currency }}</span>
</template>
