
<template>
  <div class="root">
    <img ref="background" class="background" :src="props.background" />
    <img
      ref="foreground"
      class="foreground"
      :src="props.foreground"
    />
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
const props = defineProps({
  // Initial zoom level (percentage)
  background: {
    type: String,
    default: 'https://picsum.photos/1920/1080',
    validator: (value:number) => value >= 0 && value <= 5
  },
  foreground: {
    type: String,
    default: '/foreground.png',
    validator: (value:number) => value >= 0 && value <= 5
  },
  maxZoom: {
    type: Number,
    default: 10,
    validator: (value:number) => value >= 0 && value <= 200
  },
  refs:{ type: Array}
})
const foreground = ref(null)
const background = ref(null)
const first = ref(null)
const second = ref(null)

onMounted(() => {
  document.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  document.removeEventListener('scroll', handleScroll)
})

const handleScroll = (evt:Event) => {
  const scrollY = window.scrollY
  // ensure props.refs is an array and has at least one element
  if (!Array.isArray(props.refs) || props.refs.length === 0) return;
  // decreases as user scrolls
  const first = props.refs[0]
  const second = props.refs[1]
  if (!first?.value || !first?.value) return;
  first.value.style.opacity =
    getParallaxVisibilityPercent(first) / 100
  // increases as user scrolls
  if (!second?.value) return;
  second.value.style.opacity =
  getParallaxVisibilityPercent(first) / 100

  const maxBackgroundSize = 120
  const backgroundSize = scrollY / (maxBackgroundSize - 100) // increases as user scrolls

  // zoom the background at a slower rate
  if (background?.value) {
    background.value.style.transform =
      `scale(${  (100 + backgroundSize * 0.4) / 100  })`
  }
  if (foreground?.value) {
    foreground.value.style.transform =
      `scale(${  (100 + backgroundSize) / 100  })`
  }
}

function getParallaxVisibilityPercent(el) {
  if (!el) return 0;
  const rect = el.value.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const top = rect.top;
  const height = rect.height;
  // 0 cuando el top está en el borde inferior (aún no visible)
  // 1 cuando el bottom está en el borde superior (ya desapareció)
  const progress = (vh - top) / (vh + height);
  return Math.max(0, Math.min(1, progress)) * 100;
}
   
</script>

<style lang="css" scoped>

img.background,
img.foreground {
  /* Fill background */
  min-height: 100%;
  min-width: 1024px;

  /* Scale proportionately */
  width: 100%;
  height: auto;
}

img.background {
  /* Positioning */
  position: fixed;
  top: 0;
  left: 0;
}
.section {
  min-height: 100vh;
  position: relative;
}
.section > div {
  position: fixed;
  color: white;
  /* centers this div */
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.section-1 {
  margin-bottom: 500px; /* determines the gap between our two sections */
  font-size: 4em;
}

.section-2 {
  opacity: 0; /* defaults to 0 because it's not visible */
}

.section-2 div {
  background-color: rgba(255, 255, 255, 0.7);
  color: black;
  text-align: center;
  padding: 50px;
  max-width: 300px;
}

.section-2 h2 {
  font-size: 2em;
  margin-bottom: 40px;
}

.section-2 p {
  line-height: 150%;
}
</style>