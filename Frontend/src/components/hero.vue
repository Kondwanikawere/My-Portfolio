<script setup>
import { ref, onMounted } from 'vue';
import ThreeDBackground from '../components/Background3D.vue'
import LottieAnimation from '../components/LottieAnimation.vue';
import scrollAnim from '../assets/lottieAnimations/lottieflow-scroll-down.json'; 
import { RouterLink } from 'vue-router';

const visible = ref(false)
onMounted(() => {
  setTimeout(() => {
    visible.value = true
  }, 300)
})

const preHover = ref(false);

const reloadPage = () => {
  window.location.reload()
}

const fullText = "KONDWANI KAWERE"
const displayedText = ref([])

onMounted(() => {
  setTimeout(()=>{
    let i = 0
    const interval = setInterval(() => {
      if (i < fullText.length) {
        displayedText.value.push(fullText[i])
        i++
      } else {
        clearInterval(interval)
      }
    }, 200) // Speed of typewriter

  }, 500)
})

const s1 = ref(false)
const s2 = "KondwaniKawere"
const s3 = ref(false)
const s4 = ref(false)
const s2DisplayedText = ref([])


onMounted(() => {
  setTimeout(()=>{
    s1.value = true
  },1000)

  setTimeout(()=>{
    let i = 0
    const interval = setInterval(()=>{
      if (i < s2.length){
        s2DisplayedText.value.push(s2[i])
        i++
      } else{
        clearInterval(interval)
      }
    }, 200)
  }, 1000)

  setTimeout(()=>{
    s3.value = true
  },4000)

  setTimeout(()=>{
    s4.value = true
  },4200)

})

const socialMediaTrue = ref(false)
onMounted(()=>{
  setTimeout(()=>{
    socialMediaTrue.value = true
  }, 1000)
})

defineEmits(['scroll-to'])

defineProps({
  activeSection: String,
})

</script>

<template>
  <ThreeDBackground />
  
  <div class="h-screen relative w-full" id="hero">
    <div class="w-full absolute flex justify-center text-white font-robotoMono text-[16px] font-bold mt-[30px] sm:mt-0 sm:text-[24px] pt-[35px]">
      <button @click="reloadPage" @mouseover="preHover = true" @mouseleave="preHover = false" class="flex cursor-pointer">  
        <pre v-if="s1">< </pre>
        <pre class="text-skyBlue flex" v-for="(char, index) in s2DisplayedText" :key="index">{{ char }}</pre>
        <Transition name="fade">
          <pre v-if="preHover" class="text-green overflow-hidden"> onClick={reload} </pre>
        </Transition>
        <pre v-if="s3" class="text-purple"> / </pre>
        <pre v-if="s4">></pre>
      </button>
    </div>
    <Transition appear enter-active-class="transition ease-out duration-2000"
                  leave-active-class="transition ease-out duration-2000" enter-from-class="opacity-0" 
                  leave-to-class="opacity-0">
      <div class="fixed ml-[3%] sm:ml-[1.2%] h-[40px] w-[40px] sm:h-[55px] sm:w-[55px] lg:h-[55px] lg:w-[55px] rounded-full mt-[20px] z-100 "  v-if="socialMediaTrue">
        <img src="../assets/images/profile.jpg" alt="Pic" class="w-[100%] h-[100%] object-cover rounded-full">
      </div>
    </Transition>

    <div class="h-screen flex items-center justify-center">
      <div class="text-center p-8 bg-transparent rounded-lg">
        <div class="text-[8vw]/[1em] font-poppins font-extrabold text-white mb-4 w-[100%] flex justify-center">
          <TransitionGroup name="bounce">
            <pre v-for="(char, index) in displayedText" :key="index">{{ char }}</pre>
          </TransitionGroup>
        </div>
        <Transition name="slide-up">
            <div v-if="visible" class="text-[2.3vw] font-robotoMono font-normal text-gray-200 sm:text-[1.6vw]">
              FULL STACK DEVELOPER, UI DESIGNER, CYBERSECURITY EXPERT
            </div>
        </Transition>
      </div>
    </div>

    <Transition appear enter-active-class="transition ease-out duration-200"
            leave-active-class="transition ease-out duration-200" enter-from-class="opacity-0" 
            leave-to-class="opacity-0">
      <div class="fixed flex-col h-screen pl-[2%] items-center justify-bottom hidden md:flex z-98" v-if="socialMediaTrue">
        <div class="flex flex-col  items-center space-y-[5vh] fixed bottom-0 md:w-[8%] lg:w-[6%] left-0"> 
          <font-awesome-icon :icon="['fab', 'whatsapp']" :class="[activeSection === 'myWork' ? 'text-white' : 'text-socialMediaGreen']" class="text-[25px] transition duration-300 hover:drop-shadow-[0_0_12px_#00c1a1] cursor-pointer" />
          <font-awesome-icon icon="fa-brands fa-square-facebook" :class="[activeSection === 'myWork' ? 'text-white' : 'text-socialMediaGreen']" class="text-[22.5px] transition duration-300 hover:drop-shadow-[0_0_12px_#00c1a1] cursor-pointer"/>
          <div class="w-[0.1px] bg-white h-[25vh]">
          </div>
        </div>
      </div>
    </Transition>

    <Transition appear enter-active-class="transition ease-out duration-200"
            leave-active-class="transition ease-out duration-200" enter-from-class="opacity-0" 
            leave-to-class="opacity-0">
      <div class="fixed flex-col h-screen top-0 items-center right-0 space-y-[4vh] hidden md:flex md:w-[8%] lg:w-[6%] right-0 z-98" v-if="socialMediaTrue">
        <div class="flex items-end h-screen justify-center">
          <p class="text-[2vh] text-richBrown font-poppins [writing-mode:vertical-rl] [letter-spacing:0.05em] transition duration-300 hover:[text-shadow:0_0_12px_#FFB183] hover:text-richBrown cursor-pointer">
            KondwaniKawere1@gmail.com
          </p>
        </div>
        <div class="w-[0.1px] bg-white relative h-[7vh] bottom-0">
        </div>
      </div>
    </Transition>

    <div class="bottom-[80px] absolute flex justify-center w-[100%]">
      <button class="h-[40px] w-[40px] cursor-pointer" @click="$emit('scroll-to', 'mySelf')">
        <LottieAnimation :animationData="scrollAnim" />
      </button>
    </div>
  </div>
  
</template>

