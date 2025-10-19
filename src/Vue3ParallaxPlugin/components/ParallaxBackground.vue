<template>
  <div class="parallax-container" ref="containerRef">
    <slot name="background" class="parallax-background">
    <div
      class="parallax-background"
      ref="backgroundRef"
    ></div>
    </slot>
    <div class="parallax-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  // Background image URL
  backgroundImage: {
    type: String,
    default: ''
  },
  // Background color (used if no image)
  backgroundColor: {
    type: String,
    default: 'transparent'
  },
  //Height of the parallax container
  height: {
    type: String,
    default: '600px'
  },
  // Parallax speed (0 = no movement, 1 = normal, 2 = double speed)
  speed: {
    type: Number,
    default: 0.5,
    validator: (value:number) => value >= 0 && value <= 2
  },
  // Parallax direction ('up', 'down', 'left', 'right')
  direction: {
    type: String,
    default: 'up',
    validator: (value:string) => ['up', 'down', 'left', 'right'].includes(value)
  },
  // Minimum parallax offset (in pixels)
  minOffset: {
    type: Number,
    default: 0
  },
  // Maximum parallax offset (in pixels)
  maxOffset: {
    type: Number,
    default: 100
  },
  // Background size
  backgroundSize: {
    type: String,
    default: 'cover'
  },
  // Background position (when not parallaxing)
  backgroundPosition: {
    type: String,
    default: 'center'
  },
  // Enable/disable parallax effect
  enabled: {
    type: Boolean,
    default: true
  }
})

// Refs
const containerRef = ref<HTMLElement | null>(null)
const backgroundRef = ref<HTMLElement | null>(null)
const heightStyle = ref(props.height)

const backgroundImage = ref(props.backgroundImage ? `url(${props.backgroundImage})` : 'none')
const backgroundColor = ref(props.backgroundColor)
const backgroundSize = ref(props.backgroundSize)
const backgroundPosition = ref(props.backgroundPosition)
// Computed background style


// Parallax effect
let scrollListener:any = null

const updateParallax = () => {
  if (!props.enabled || !containerRef.value || !backgroundRef.value) return

  const containerRect = containerRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight
  const containerTop = containerRect.top
  const containerHeight = containerRect.height

  // Calculate scroll progress (0 to 1)
  //const scrollProgress = Math.max(0, Math.min(1, (windowHeight - containerTop) / (windowHeight + containerHeight)))
  const scrollProgress = getParallaxVisibilityPercent(containerRef.value) / 100;
  console.log('Scroll Progress:', scrollProgress)

  // Calculate offset based on direction and speed
  let offsetX = 0
  let offsetY = 0
  const maxOffset = Math.max(Math.abs(props.minOffset), Math.abs(props.maxOffset))
  const newWidth = maxOffset + backgroundRef.value.clientWidth;
  const calculatedOffset = scrollProgress * maxOffset * props.speed

  switch (props.direction) {
    case 'up':
      offsetY = calculatedOffset
      break
    case 'down':
      offsetY = -calculatedOffset
      break
    case 'left':
      offsetX = calculatedOffset
      break
    case 'right':
      offsetX = -calculatedOffset
      break
  }

  // Apply the transform
  if(backgroundRef.value){
    backgroundRef.value.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`

  }
}

function getParallaxVisibilityPercent(el: HTMLElement | null): number {
  if (!el) return 0;
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const top = rect.top;
  const height = rect.height;
  // 0 cuando el top está en el borde inferior (aún no visible)
  // 1 cuando el bottom está en el borde superior (ya desapareció)
  const progress = (vh - top) / (vh + height);
  return Math.max(0, Math.min(1, progress)) * 100;
}

// Lifecycle
onMounted(() => {
  console.log('ParallaxBackground mounted');
  if (props.enabled) {
    scrollListener = () => updateParallax()
    window.addEventListener('scroll', scrollListener, { passive: true })
    window.addEventListener('resize', scrollListener, { passive: true })
    // Initial update
    updateParallax()
  }
})

onUnmounted(() => {
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener)
    window.removeEventListener('resize', scrollListener)
  }
})
</script>

<style scoped>
.parallax-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: v-bind(heightStyle);
}

.parallax-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150%;
  will-change: transform;
  transition: transform 0.1s ease-out;
  z-index: -1;
  background-image: v-bind(backgroundImage);
  background-color: v-bind(backgroundColor);
  background-size: v-bind(backgroundSize);
  background-position: v-bind(backgroundPosition);
}

.parallax-content {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
