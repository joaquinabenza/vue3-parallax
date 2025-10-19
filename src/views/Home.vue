<template>
  <div class="page">
<section>
  <h1>Vue3 Parallax DEMO</h1>
  <div class="cards-container container mb-5">
    <RouterLink to="/parallax-controller">
      <ParallaxCard
        data-image="https://picsum.photos/1920/1080">
        <template v-slot:header>
          <h1>Parallax Controller</h1>
        </template>
        <template v-slot:content>
          <p>Package Wraping for Vue</p>
        </template>
      </ParallaxCard>
    </RouterLink>

    <RouterLink to="/background">
      <ParallaxCard
        data-image="https://picsum.photos/1920/1080">
        <template v-slot:header>
          <h1>Parallax Bg</h1>
        </template>
        <template v-slot:content>
          <p>Simple background parallax</p>
        </template>
      </ParallaxCard>
    </RouterLink>

    <RouterLink to="/zoom">
      <ParallaxCard
        data-image="https://picsum.photos/1920/1080">
        <template v-slot:header>
          <h1>Parallax Zoom</h1>
        </template>
        <template v-slot:content>
          <p>Template your different landing</p>
        </template>
      </ParallaxCard>
    </RouterLink>

    <RouterLink to="/cards">
      <ParallaxCard
        data-image="https://picsum.photos/1920/1080">
        <template v-slot:header>
          <h1>Parallax Card</h1>
        </template>
        <template v-slot:content>
          <p>Awesome card effects</p>
        </template>
      </ParallaxCard>
    </RouterLink>
  </div>
</section>  
</div>
</template>

<script lang="ts" setup>
import ParallaxCard from '../Vue3ParallaxPlugin/components/ParallaxCard.vue';
import ParallaxBackground from '../Vue3ParallaxPlugin/components/ParallaxBackground.vue'
</script>