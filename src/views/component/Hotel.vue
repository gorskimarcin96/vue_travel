<script lang="ts">
import {defineComponent} from 'vue';
import type {PropType} from 'vue';
import Money from "@/views/component/Money.vue";
import {Hotel as HotelModel} from "@/models/Hotel";
import {Money as MoneyModel} from "@/models/Money";

export default defineComponent({
  computed: {
    Money() {
      return Money
    }
  },
  components: {Money},
  props: {
    hotel: {
      type: Object as PropType<HotelModel>,
      required: true
    },
    nightNumber: {
      type: Number,
      required: true
    }
  },
  methods: {
    getMainPrice() {
      return new MoneyModel(this.hotel.money.price * this.nightNumber, this.hotel.money.currency);
    },
  }
});
</script>

<template>
  <div class="card text-white bg-dark mb-3 border-success">
    <div class="card-header border-success">
      <p class="card-title">
        <a v-bind:href="hotel.url" target="_blank" class="me-2">
          {{ hotel.title }}
        </a>
      </p>
    </div>
    <div class="card-body row">
      <div class="col-4">
        <img class="card-img-bottom" v-bind:src="hotel.image" v-bind:alt="hotel.title">
      </div>
      <div class="col-8">
        <div class="my-1">
          {{ $t('main.price') }}:
          <money v-bind:money="getMainPrice()" v-bind:cssClass="'text-success fw-bolder'"/>
        </div>
        <div class="my-1">
          {{ $t('main.price_for_night') }}:
          <money v-bind:money="hotel.money" v-bind:cssClass="'text-success fw-bolder'"/>
        </div>
        <div class="my-1" v-if="hotel.rate">
          {{ $t('main.rate') }}:
          <span class="text-success fw-bolder">{{ hotel.rate }}</span>
        </div>
        <div class="my-1">
          {{ $t('main.details') }}:
          <ul>
            <li v-for="description in hotel.descriptions">{{ description }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
