<template>
  <div class="page">
    
    <h2>Parallax Controller - Vue Integration Examples</h2>

    <!-- Example 1: Basic single layer (manual registration) -->
    <section class="example">
      <h3>Basic: manual addLayer / removeLayer</h3>
      <div ref="basicViewport" class="viewport">
        <div ref="basicLayer" class="layer basic">Basic layer</div>
      </div>
      <div class="controls">
        <button @click="toggleBasic">Toggle Basic {{ basicEnabled ? 'Off' : 'On' }}</button>
      </div>
    </section>

    <!-- Example 2: Multiple layers using reactive data -->
    <section class="example">
      <h3>Multiple layers (reactive list)</h3>
      <div ref="multiViewport" class="viewport">
        <div
          v-for="layer in multiLayers"
          :key="layer.id"
          :ref="el => setMultiRef(el, layer.id)"
          class="layer multi"
        >
          Layer {{ layer.id }}
        </div>
      </div>
      <div class="controls">
        <button @click="addLayer">Add layer</button>
        <button @click="removeLayer" :disabled="multiLayers.length === 0">Remove layer</button>
      </div>
    </section>

    <!-- Example 3: Directive-based layers (convenience wrapper) -->
    <section class="example">
      <h3>Directive: v-parallax-layer</h3>
      <div ref="dirViewport" class="viewport">
        <div v-parallax-layer="{ depth: 0.12 }" class="layer directive">Directive Layer (depth 0.12)</div>
        <div v-parallax-layer="{ depth: 0.04 }" class="layer directive">Directive Layer (depth 0.04)</div>
      </div>
      <div class="controls">
        <button @click="toggleController">Toggle Controller {{ controllerEnabled ? 'Off' : 'On' }}</button>
      </div>
    </section>

    <!-- Example 4: Programmatic control (change depth / options) -->
    <section class="example">
      <h3>Programmatic control</h3>
      <div class="controls">
        <label>
          Depth for Basic Layer:
          <input type="range" min="0" max="0.5" step="0.01" v-model.number="basicDepth" />
        </label>
        <button @click="applyBasicDepth">Apply</button>
        <button @click="recenter">Recenter</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, watch } from 'vue'
/*
  NOTE: this example assumes a custom npm package named "parallax-controller"
  which exposes a constructor with a small API:
    new ParallaxController(options)
    .addLayer(element, opts)
    .updateLayer(element, opts)
    .removeLayer(element)
    .setOptions(opts)
    .enable() / .disable()
    .destroy()
    .recenter()

  Replace import with your real package path / API as needed.
*/
import {ParallaxController} from 'parallax-controller' // <-- replace with real package

// SSR guard
if (typeof window === 'undefined') {
  // export stubs to satisfy tooling in SSR environments
}

// -- shared controller used by examples
const controller = ref(null)
const controllerEnabled = ref(true)

function createController() {
  if (controller.value) return controller.value
  // sensible defaults: respond to tilt & scroll, moderate sensitivity
  controller.value = new ParallaxController({
    motion: 'pointer', // e.g. 'pointer' | 'tilt' | 'scroll'
    sensitivity: 0.9,
    friction: 0.12,
    invert: false,
    clamp: true,
    // optional global perspective for children
    perspective: 800,
  })
  return controller.value
}

onMounted(() => {
  createController()
})

onBeforeUnmount(() => {
  if (controller.value && controller.value.destroy) {
    controller.value.destroy()
    controller.value = null
  }
})

// -------- Example 1: manual registration ----------
const basicViewport = ref(null)
const basicLayer = ref(null)
const basicEnabled = ref(true)
const basicDepth = ref(0.08)

onMounted(() => {
  if (!controller.value) createController()
  if (basicLayer.value && controller.value?.addLayer) {
    controller.value.addLayer(basicLayer.value, { depth: basicDepth.value, container: basicViewport.value })
  }
})

function toggleBasic() {
  basicEnabled.value = !basicEnabled.value
  if (!controller.value) return
  if (basicEnabled.value) {
    controller.value.addLayer(basicLayer.value, { depth: basicDepth.value, container: basicViewport.value })
  } else {
    controller.value.removeLayer(basicLayer.value)
  }
}

function applyBasicDepth() {
  if (!controller.value) return
  controller.value.updateLayer(basicLayer.value, { depth: basicDepth.value })
}

// -------- Example 2: reactive multi-layer list ----------
const multiViewport = ref(null)
const multiRefs = new Map() // map id => element
const multiLayers = reactive([])
let nextId = 1

function setMultiRef(el, id) {
  if (!el) {
    multiRefs.delete(id)
    return
  }
  multiRefs.set(id, el)
}

