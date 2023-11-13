<script lang="ts">
import {defineComponent} from 'vue';
import travel from "@/api/travel";
import type {Search} from "@/models/Search";
import {RouterLink} from "vue-router";
import {fromStringToDateString, fromStringToDateTimeString} from "@/parser/datetime";
import {fromString} from "@/parser/namespace";

export default defineComponent({
  components: {RouterLink},
  data: function () {
    return {
      isLoaded: false,
      searches: [] as Search[]
    }
  },
  methods: {
    parseDate: function (input: string) {
      return fromStringToDateString(input);
    },
    parseDateTime: function (input: string) {
      return fromStringToDateTimeString(input);
    },
    parseNamespace: function (input: string): string {
      return fromString(input);
    },
  },
  async created() {
    this.searches = await travel.getSearches();
    this.isLoaded = true;
  },
});
</script>

<template>
  <div class="container border border-success rounded mb-3 p-3 text-white">
    <table class="table table-dark mb-0">
      <thead>
      <tr>
        <th>{{ $t('main.nation') }}</th>
        <th>{{ $t('main.place') }}</th>
        <th>{{ $t('main.from') }}</th>
        <th>{{ $t('main.to') }}</th>
        <th>{{ $t('main.adults') }}</th>
        <th>{{ $t('main.children') }}</th>
        <th>{{ $t('main.errors') }}</th>
        <th>{{ $t('main.searching_finished') }}</th>
        <th>{{ $t('main.services') }}</th>
        <th>{{ $t('main.created_at') }}</th>
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
        <td class="w-100px">{{ parseDate(search.from) }}</td>
        <td class="w-100px">{{ parseDate(search.to) }}</td>
        <td>{{ search.adults }}</td>
        <td>{{ search.children }}</td>
        <td>
          <div v-for="searchError in search.errors">
            <p>{{ parseNamespace(searchError.service) }}</p>
            <ol class="text-light">
              <li v-for="error in searchError.errors">{{ error }}</li>
            </ol>
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
        <td class="w-170px">{{ parseDateTime(search.createdAt) }}</td>
        <td>
          <RouterLink :to="'/searcher/' + search.id">{{ $t('main.show') }}</RouterLink>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.w-100px {
  width: 100px
}

.w-170px {
  width: 170px
}
</style>