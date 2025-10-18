<template>
  <h2>Basic Usage</h2>
  <ParallaxBackground background-image="https://picsum.photos/1920/1080" :speed="2" direction="down"
    backgroundPosition="top">
    <div class="hero-content">
      <h1>Welcome to My Site</h1>
      <p>This content scrolls normally while the background moves at a different speed</p>
    </div>
  </ParallaxBackground>
  <h2>Advanced Usage</h2>
  <ParallaxBackground background-image="https://picsum.photos/1920/1080" :speed="3" direction="up"
    background-size="cover" :min-offset="-200" :max-offset="200">
    <div class="content">
      <h1>Advanced Parallax</h1>
      <p>Customized background with specific movement parameters</p>
    </div>
  </ParallaxBackground>
  <h2>Gradient Background</h2>
  <ParallaxBackground backgroundColor="linear-gradient(45deg, #667eea, #764ba2)" :speed="1.3" direction="left">
    <div class="hero-content">
      <h3>Gradient Background</h3>
      <p>No image needed - works with any Html Element!</p>
    </div>
  </ParallaxBackground>
</template>