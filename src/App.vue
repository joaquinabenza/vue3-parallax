<script setup lang="ts">
import ParallaxBackground from './myPackagePlugin/components/ParallaxBackground.vue'
</script>

<template>
  <div class="demo">
    <h1>Vue3 Parallax DEMO</h1>
    <h2>Basic Usage</h2>
    <ParallaxBackground
      background-image="https://picsum.photos/1920/1080"
      speed="7"
      direction="down"
    >
      <div class="hero-content">
        <h1>Welcome to My Site</h1>
        <p>This content scrolls normally while the background moves at a different speed</p>
      </div>
    </ParallaxBackground>

    <h2>Advanced Usage</h2>
      <ParallaxBackground
      background-image="https://picsum.photos/1920/1080"
      speed="7"
      direction="up"
      background-size="cover"
      min-offset="-200"
      max-offset="200"
    >
      <div class="content">
        <h1>Advanced Parallax</h1>
        <p>Customized background with specific movement parameters</p>
      </div>
    </ParallaxBackground>

    <h2>Gradient Background</h2>
    <ParallaxBackground
    background-color="linear-gradient(45deg, #667eea, #764ba2)"
    speed="0.3"
    direction="left"
  >
    <div class="gradient-content">
      <h3>Gradient Background</h3>
      <p>No image needed - works with CSS gradients too!</p>
    </div>
  </ParallaxBackground>

  </div>
</template>

<style scoped>
.app {
  height: 200vh; /* Make page scrollable */
}

.hero-content {
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 2rem;
}
</style>
