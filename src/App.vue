<template>
  <div class="app">
    <header>
      <nav>
        <RouterLink to="/">Home</RouterLink> 
        <RouterLink to="/parallax-controller">Parallax Controller</RouterLink> 
        <RouterLink to="/zoom">Zoom</RouterLink> 
        <RouterLink to="/cards">Cards</RouterLink>
      </nav>
    </header>
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">

</script>



<style lang="scss">
@import url(./assets/style.css);
</style>
