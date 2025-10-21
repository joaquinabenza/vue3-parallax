<template>
  <div class="page-full">
    <h1 class="title">Parallax Background Examples</h1>
    <h2>Basic Usage</h2>
    <ParallaxBackground :backgroundImage="'https://joaquinabenza.github.io/vue3-parallax/live-demo/723-1920x1080.jpg'" :speed="2" direction="down"
      backgroundPosition="top">
      <div class="hero-content">
        <h1>Welcome to My Site</h1>
        <p>This content scrolls normally while the background moves at a different speed</p>
      </div>
    </ParallaxBackground>
    <h2>Advanced Usage</h2>
    <ParallaxBackground :backgroundImage="'https://joaquinabenza.github.io/vue3-parallax/live-demo/615-1920x1080.jpg'" :speed="3" direction="up"
      background-size="cover" :min-offset="-200" :max-offset="200">
      <div class="hero-content">
        <h1>Advanced Parallax</h1>
        <p>Customized background with specific movement parameters</p>
      </div>
    </ParallaxBackground>
    <h3>Different direction</h3>
    <ParallaxBackground :backgroundImage="'https://joaquinabenza.github.io/vue3-parallax/live-demo/645-1920x1080.jpg'" :speed="3" direction="down"
      background-size="cover" :min-offset="-200" :max-offset="200">
      <div class="hero-content">
        <h1>Advanced Parallax</h1>
        <p>Customized background with specific movement parameters</p>
      </div>
    </ParallaxBackground>
    <h2>Gradient Background</h2>
    <ParallaxBackground :backgroundColor="'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)'" :speed="1.3" direction="left">
      <div class="hero-content">
        <h3>Gradient Background</h3>
        <p>No image needed - works with any Html Element!</p>
      </div>
    </ParallaxBackground>
  </div>  
</template>

<script lang="ts" setup>
import ParallaxBackground from '../Vue3ParallaxPlugin/components/ParallaxBackground.vue'
</script>