<script setup>
    import { ref, onMounted, onUnmounted, reactive, Teleport} from 'vue';
    import { useIntersectionObserver } from '@vueuse/core'

    const work = ref(null)
    
    const card1Visible = ref(false)
    const technologies1Visible = ref(false)
    const card2Visible = ref(false)
    const technologies2Visible = ref(false)
    const card3Visible = ref(false)
    const technologies3Visible = ref(false)
    const card4Visible = ref(false)
    const technologies4Visible = ref(false)




    const myWorkScroll = () => {
      if (!work.value) return;
      
      const myWorkHeight = document.getElementById("myWork");
      
        if (myWorkHeight) {
            const viewportWidth = window.innerWidth;

            if (technologies4Visible.value === false) {
                if (viewportWidth < 1024) {
                    // Devices smaller than 1024px (mobile/tablet)
                    myWorkHeight.style.height = "2187px";
                } else {
                    // Devices 1024px and above (laptops/desktops)
                    myWorkHeight.style.height = "1850px";
                }
            } else {
                // When visible → height becomes automatic
                myWorkHeight.style.height = "auto";
            }
        }

      const rect = work.value.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const elementHeight = rect.height; 
      const elementTop = rect.top;
      const elementBottom = rect.bottom;

      const scrollStart = viewportHeight;         // When the top hits bottom of viewport
      const scrollEnd = -elementHeight;           // When bottom passes top of viewport

      const totalScroll = scrollStart - scrollEnd;
      const currentScroll = scrollStart - elementTop;

      const progress = Math.min(1, Math.max(0, currentScroll / totalScroll));

      // Trigger animations based on progress
      card1Visible.value = progress >= 0.05;
      technologies1Visible.value = progress >= 0.23;
      card2Visible.value = progress >= 0.28;
      technologies2Visible.value = progress >= 0.41;
      card3Visible.value = progress >= 0.46;
      technologies3Visible.value = progress >= 0.59;
      card4Visible.value = progress >= 0.64;
      technologies4Visible.value = progress >= 0.77;

    };

    onMounted(() => {
      window.addEventListener('scroll', myWorkScroll);
      window.addEventListener('resize', myWorkScroll);
      myWorkScroll();
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', myWorkScroll);
      window.removeEventListener('resize', myWorkScroll);
    });

    const workDescription = reactive({
        1 : false,
        2 : false,
        3 : false
    })
    function showWorkDescription(No){
        workDescription[No] = !workDescription[No]
    }

    defineExpose({
        work
    })

    const images1 = ref([
        new URL('@/assets/images/ShopBridge1.png', import.meta.url).href,
        new URL('@/assets/images/ShopBridge2.png', import.meta.url).href,
        new URL('@/assets/images/ShopBridge3.png', import.meta.url).href,
    ])

    const images2 = ref([
        new URL('@/assets/images/LyricFlow1.png', import.meta.url).href,
        new URL('@/assets/images/LyricFlow2.png', import.meta.url).href,
        new URL('@/assets/images/LyricFlow3.png', import.meta.url).href,
    ])

    const images3 = ref([
        new URL('@/assets/images/H1.png', import.meta.url).href,
        new URL('@/assets/images/H22.png', import.meta.url).href,
        new URL('@/assets/images/H3.png', import.meta.url).href,
    ])

    const images4 = ref([
        new URL('@/assets/images/CompassionLink2.png', import.meta.url).href,
        new URL('@/assets/images/CompassionLink3.png', import.meta.url).href,
        new URL('@/assets/images/CompassionLink4.png', import.meta.url).href,
    ])

    const activeGallery = ref(null)
    const currentIndex = ref(0)

    const nextImage = () => {
    currentIndex.value = (currentIndex.value + 1) % activeGallery.value.length
    }

    const prevImage = () => {
    currentIndex.value = (currentIndex.value - 1 + activeGallery.value.length) % activeGallery.value.length
    }

    const expand = ref(false);

</script>

