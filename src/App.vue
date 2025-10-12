<script setup lang="ts">

</script>

<template>
  <div class="app">
    <base-transition>
      <router-view /> 
    </base-transition>

  </div>
</template>

<style scoped>
@import url(./assets/style.css);
.app {
  height: 200vh;
  /* Make page scrollable */
}



</style>
