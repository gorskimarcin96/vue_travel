<script lang="ts">
import {defineComponent} from 'vue';
import type {PropType} from 'vue';
import {Money} from "@/models/Money";

export default defineComponent({
  props: {
    money: {
      type: Object as PropType<Money>,
      required: true
    },
    cssClass: {
      type: String,
      default: "badge bg-success",
      required: false
    },
  }
});
</script>

<template>
  <span v-bind:class="cssClass">{{ money.price }} {{ money.currency }}</span>
</template>
