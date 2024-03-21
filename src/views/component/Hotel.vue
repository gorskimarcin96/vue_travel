<script lang="ts">
import {defineComponent} from 'vue';
import type {PropType} from 'vue';
import Money from "@/views/component/Money.vue";
import {Hotel as HotelModel} from "@/models/Hotel";
import {Money as MoneyModel} from "@/models/Money";
import {foodStringToTranslate} from "@/helper/foodTranslate";
import {fromStringToDateString} from "@/helper/parser/datetime";

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
  },
  methods: {
    fromStringToDateString,
    foodStringToTranslate,
    getMainPrice() {
      return new MoneyModel(Math.round(this.hotel.money.price * this.getNightNumber() * 100) / 100, this.hotel.money.currency);
    },
    getNightNumber(): number {
      return Math.floor((new Date(this.hotel.to) - new Date(this.hotel.from)) / (24 * 3600 * 1000)) - 1;
    }
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
        <div class="my-1">
          {{ $t('main.interval') }}:
          <span class="text-success fw-bolder">{{ fromStringToDateString(hotel.from) }}</span>
          {{ ' - ' }}
          <span class="text-success fw-bolder">{{ fromStringToDateString(hotel.to) }}</span>
          ({{ getNightNumber()}} {{ $t('main.nights')}})
        </div>
        <div class="my-1" v-if="hotel.stars">
          {{ $t('main.hotel') }}:
          <span v-for="i in Array(hotel.stars)">⭐</span>
        </div>
        <div class="my-1" v-if="hotel.rate">
          {{ $t('main.rate') }}:
          <span class="text-success fw-bolder">{{ hotel.rate }}</span>
        </div>
        <div class="my-1">
          {{ $t('main.food') }}:
          <span class="text-success fw-bolder">{{ $t(foodStringToTranslate(hotel.food)) }}</span>
        </div>
        <div class="my-1" v-if="hotel.descriptions.length">
          {{ $t('main.details') }}:
          <ul>
            <li v-for="description in hotel.descriptions">{{ description }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