<template>
    <div class="relative w-full flex justify-center pt-[60px] z-95 pl-[6%] pr-[6%] sm:pl-[10%] sm:pr-[10%] lg:pl-[0px] lg:pr-[0px] font-poppins mb-[40px]" id="myWork" ref="work">
        <div class=" sm:w-[512px] md:w-[671px] lg:w-[900px]">
            <div class="flex justify-end">
                <Motion v-if="card1Visible" :initial="{ opacity: 0, x: 200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}"
                        class="h-[1px] bg-[#505761] w-[50%] mb-[30px]">
                </Motion>
            </div>

            <Motion v-if="card1Visible" :initial="{ opacity: 0, x: -200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}"
                class="w-full flex items-center space-x-[4%] text-[20px] sb4:text-[25px] sm:text-[25px] lg:text-[38px] text-white font-bold mb-[30px]">
                <div>Things I've Worked on, Some of Them </div>
            </Motion>

            <div class="w-full mb-[60px] lg:mb-[100px]" id="card1">
                <div v-if="card1Visible" class="w-full mb-[25px] lg:hidden">
                    <Motion :initial="{ opacity: 0, x: -200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}"
                        class="w-full flex flex-col items-center text-navBar1 font-semibold">
                        <div class="w-full">
                            <div class="mb-[20px]">
                                <span @click="[showWorkDescription(1), activeGallery = images1]" class="text-[24px] cursor-pointer ">ShopBridge</span>
                            </div>
                            <div @click="[showWorkDescription(1), activeGallery = images1]" class="xs:h-[282px] xs:w-[100%] sb1:h-[317px] sb2:h-[344px] sb3:h-[365px] sb4:h-[397px] sb5:h-[425px] sb6:h-[476px] sb7:h-[507px] sb8:h-[529px] sm:w-[512px] md:w-[646px] h-[340px] sm:h-[440px] lg:w-[547px] lg:h-[308px] rounded-[4px] cursor-pointer overflow-hidden bg-cardBg">
                                <div class="w-[100%] h-[83%] rounded-[4px] overflow-hidden">
                                    <img src="../assets/images/ShopBridge1.png" alt="ShopBridge" class="hover:scale-110 w-full h-full object-cover">
                                </div>
                                <div class="text-white text-[14px] sb5:text-[16px] flex font-light font-poppins justify-center items-center h-[18%]">
                                    <p class="w-[90%]">A platform that lets you shop products and checkout with ease.</p>
                                </div>
                            </div>
                        </div>
                    </Motion>
                </div>

                <Motion v-if="technologies1Visible" :initial="{ opacity: 0, x: -200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}"
                        class="w-full flex flex-col items-center text-navBar1 font-normal lg:hidden">
                        <div class="w-full">
                            <div class="text-[13px]">
                                Laravel | Vue 3 | Tailwind
                            </div>
                        </div>
                </Motion>

                <div class="hidden lg:flex">
                    <div v-if="card1Visible" class="w-full mb-[25px] grid grid-cols-2">
                        <Motion v-if="card1Visible" class="z-2" :initial="{ opacity: 0, x: -200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}">
                            <div class="flex flex-col justify-center">
                                <span @click="[showWorkDescription(1), activeGallery = images1]" class="text-[28px] font-semibold text-navBar1 cursor-pointer mb-[20px] ">ShopBridge</span> 
                                <div class="w-[456px] h-[176px] bg-cardBg rounded-[4px] p-[25px] mb-[25px]">
                                    An eCommerce platform that lets customers browse products, add items to their cart, and checkout securely. It supports various payment options, organized categories, and delivers a smooth and user-friendly shopping experience.                                
                                </div>
                                <div class="text-[13px] text-navBar1 font-normal">
                                    Laravel | Vue 3 | Tailwind
                                </div>
                            </div>
                        </Motion>
                        <div class="justify-self-end z-1">
                            <div @click="[showWorkDescription(1), activeGallery = images1]" class="w-[512px] sm:w-[646px] h-[340px] sm:h-[440px] lg:w-[547px] lg:h-[308px] rounded-[4px] cursor-pointer overflow-hidden">
                                <img src="../assets/images/ShopBridge1.png" alt="ShopBridge" class="w-[100%] h-[100%] rounded-[4px] hover:scale-110 object-cover">
                            </div>
                        </div>
                    </div>                    
                </div>
                <Teleport to="body">
                    <Transition name="workDescription" appear>
                        <div v-if="workDescription[1]" class="w-full fixed left-0 top-0 z-102 h-screen flex justify-center">
                            <div class="w-full fixed top-0 z-102 h-screen bg-black opacity-50" @click="showWorkDescription(1)"></div>
                            <div class="h-screen w-full bg-portfolio fixed top-0 z-103 overflow-hidden lg:w-[700px] lg:h-[95vh] flex flex-col items-center">
                                <button @click="showWorkDescription(1)" :class="['absolute z-103 top-[1vh] right-[3%] cursor-pointer hidden']">
                                    <font-awesome-icon :icon="['fa', 'xmark']" class="text-[26px] text-[#bbb]"/>
                                </button>
                                <div :class="['relative h-[50vh] lg:h-[60vh] w-full overflow-hidden']">
                                    <img @click="expand = !expand" :src="images1[currentIndex]" alt="ShopBridge" class=" left-0 w-full h-full object-cover absolute z-102" >
                                </div>
                                <div class="absolute w-full h-[50vh] lg:h-[60vh] top-0">
                                    <button @click="prevImage" :class="['absolute left-0 w-[10%] h-[37px] bg-black/20 z-103 flex justify-center items-center cursor-pointer bottom-0']">
                                        <font-awesome-icon :icon="['fas', 'chevron-left']" class="text-white text-[16px]" />
                                    </button>
                                    <button @click="nextImage" :class="['absolute right-0 w-[10%] h-[37px] bg-black/20 z-103 flex justify-center items-center cursor-pointer bottom-0']">
                                        <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-white text-[16px]" />
                                    </button>
                                 </div>
                                <div :class="['font-poppins font-semibold text-white pt-[15px] pr-[10px] pl-[15px]']" >
                                    <p class="text-[26px] text-navBar1">ShopBridge</p>
                                    <p class="text-[10px] font-[300px] text-[#959595] mb-[15px]">AN ECOMMERCE PLATFORM</p>
                                    <p class="text-[14px] font-[100px] text-[#F5F5F5] leading-5 mb-[50px]">
                                        An eCommerce platform designed to deliver a streamlined shopping experience. Customers can easily explore products, manage their carts, and complete secure checkouts, supported by structured categories, intuitive navigation, and dependable payment options.                                    
                                    </p>
                                    <div class="flex justify-between w-full pr-[5%]">
                                        <a target="_blank" rel="noopener noreferrer" href="https://ecommerce.kondwanikawere.com" class="w-[110px] h-[42px] border-2 border-viewSiteB hover:bg-viewSiteB text-[14px] flex justify-center items-center">VIEW SITE</a>
                                        <button @click="showWorkDescription(1)" class="cursor-pointer">
                                            <font-awesome-icon :icon="['fa', 'xmark']" class="text-[26px] text-[#bbb]"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </Teleport>
                
            </div>

            <div class="w-full mb-[60px] lg:mb-[100px]" id="card2">
                <div v-if="card2Visible" class="w-full mb-[25px] lg:hidden">
                    <Motion :initial="{ opacity: 0, x: 200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}"
                        class="w-full flex flex-col items-center text-navBar1 font-semibold">
                        <div class="w-full flex flex-col items-end">
                            <div class="mb-[20px]">
                                <span @click="[showWorkDescription(2), activeGallery = images2]" class="text-[24px] cursor-pointer">LyricFlow</span>
                            </div>
                            <div @click="[showWorkDescription(2), activeGallery = images2]" class="xs:h-[282px] xs:w-[100%] sb1:h-[317px] sb2:h-[344px] sb3:h-[365px] sb4:h-[397px] sb5:h-[425px] sb6:h-[476px] sb7:h-[507px] sb8:h-[529px] sm:w-[512px] md:w-[646px] sm:h-[440px] rounded-[4px] h-[340px] cursor-pointer overflow-hidden bg-cardBg">
                                <div class="w-[100%] h-[83%] rounded-[4px] overflow-hidden">
                                    <img src="../assets/images/Sign In.png" alt="LyricFlow" class="hover:scale-110 ">
                                </div>                                
                                <div class="text-white text-[14px] sb5:text-[16px] flex font-light font-poppins justify-center items-center h-[18%]">
                                    <p class="w-[90%]">A platform that lets you stream and download music with ease.</p>
                                </div>
                            </div>
                        </div>
                    </Motion>
                </div>

                <Motion v-if="technologies2Visible" :initial="{ opacity: 0, x: 200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}"
                        class="w-full flex flex-col items-center text-navBar1 font-normal lg:hidden">
                        <div class="w-full flex justify-end">
                            <div class="text-[13px]">
                                Laravel | Vue 3 | Tailwind
                            </div>
                        </div>
                </Motion>

                <div class="hidden lg:flex">
                    <div v-if="card2Visible" class="w-full mb-[25px] grid grid-cols-2">
                        <div class="justify-self-start z-1">
                            <div @click="[showWorkDescription(2), activeGallery = images2]" class="w-[512px] sm:w-[646px] h-[340px] sm:h-[440px] lg:w-[547px] lg:h-[308px] rounded-[4px] cursor-pointer overflow-hidden">
                                <img src="../assets/images/Sign In.png" alt="LyricFlow" class="rounded-[4px] hover:scale-110 object-cover">
                            </div>
                        </div>
                        <Motion v-if="card2Visible" class="z-2" :initial="{ opacity: 0, x: -200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}">
                            <div class="flex flex-col justify-center items-end">
                                <span @click="[showWorkDescription(2), activeGallery = images2]" class="text-[28px] font-semibold text-navBar1 cursor-pointer mb-[20px] ml-[120px]">LyricFlow</span> 
                                <div class="w-[456px] h-[176px] bg-cardBg rounded-[4px] p-[25px] mb-[25px]">
                                    A music streaming platform that lets users listen to and download their favorite songs, albums, and playlists. It features collections from various artists, supports secure online payments for albums or tracks, and offers seamless music discovery.
                                </div>
                                <div class="text-[13px] text-navBar1 font-normal">
                                    Laravel | Vue 3 | Tailwind
                                </div>
                            </div>
                        </Motion>
                    </div>                    
                </div>

                <Teleport to="body">
                    <Transition name="workDescription" appear>
                        <div v-if="workDescription[2]" class="w-full fixed left-0 top-0 z-102 h-screen flex justify-center">
                            <div class="w-full fixed top-0 z-102 h-screen bg-black opacity-50" @click="showWorkDescription(2)"></div>
                            <div class="h-screen w-full bg-portfolio fixed top-0 z-103 overflow-hidden lg:w-[700px] lg:h-[95vh] flex flex-col items-center">
                                <button @click="showWorkDescription(2)" :class="['absolute z-103 top-[1vh] right-[3%] cursor-pointer', expand ? 'block' : 'hidden']">
                                    <font-awesome-icon :icon="['fa', 'xmark']" class="text-[26px] text-[#EEEEEE]"/>
                                </button>
                                <div :class="['relative', expand ? 'h-[100%] w-[80%] sm:w-full' : 'h-[60vh] w-full']">
                                    <img alt="LyricFlow" src="../assets/images/myWorkBg.png" :class="['h-[100%] w-[100%] left-0 absolute z-101', expand ? 'hidden lg:block' : '']">
                                    <img @click="expand = !expand" :src="images2[currentIndex]" alt="LyricFlow" class="h-[100%] w-[100%] object-contain overflow-hidden left-0 absolute z-102" >
                                </div>
                                <div class="absolute w-full h-[60vh] top-0">
                                    <button @click="prevImage" :class="['absolute left-0 w-[10%] h-[37px] bg-black/20 z-103 flex justify-center items-center cursor-pointer', expand ? 'top-[47vh]' : 'bottom-0']">
                                        <font-awesome-icon :icon="['fas', 'chevron-left']" class="text-white text-[16px]" />
                                    </button>
                                    <button @click="nextImage" :class="['absolute right-0 w-[10%] h-[37px] bg-black/20 z-103 flex justify-center items-center cursor-pointer', expand ? 'top-[47vh]' : 'bottom-0']">
                                        <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-white text-[16px]" />
                                    </button>
                                 </div>
                                <div :class="['font-poppins font-semibold text-white pt-[15px] pr-[10px] pl-[15px]', expand ? 'hidden' : 'block']" >
                                    <p class="text-[26px] text-navBar1">LyricFlow</p>
                                    <p class="text-[10px] font-[300px] text-[#959595] mb-[15px]">A MUSIC STREAMING PLATFORM</p>
                                    <p class="text-[14px] font-[100px] text-[#F5F5F5] leading-5">
                                        A music streaming platform that lets users listen to and download their favorite songs, albums, and playlists. It features collections from various artists, supports secure online payments for albums or tracks, and offers seamless music discovery.
                                    </p>
                                    <div class="flex justify-center w-full">
                                        <button @click="showWorkDescription(2)" class="absolute bottom-[7vh] lg:bottom-[4vh] cursor-pointer">
                                            <font-awesome-icon :icon="['fa', 'xmark']" class="text-[26px] text-[#EEEEEE]"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </Teleport>
                
            </div>
            
            <div class="w-full mb-[60px] lg:mb-[100px]" id="card3">
                <div v-if="card3Visible" class="w-full mb-[25px] lg:hidden">
                    <Motion :initial="{ opacity: 0, x: -200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}"
                        class="w-full flex flex-col items-center text-navBar1 font-semibold">
                        <div class="w-full"> 
                            <div class="mb-[20px]">
                                <span @click="[showWorkDescription(3), activeGallery = images3]" class="text-[24px] cursor-pointer">InnSight</span>
                            </div>
                            <div  @click="[showWorkDescription(3), activeGallery = images3]" class="xs:h-[282px] xs:w-[100%] sb1:h-[317px] sb2:h-[344px] sb3:h-[365px] sb4:h-[397px] sb5:h-[425px] sb6:h-[476px] sb7:h-[507px] sb8:h-[529px] sm:w-[512px] md:w-[646px] sm:h-[440px] rounded-[4px] h-[340px] cursor-pointer overflow-hidden bg-cardBg">
                                <div class="w-[100%] h-[83%] rounded-[4px] overflow-hidden">
                                    <img src="../assets/images/H4.png" alt="InnSight" class="hover:scale-110">
                                </div>
                                <div class="text-white text-[14px] sb5:text-[16px] flex font-light font-poppins justify-center items-center h-[18%]">
                                <p class="w-[90%]">A System that simplifies Hotel Management Operations.</p>
                                </div>
                            </div>
                        </div>
                    </Motion>
                </div>

                <Motion v-if="technologies3Visible" :initial="{ opacity: 0, x: -200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}"
                        class="w-full flex flex-col items-center text-navBar1 font-normal lg:hidden">
                        <div class="w-full">
                            <div class="text-[13px]">
                                Laravel | Vue 3 | Tailwind
                            </div>
                        </div>
                </Motion>

                <div class="hidden lg:flex">
                    <div v-if="card3Visible" class="w-full mb-[25px] grid grid-cols-2">
                        <Motion v-if="card3Visible" class="z-2" :initial="{ opacity: 0, x: -200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}">
                            <div class="flex flex-col justify-center">
                                <span @click="[showWorkDescription(3), activeGallery = images3]" class="text-[28px] font-semibold text-navBar1 cursor-pointer mb-[20px]">InnSight</span> 
                                <div class="w-[456px] h-[176px] bg-cardBg rounded-[4px] p-[25px] mb-[25px]">
                                    An app that streamlines hotel operations with integrated online room booking, smart inventory tracking, and efficient staff management for seamless hospitality service. Designed to save time and boost productivity.                                
                                </div>
                                <div class="text-[13px] text-navBar1 font-normal">
                                    Laravel | Vue 3 | Tailwind
                                </div>
                            </div>
                        </Motion>
                        <div class="justify-self-end z-1">
                            <div @click="[showWorkDescription(3), activeGallery = images1]" class="w-[512px] sm:w-[646px] h-[340px] sm:h-[440px] lg:w-[547px] lg:h-[308px] rounded-[4px] cursor-pointer overflow-hidden">
                                <img src="../assets/images/H4.png" alt="Innsight" class=" rounded-[4px] hover:scale-110 ">
                            </div>
                        </div>
                    </div>                    
                </div>               

                <Teleport to="body">
                    <Transition name="workDescription" appear>
                        <div v-if="workDescription[3]" class="w-full fixed left-0 top-0 z-102 h-screen flex justify-center">
                            <div class="w-full fixed top-0 z-102 h-screen bg-black opacity-50" @click="showWorkDescription(3)"></div>
                            <div class="h-screen w-full bg-portfolio fixed top-0 z-103 overflow-hidden lg:w-[700px] lg:h-[95vh] flex flex-col items-center">
                                <button @click="showWorkDescription(3)" :class="['absolute z-103 top-[1vh] right-[3%] cursor-pointer hidden']">
                                    <font-awesome-icon :icon="['fa', 'xmark']" class="text-[26px] text-[#bbb]"/>
                                </button>
                                <div :class="['relative h-[50vh] lg:h-[60vh] w-full overflow-hidden']">
                                    <img @click="expand = !expand" :src="images3[currentIndex]" alt="Innsight" class="left-0 w-full h-full object-cover absolute z-102" >
                                </div>
                                <div class="absolute w-full h-[50vh] lg:h-[60vh] top-0">
                                    <button @click="prevImage" :class="['absolute left-0 w-[10%] h-[37px] bg-black/20 z-103 flex justify-center items-center cursor-pointer bottom-0']">
                                        <font-awesome-icon :icon="['fas', 'chevron-left']" class="text-white text-[16px]" />
                                    </button>
                                    <button @click="nextImage" :class="['absolute right-0 w-[10%] h-[37px] bg-black/20 z-103 flex justify-center items-center cursor-pointer bottom-0']">
                                        <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-white text-[16px]" />
                                    </button>
                                 </div>
                                <div :class="['font-poppins font-semibold text-white pt-[15px] pr-[10px] pl-[15px]']" >
                                    <p class="text-[26px] text-navBar1">InnSight</p>
                                    <p class="text-[10px] font-[300px] text-[#959595] mb-[15px]">A HOTEL MANAGEMENT SYSTEM</p>
                                    <p class="text-[14px] font-[100px] text-[#F5F5F5] leading-5">
                                        An app that streamlines hotel operations with integrated online room booking, smart inventory tracking, and efficient staff management for seamless hospitality service. Designed to save time and boost productivity.                                
                                    </p>
                                    <div class="flex justify-center w-full">
                                        <button @click="showWorkDescription(3)" class="absolute bottom-[7vh] lg:bottom-[4vh] cursor-pointer">
                                            <font-awesome-icon :icon="['fa', 'xmark']" class="text-[26px] text-[#bbb]"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </Teleport>
            </div>     
            <div class="w-full" id="card4">
                <div v-if="card4Visible" class="w-full mb-[25px] lg:hidden">
                    <Motion :initial="{ opacity: 0, x: 200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}"
                        class="w-full flex flex-col items-center text-navBar1 font-semibold">
                        <div class="w-full flex flex-col items-end">
                            <div class="mb-[20px]">
                                <span @click="[showWorkDescription(4), activeGallery = images4]" class="text-[24px] cursor-pointer">CompassionLink</span>
                            </div>
                            <div @click="[showWorkDescription(4), activeGallery = images4]" class="xs:h-[282px] xs:w-[100%] sb1:h-[317px] sb2:h-[344px] sb3:h-[365px] sb4:h-[397px] sb5:h-[425px] sb6:h-[476px] sb7:h-[507px] sb8:h-[529px] sm:w-[512px] md:w-[646px] sm:h-[440px] rounded-[4px] h-[340px] cursor-pointer overflow-hidden bg-cardBg">
                                <div class="w-[100%] h-[83%] rounded-[4px] overflow-hidden">
                                    <img src="../assets/images/CompassionLink.jpg" alt="CompassionLink" class="hover:scale-110 ">
                                </div>                                
                                <div class="text-white text-[14px] sb5:text-[16px] flex font-light font-poppins justify-center items-center h-[18%]">
                                <p class="w-[90%]">A platform where well-wishers can donate to support patients.</p>
                                </div>
                            </div>
                        </div>
                    </Motion>
                </div>

                <Motion v-if="technologies4Visible" :initial="{ opacity: 0, x: 200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}"
                        class="w-full flex flex-col items-center text-navBar1 font-normal lg:hidden">
                        <div class="w-full flex justify-end">
                            <div class="text-[13px]">
                                Laravel | Tailwind
                            </div>
                        </div>
                </Motion>

                <div class="hidden lg:flex">
                    <div v-if="card4Visible" class="w-full mb-[25px] grid grid-cols-2">
                        <div class="justify-self-start z-1">
                            <div @click="[showWorkDescription(4), activeGallery = images4]" class="w-[512px] sm:w-[646px] h-[340px] sm:h-[440px] lg:w-[547px] lg:h-[308px] rounded-[4px] cursor-pointer overflow-hidden">
                                <img src="../assets/images/CompassionLink1.jpg" alt="CompassionLink1" class="rounded-[4px] hover:scale-110 object-cover">
                            </div>
                        </div>
                        <Motion v-if="card4Visible" class="z-2" :initial="{ opacity: 0, x: -200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}">
                            <div class="flex flex-col justify-center items-end">
                                <span @click="[showWorkDescription(4), activeGallery = images4]" class="text-[28px] font-semibold text-navBar1 cursor-pointer mb-[20px] ml-[120px]">CompassionLink</span> 
                                <div class="w-[456px] h-[176px] bg-cardBg rounded-[4px] p-[25px] mb-[25px]">
                                    A platform that connects well-wishers to patients in need, enabling secure donations through mobile wallets as well as banks, transparent fund tracking, and timely medical support to improve healthcare outcomes.
                                </div>
                                <div class="text-[13px] text-navBar1 font-normal">
                                    Laravel | Tailwind
                                </div>
                            </div>
                        </Motion>
                    </div>                    
                </div>

                <Teleport to="body">
                    <Transition name="workDescription" appear>
                        <div v-if="workDescription[4]" class="w-full fixed left-0 top-0 z-102 h-screen flex justify-center">
                            <div class="w-full fixed top-0 z-102 h-screen bg-black opacity-50" @click="showWorkDescription(4)"></div>
                            <div class="h-screen w-full bg-portfolio fixed top-0 z-103 overflow-hidden lg:w-[700px] lg:h-[95vh] flex flex-col items-center">
                                <button @click="showWorkDescription(4)" :class="['absolute z-103 top-[1vh] right-[3%] cursor-pointer hidden']">
                                    <font-awesome-icon :icon="['fa', 'xmark']" class="text-[26px] text-[#bbb]"/>
                                </button>
                                <div :class="['relative h-[50vh] lg:h-[60vh] w-full overflow-hidden']">
                                    <img @click="expand = !expand" :src="images4[currentIndex]" alt="CompassionLink" class="left-0 w-full h-full object-cover absolute z-102" >
                                </div>
                                <div class="absolute w-full h-[50vh] lg:h-[60vh] top-0">
                                    <button @click="prevImage" :class="['absolute left-0 w-[10%] h-[37px] bg-black/20 z-103 flex justify-center items-center cursor-pointer bottom-0']">
                                        <font-awesome-icon :icon="['fas', 'chevron-left']" class="text-white text-[16px]" />
                                    </button>
                                    <button @click="nextImage" :class="['absolute right-0 w-[10%] h-[37px] bg-black/20 z-103 flex justify-center items-center cursor-pointer bottom-0']">
                                        <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-white text-[16px]" />
                                    </button>
                                 </div>
                                <div :class="['font-poppins font-semibold text-white pt-[15px] pr-[10px] pl-[15px]']" >
                                    <p class="text-[26px] text-navBar1">CompassionLink</p>
                                    <p class="text-[10px] font-[300px] text-[#959595] mb-[15px]">A PATIENTS' DONATIONS PLATFORM</p>
                                    <p class="text-[14px] font-[100px] text-[#F5F5F5] leading-5">
                                        A platform that connects well-wishers to patients in need, enabling secure donations through mobile wallets as well as banks, transparent fund tracking, and timely medical support to improve healthcare outcomes.
                                    </p>
                                    <div class="flex justify-center w-full">
                                        <button @click="showWorkDescription(4)" class="absolute bottom-[7vh] lg:bottom-[4vh] cursor-pointer">
                                            <font-awesome-icon :icon="['fa', 'xmark']" class="text-[26px] text-[#bbb]"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </Teleport>
                
            </div>   
        </div>
    </div>
</template>