function addLayer() {
  multiLayers.push({ id: nextId++, depth: Math.random() * 0.12 + 0.01 })
}

function removeLayer() {
  const last = multiLayers.pop()
  if (last && multiRefs.has(last.id)) {
    const el = multiRefs.get(last.id)
    controller.value?.removeLayer(el)
    multiRefs.delete(last.id)
  }
}

// watch list for additions and register with controller
watch(
  () => multiLayers.length,
  () => {
    // register all items that exist in DOM and not yet registered
    for (const item of multiLayers) {
      const el = multiRefs.get(item.id)
      if (el && controller.value) {
        // guard: avoid re-adding an element if controller already knows it
        controller.value.addLayer?.(el, { depth: item.depth, container: multiViewport.value })
      }
    }
  }
)

// -------- Example 3: directive-based registration ----------
const dirViewport = ref(null)

const vParallaxLayer = {
  mounted(el, binding) {
    // binding.value is options like { depth: 0.1 }
    if (!controller.value) createController()
    controller.value.addLayer?.(el, Object.assign({ container: dirViewport.value }, binding.value || {}))
    // keep reference for cleanup/updates
    el.__parallax_opts = binding.value || {}
  },
  updated(el, binding) {
    // update layer options if changed
    if (controller.value?.updateLayer) {
      controller.value.updateLayer(el, Object.assign({ container: dirViewport.value }, binding.value || {}))
    }
    el.__parallax_opts = binding.value || {}
  },
  unmounted(el) {
    controller.value?.removeLayer?.(el)
    delete el.__parallax_opts
  }
}

// locally register directive for this component's template
// (script setup exposes directives through `directives` attr on template root in SFCs)
// But since SFC template top-level doesn't accept directives registration directly,
// we attach it to global element by using v-parallax-layer name in the template and
// provide it via a small runtime trick:
const _directives = { 'parallax-layer': vParallaxLayer }
// Vue 3 does not allow dynamically providing directives per component via script setup;
// to make this example self-contained you may register the directive globally in your app:
// app.directive('parallax-layer', vParallaxLayer)
// For demonstration, we manually apply directive behavior for the nodes on mount:
onMounted(() => {
  // find nodes with attribute v-parallax-layer (compiled as a regular attribute in dev build)
  // fallback: if those nodes exist, call mounted hook manually
  const nodes = dirViewport.value?.querySelectorAll('[v-parallax-layer], [data-v-parallax-layer]') || []
  nodes.forEach(node => {
    // try to parse JSON-like options in data-parallax-options attribute or default
    const raw = node.getAttribute('data-parallax') || node.getAttribute('data-parallax-options')
    let opts = {}
    try { if (raw) opts = JSON.parse(raw) } catch(e) { opts = {} }
    vParallaxLayer.mounted(node, { value: opts })
  })
})

// toggle global controller enable/disable
function toggleController() {
  if (!controller.value) createController()
  controllerEnabled.value = !controllerEnabled.value
  if (controllerEnabled.value && controller.value.enable) controller.value.enable()
  if (!controllerEnabled.value && controller.value.disable) controller.value.disable()
}

// -------- Example 4: programmatic controls ----------
function recenter() {
  controller.value?.recenter?.()
}

// ensure cleanup of all layers on unmount
onBeforeUnmount(() => {
  // remove programmatically added layers
  if (basicLayer.value) controller.value?.removeLayer?.(basicLayer.value)
  for (const el of multiRefs.values()) {
    controller.value?.removeLayer?.(el)
  }
  // attempt to destroy controller already handled above
})
</script>

<style scoped>

.example {
  border: 1px solid #eee;
  padding: 12px;
  margin: 12px 0;
  border-radius: 6px;
}
.viewport {
  position: relative;
  height: 160px;
  border-radius: 6px;
  overflow: hidden;
  background: linear-gradient(180deg, #fafafa, #f0f4ff);
  margin: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.layer {
  position: absolute;
  padding: 8px 14px;
  border-radius: 6px;
  background: rgba(0,0,0,0.07);
  transition: box-shadow .15s ease;
  pointer-events: none;
}
.basic { background: rgba(255,160,120,0.14); transform: translateZ(0); }
.multi { background: rgba(120,200,255,0.12); width: 120px; height: 36px; display:flex; align-items:center; justify-content:center; }
.directive { background: rgba(150,220,150,0.12); }
.controls { margin-top: 8px; display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
button { padding: 6px 10px; border-radius: 6px; border: 1px solid #ddd; background: #fff; cursor: pointer; }
input[type="range"] { vertical-align: middle; margin-left: 8px; }
</style>