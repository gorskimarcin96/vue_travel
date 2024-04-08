<script lang="ts">
import type {PropType} from 'vue';
import {defineComponent} from 'vue';
import type {MoneyInterface} from "@/models/MoneyInterface";

export default defineComponent({
  methods: {
    showPriceWithFormat() {
      const price = (this.money.priceForOnePerson ?
          (this.showForOne ? this.money.price : this.money.price * this.persons) :
          (this.showForOne ? this.money.price / this.persons : this.money.price));

      return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  },
  props: {
    money: {
      type: Object as PropType<MoneyInterface>,
      required: true
    },
    persons: {
      type: Number,
      default: 1,
      required: false
    },
    showForOne: {
      type: Boolean,
      default: false,
      required: false
    }
  }
},);
</script>

<template>
  {{ showPriceWithFormat() }} {{ money.currency }}
</template>
