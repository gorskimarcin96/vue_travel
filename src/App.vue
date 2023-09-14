<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <header class="mt-3 border-success">
    <nav class="nav nav-tabs border-success container px-3">
      <RouterLink class="nav-link active btn bg-success border-success text-white rounded-bottom-0" to="/searcher">
        Searcher
      </RouterLink>
    </nav>
  </header>

  <main class="py-3">
    <RouterView/>
  </main>
</template>
