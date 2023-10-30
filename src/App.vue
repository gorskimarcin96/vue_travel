<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <header class="mt-3 border-success">
    <nav class="nav nav-tabs border-success container px-3">
      <RouterLink class="btn border-bottom-0 rounded-bottom-0 mx-1 border-success text-success" to="/searcher">
        Searcher
      </RouterLink>
      <RouterLink class="btn border-bottom-0 rounded-bottom-0 mx-1 border-success text-success" to="/searcher/history">
        Searcher history
      </RouterLink>
    </nav>
  </header>

  <main class="py-3">
    <RouterView/>
  </main>
</template>
