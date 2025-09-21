<template>
  <div ref="lottieContainer" class="lottie-animation"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import lottie from 'lottie-web';

// Props
const props = defineProps({
  animationData: { type: Object, required: true },
  loop: { type: Boolean, default: true },
  autoplay: { type: Boolean, default: true }
});

// Refs
const lottieContainer = ref(null);
let animation = null;

// Lifecycle
onMounted(() => {
    setTimeout(() => {
        animation = lottie.loadAnimation({
            container: lottieContainer.value,
            renderer: 'svg',
            loop: props.loop,
            autoplay: props.autoplay,
            animationData: props.animationData
        })
    }, 300);
});

onBeforeUnmount(() => {
  if (animation) animation.destroy();
});
</script>

<style scoped>
.lottie-animation {
  width: 100%;
  height: 100%;
}
</style>