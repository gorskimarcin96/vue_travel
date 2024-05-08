<script lang="ts">
import {defineComponent} from 'vue';
import type {PropType} from 'vue';
import {fromStringToDateString, fromStringToDateTimeString} from "@/helper/parser/datetime";
import type {SearchEntityInterface} from "@/models/SearchEntityInterface";
import {parseNamespace} from "../../helper/parser/namespace";

export default defineComponent({
  props: {
    rows: {
      type: Array as PropType<SearchEntityInterface[]>,
      required: true
    },
    isLoaded: {
      type: Boolean,
      required: true
    },
    routeName: {
      type: String,
      required: true
    },
  },
  methods: {
    fromStringToDateString,
    fromStringToDateTimeString,
    parseNamespace,
  }
});
</script>

<style>
.w-100px {
  width: 100px
}
</style>

<template>
  <table class="table table-dark mb-0 rounded">
    <thead>
    <tr>
      <th>{{ $t('main.from') }}</th>
      <th>{{ $t('main.to') }}</th>
      <th>{{ $t('main.adults') }}</th>
      <th>{{ $t('main.children') }}</th>
      <th>{{ $t('main.errors') }}</th>
      <th>{{ $t('main.downloaded') }}</th>
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
    <tr v-for="row in rows">
      <td class="w-100px">{{ row.from?.length ? fromStringToDateString(row.from) : '' }}</td>
      <td class="w-100px">{{ row.to?.length ? fromStringToDateString(row.to) : '' }}</td>
      <td>{{ row.adults }}</td>
      <td>{{ row.children }}</td>
      <td>
        <div class="card bg-danger text-light mb-2" v-for="searchError in row.errors">
          <div class="card-header">{{ searchError.service }}</div>
          <div class="card-body">
            <p v-for="error in searchError.errors" class="card-text">{{ error }}</p>
          </div>
        </div>
        <div v-if="!row.errors.length">
          <span class="badge bg-success">{{ $t('main.empty') }}</span>
        </div>
      </td>
      <td>
        <span v-if="row.finished" class="badge bg-success">{{ $t('main.yes') }}</span>
        <span v-else class="badge bg-danger">{{ $t('main.no') }}</span>
      </td>
      <td>
        <span class="badge bg-light text-dark ms-1" v-for="counter in row.countServices">
          {{ parseNamespace(counter.service) }} {{ counter.count }}
        </span>
      </td>
      <td class="w-100px">{{ fromStringToDateTimeString(row.createdAt) }}</td>
      <td>
        <RouterLink :key="routeName+row.id" :to="'/'+routeName+'/' + row.id">{{ $t('main.show') }}</RouterLink>
      </td>
    </tr>
    </tbody>
  </table>
</template>
