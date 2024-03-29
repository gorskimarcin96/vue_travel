<script lang="ts">
import {defineComponent} from 'vue';
import travel from "@/api/travel";
import type {Search} from "@/models/Search";
import {RouterLink} from "vue-router";
import {fromStringToDateString, fromStringToDateTimeString} from "@/helper/parser/datetime";
import {parseNamespace} from "@/helper/parser/namespace";

export default defineComponent({
  components: {RouterLink},
  data: function () {
    return {
      isLoaded: false,
      searches: [] as Search[]
    }
  },
  methods: {
    fromStringToDateString,
    fromStringToDateTimeString,
    parseNamespace
  },
  async created() {
    this.searches = await travel.getSearches();
    this.isLoaded = true;
  },
});
</script>

<style>
.max-width-200px {
  max-width: 200px;
}

.w-100px {
  width: 100px
}

.w-170px {
  width: 170px
}
</style>

<template>
  <div class="container border border-success rounded mb-3 p-1 text-white bg-dark">
    <table class="table table-dark mb-0 rounded">
      <thead>
      <tr>
        <th>{{ $t('main.nation') }}</th>
        <th>{{ $t('main.place') }}</th>
        <th class="w-100px">{{ $t('main.from') }}</th>
        <th class="w-100px">{{ $t('main.to') }}</th>
        <th>{{ $t('main.adults') }}</th>
        <th>{{ $t('main.children') }}</th>
        <th>{{ $t('main.errors') }}</th>
        <th>{{ $t('main.searching_finished') }}</th>
        <th>{{ $t('main.services') }}</th>
        <th class="w-170px">{{ $t('main.created_at') }}</th>
        <th>{{ $t('main.actions') }}</th>
      </tr>
      </thead>
      <tbody v-if="!isLoaded">
      <tr>
        <td colspan="11" class="text-center">
          <div class="spinner-border m-2" role="status"></div>
        </td>
      </tr>
      </tbody>
      <tbody v-else>
      <tr v-for="search in searches">
        <td>{{ search.nation }}</td>
        <td>{{ search.place }}</td>
        <td>{{ fromStringToDateString(search.from) }}</td>
        <td>{{ fromStringToDateString(search.to) }}</td>
        <td>{{ search.adults }}</td>
        <td>{{ search.children }}</td>
        <td>
          <div class="card bg-danger text-light mb-2 max-width-200px" v-for="searchError in search.errors">
            <div class="card-header">{{ searchError.service }}</div>
            <div class="card-body">
              <p v-for="error in searchError.errors" class="card-text">{{ error }}</p>
            </div>
          </div>
        </td>
        <td>
          <span v-if="search.finished" class="badge bg-success">{{ $t('main.yes') }}</span>
          <span v-else class="badge bg-danger">{{ $t('main.no') }}</span>
        </td>
        <td>
            <span class="badge bg-light text-dark ms-1" v-for="counter in search.countServices">
              {{ parseNamespace(counter.service) }} {{ counter.count }}
            </span>
        </td>
        <td>{{ fromStringToDateTimeString(search.createdAt) }}</td>
        <td>
          <RouterLink :key="'search'+search.id" :to="'/searcher/' + search.id">{{ $t('main.show') }}</RouterLink>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
