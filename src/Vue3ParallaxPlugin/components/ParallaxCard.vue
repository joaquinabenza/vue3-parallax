<template>
  <div class="card-wrap" @mousemove="handleMouseMove" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
    ref="card">
    <div class="card" :style="cardStyle">
      <div class="card-bg" :style="[cardBgTransform, cardBgImage]"><slot></slot></div>
      <div class="card-info">
        <slot name="header"></slot>
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
const props = defineProps({
  dataImage: {
    type: String,
    default: 'https://picsum.photos/800/600'
  }
})
const card = ref<HTMLElement | null>(null)
const width = ref(0)
const height = ref(0)
const mouseX = ref(0)
const mouseY = ref(0)
const mouseLeaveDelay = ref<any>(null)

const handleMouseMove = (e: MouseEvent) => {
  if(card.value === null) return;
  mouseX.value = e.pageX - card.value.offsetLeft - width.value / 2;
  mouseY.value = e.pageY - card.value.offsetTop - height.value / 2;
}

const handleMouseEnter = (e: MouseEvent) => {
  clearTimeout(mouseLeaveDelay.value);
}

const handleMouseLeave = (e: MouseEvent) => {
  mouseLeaveDelay.value = setTimeout(() => {
    mouseX.value = 0;
    mouseY.value = 0;
  }, 1000);
}

const mousePX = computed(() => {
  return mouseX.value / width.value;
})

const mousePY = computed(() => {
  return mouseY.value / height.value;
})

const cardStyle = computed(() => {
  const rX = mousePX.value * 30;
  const rY = mousePY.value * -30;
  return {
    transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
  };
});

const cardBgTransform = computed(() => {
  const tx = mousePX.value * -40;
  const ty = mousePY.value * -40;
  return {
    transform: `translateX(${tx}px) translateY(${ty}px)`
  };
});

const cardBgImage = computed(() => {
  return {
    backgroundImage: `url(${props.dataImage})`
  }
});


onMounted(() => {
  if(card.value === null) return;
  width.value = card.value.offsetWidth
  height.value = card.value.offsetHeight
})
</script>

<style lang="scss" scoped>
$hoverEasing: cubic-bezier(0.23, 1, 0.32, 1);
$returnEasing: cubic-bezier(0.445, 0.05, 0.55, 0.95);

.card-wrap {
  margin: 10px;
  transform: perspective(800px);
  transform-style: preserve-3d;
  cursor: pointer;
  // background-color: #fff;

  &:hover {
    .card-info {
      transform: translateY(0);
    }

    .card-info p {
      opacity: 1;
    }

    .card-info,
    .card-info p {
      transition: 0.6s $hoverEasing;
    }

    .card-info:after {
      transition: 5s $hoverEasing;
      opacity: 1;
      transform: translateY(0);
    }

    .card-bg {
      transition:
        0.6s $hoverEasing,
        opacity 5s $hoverEasing;
      opacity: 0.8;
    }

    .card {
      transition:
        0.6s $hoverEasing,
        box-shadow 2s $hoverEasing;
      box-shadow:
        rgba(white, 0.2) 0 0 40px 5px,
        rgba(white, 1) 0 0 0 1px,
        rgba(black, 0.66) 0 30px 60px 0,
        inset #333 0 0 0 5px,
        inset white 0 0 0 6px;
    }
  }
}
.card {
  position: relative;
  flex: 0 0 240px;
  width: 240px;
  height: 320px;
  background-color: #333;
  overflow: hidden;
  border-radius: 10px;
  box-shadow:
    rgba(black, 0.66) 0 30px 60px 0,
    inset #333 0 0 0 5px,
    inset rgba(white, 0.5) 0 0 0 6px;
  transition: 1s $returnEasing;
}

.card-bg {
  opacity: 0.5;
  position: absolute;
  top: -20px;
  left: -20px;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition:
    1s $returnEasing,
    opacity 5s 1s $returnEasing;
  pointer-events: none;
}

.card-info {
  padding: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  color: #fff;
  transform: translateY(30%);
  transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);

  p {
    opacity: 0;
    text-shadow: rgba(black, 1) 0 2px 3px;
    transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  * {
    position: relative;
    z-index: 1;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, transparent 0%, rgba(#000, 0.6) 100%);
    background-blend-mode: overlay;
    opacity: 0;
    transform: translateY(100%);
    transition: 5s 1s $returnEasing;
  }
}

.card-info h1 {
  font-family: "Playfair Display";
  font-size: 36px;
  font-weight: 700;
  text-shadow: rgba(black, 0.5) 0 10px 10px;
}

</style>