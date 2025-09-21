<script setup>
import * as THREE from 'three';
import { onMounted, onUnmounted, ref } from 'vue';

const container = ref(null);

let scene, camera, renderer, particles;

const initThreeJS = () => {
  // 1. Create scene with gradient
  scene = new THREE.Scene();
  
 
  const canvas = document.createElement('canvas');
  
  const backgroundTexture = new THREE.CanvasTexture(canvas);
  scene.background = backgroundTexture;
  
  // [All original particle/camera/animation code remains unchanged below]
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 20;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setClearColor(0x000000);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  container.value.appendChild(renderer.domElement);

  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 300;
  const posArray = new Float32Array(particlesCount * 3);
  const colorArray = new Float32Array(particlesCount * 3);

  const colors = [
    [0.7, 0.3, 0.9], [0.3, 0.7, 0.9], 
    [0.9, 0.3, 0.7], [0.5, 0.4, 1.0], 
    [0.4, 0.5, 1.0]
  ];

  for (let i = 0; i < particlesCount; i++) {
    const i3 = i * 3;
    const radius = 25;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    posArray[i3] = radius * Math.sin(phi) * Math.cos(theta);
    posArray[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    posArray[i3 + 2] = radius * Math.cos(phi);
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    colorArray[i3] = color[0];
    colorArray[i3 + 1] = color[1];
    colorArray[i3 + 2] = color[2];
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    size: 1.5,
    vertexColors: true,
    transparent: true,
    opacity: 1,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: false,
    alphaTest: 0.01,
    depthWrite: false
  });

  particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  const animate = () => {
    requestAnimationFrame(animate);
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.0008;
    renderer.render(scene, camera);
  };
  
  animate();

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener('resize', handleResize);

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    if (renderer) renderer.dispose();
  });
};

onMounted(() => {
  if (container.value) initThreeJS();
});
</script>

<template>
  <div ref="container" class="three-container" ></div>
</template>
