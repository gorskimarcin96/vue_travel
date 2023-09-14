<script lang="ts">
import {defineComponent} from 'vue';
import {PageTrip} from "@/models/PageTrip";

export default defineComponent({props: {pageTrip: PageTrip}});
</script>

<template>
  <div class="card text-white bg-dark mb-3 border-success">
    <div class="card-header border-success">
      <a v-bind:href="pageTrip.url" target="_blank" class="card-title" v-bind:id="pageTrip.url">
        {{ pageTrip.url }}
      </a>
    </div>
    <div class="card-body" v-for="tripArticle in pageTrip.tripArticles">
      <div v-if="tripArticle.images.length > 1 || tripArticle.images.length === 0" class="row">
        <div class="row">
          <div class="col-12">
            <h5 class="card-title">{{ tripArticle.title }}</h5>
            <ul>
              <li v-for="description in tripArticle.descriptions">
                {{ description }}
              </li>
            </ul>
          </div>
          <img class="col-4 m-0 p-0" v-bind:src="image" v-for="image in tripArticle.images"/>
        </div>
      </div>

      <div class="row" v-else>
        <div class="col-4">
          <img class="w-100" v-bind:src="tripArticle.images[0]">
        </div>
        <div class="col-8">
          <h5 class="card-title">{{ tripArticle.title }}</h5>
          <ul>
            <li v-for="description in tripArticle.descriptions">
              {{ description }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="card-body" v-if="pageTrip.map">
      <iframe v-bind:src="pageTrip.map" allowfullscreen="" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade" class="w-100" height="500"/>
      <a v-bind:href="pageTrip.map">map</a>
    </div>
  </div>
</template>
