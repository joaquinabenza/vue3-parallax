<template>
  <div class="page">
<section>
  <h1 class="title">Hover over the cards</h1>
  <div class="container">
    <ParallaxCard
      data-image="https://images.unsplash.com/photo-1479660656269-197ebb83b540?dpr=2&auto=compress,format&fit=crop&w=1199&h=798&q=80&cs=tinysrgb&crop=">
      <template v-slot:header>
        <h1>Canyons</h1>
      </template>
      <template v-slot:content>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </template>
    </ParallaxCard>
    <ParallaxCard
      data-image="https://images.unsplash.com/photo-1479659929431-4342107adfc1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=">
      <template v-slot:header>
        <h1>Beaches</h1>
      </template>
      <template v-slot:content>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </template>
    </ParallaxCard>
    <ParallaxCard
      data-image="https://images.unsplash.com/photo-1479644025832-60dabb8be2a1?dpr=2&auto=compress,format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=">
      <template v-slot:header>
        <h1>Trees</h1>
      </template>
      <template v-slot:content>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </template>
    </ParallaxCard>
    <ParallaxCard
      data-image="https://images.unsplash.com/photo-1479621051492-5a6f9bd9e51a?dpr=2&auto=compress,format&fit=crop&w=1199&h=811&q=80&cs=tinysrgb&crop=">
      <template v-slot:header>
        <h1>Lakes</h1>
      </template>
      <template v-slot:content>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
      </template>
    </ParallaxCard>
  </div>
</section>  
</div>
</template>

<script setup lang="ts">
import ParallaxCard from '../Vue3ParallaxPlugin/components/ParallaxCard.vue'
</script>

<style scoped lang="scss">



</style>