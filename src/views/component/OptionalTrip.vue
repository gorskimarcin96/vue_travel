<script lang="ts">
import {defineComponent} from 'vue';
import type {PropType} from 'vue';
import {OptionalTrip as ModelOptionalTrip} from "@/models/OptionalTrip";
import Money from "@/views/component/Money.vue";

export default defineComponent({
  components: {Money},
  props: {
    optionalTrip: {
      type: Object as PropType<ModelOptionalTrip>,
      required: true
    },
    persons: {
      type: Number,
      required: true
    }
  }
});
</script>

<template>
  <div class="card text-white bg-dark mb-3 border-success">
    <div class="card-header border-success">
      <p class="card-title">
        <a v-bind:href="optionalTrip.url" target="_blank" class="me-2">
          {{ optionalTrip.title }}
        </a>
        <span class="badge bg-success">
          <money v-bind:money="optionalTrip" v-bind:persons="persons"/>
        </span>
        {{ ' - ' }}
        <span class="badge bg-black">
          <money v-bind:money="optionalTrip" v-bind:persons="persons" v-bind:showForOne="true"/>
          {{ $t('main.one_person') }}
        </span>
      </p>
    </div>
    <div class="card-body row">
      <div class="col-4">
        <img class="card-img-bottom" v-bind:src="optionalTrip.image" v-bind:alt="optionalTrip.title">
      </div>
      <div class="col-8">
        <ul class="list-group list-group-flush">
          <li v-for="description in optionalTrip.description" class="list-group-item  bg-dark text-white">
            {{ description }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
