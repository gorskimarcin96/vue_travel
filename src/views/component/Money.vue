<script lang="ts">
import {defineComponent} from 'vue';
import {Money} from "@/models/Money";

export default defineComponent({props: {money: Money}});
</script>

<template>
  <span class="badge bg-success">{{ money.price }} {{ money.currency }}</span>
</template>
