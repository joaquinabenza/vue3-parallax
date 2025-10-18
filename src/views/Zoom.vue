<template>
  <ParallaxZoom :refs="refs">    
    <div ref="first" class="section section-1 glass">
      <div>
        <h1>Parallax Zoom.</h1>
      </div>
    </div>
    <div ref="second" class="section section-2">
      <div>
        <h2>Here's more info</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit...</p>
      </div>
    </div>
  </ParallaxZoom>
</template>

<script lang="ts" setup>
import ParallaxZoom from '../Vue3ParallaxPlugin/components/ParallaxZoom.vue'
import { ref } from 'vue'
const first = ref(null)
const second = ref(null)
const refs = [
  first,
  second
]
</script>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.section {
  padding : 100px 20px;
  height: 100vh;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: white;
}

</style>