<script lang="ts">
import {defineComponent} from 'vue';
import travel from "@/api/travel";
import type {Search} from "@/models/Search";
import {RouterLink} from "vue-router";
import {fromStringToDateTimeString} from "@/parser/datetime";
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
        <th>Nation</th>
        <th>Place</th>
        <th>Errors</th>
        <th>Completed</th>
        <th>Services</th>
        <th>Created at</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody v-if="!isLoaded">
      <tr>
        <td colspan="7" class="text-center">
          <div class="spinner-border m-2" role="status"></div>
        </td>
      </tr>
      </tbody>
      <tbody v-else>
      <tr v-for="search in searches">
        <td>{{ search.nation }}</td>
        <td>{{ search.place }}</td>
        <td>
          <div v-for="searchError in search.errors">
            <p>{{ parseNamespace(searchError.service) }}</p>
            <ol class="text-light">
              <li v-for="error in searchError.errors">{{ error }}</li>
            </ol>
          </div>
        </td>
        <td>
          <span v-if="search.finished" class="badge bg-success">Yes</span>
          <span v-else class="badge bg-danger">No</span>
        </td>
        <td>
            <span class="badge bg-light text-dark ms-1" v-for="counter in search.countServices">
              {{ parseNamespace(counter.service) }} {{ counter.count }}
            </span>
        </td>
        <td>{{ parseDateTime(search.createdAt) }}</td>
        <td>
          <RouterLink :to="'/searcher/' + search.id">Show</RouterLink>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
