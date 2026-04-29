<script setup>
    import { ref, onMounted, onUnmounted, reactive, Teleport } from 'vue';
    import { useIntersectionObserver } from '@vueuse/core'

    const portfolio = ref(null)
    const isVisible = ref(false)
    const descriptionVisible = ref(false)
    const description1 = ref(false)
    const description2 = ref(false)
    const description3 = ref(false)
    const description4 = ref(false)
    const description5 = ref(false)

   const handleScroll = () => {
      if (!portfolio.value) return;

      const mySelfHeight = document.getElementById('mySelf')

      const viewportWidth = window.innerWidth;
      
      if (description5.value === false) {

      // ─────────────── Extra Small Devices (Phones) ───────────────
      if (viewportWidth >= 320) {
          mySelfHeight.style.height = "2150px"; // tiny phones

      } else if (viewportWidth >= 360) {
          mySelfHeight.style.height = "1984px"; // 320–359px

      } else if (viewportWidth >= 390) {
          mySelfHeight.style.height = "1891px"; // 360–389px

      } else if (viewportWidth >= 414) {
          mySelfHeight.style.height = "1845px"; // 390–413px

      } else if (viewportWidth >= 450) {
          mySelfHeight.style.height = "1753px"; // 414–449px

      } else if (viewportWidth >= 480) {
          mySelfHeight.style.height = "1708px"; // 450–479px

      // ─────────────── Tailwind sm breakpoint ───────────────
      } else if (viewportWidth >= 640) {
          mySelfHeight.style.height = "1682px";

      // ─────────────── Tailwind md breakpoint ───────────────
      } else if (viewportWidth >= 768) {
          mySelfHeight.style.height = "1752px";

      // ─────────────── Extra mid tablet breakpoint ───────────────
      } else if (viewportWidth >= 900) {
          mySelfHeight.style.height = "1713px";

      // ─────────────── Tailwind lg breakpoint ───────────────
      } else if (viewportWidth >= 1024) {
          mySelfHeight.style.height = "1394px";

      // ─────────────── Extra laptop breakpoints ───────────────
      } else if (viewportWidth >= 1100) {
          mySelfHeight.style.height = "1394px";

      // ─────────────── Tailwind xl breakpoint ───────────────
      } else if (viewportWidth >= 1280) {
          mySelfHeight.style.height = "1394px";

      } else if (viewportWidth >= 1400) {
          mySelfHeight.style.height = "1394px";

      // ─────────────── Tailwind 2xl breakpoint ───────────────
      } else if (viewportWidth >= 1536) {
          mySelfHeight.style.height = "1394px";

      // ─────────────── Ultra wide screens ───────────────
      } else if (viewportWidth >= 1800) {
          mySelfHeight.style.height = "1394px";

      } else {
          mySelfHeight.style.height = "1394px";
      }

      } else {
          mySelfHeight.style.height = "auto";
      }
      const rect = portfolio.value.getBoundingClientRect();
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
      isVisible.value = progress >= 0.08;

      setTimeout(() => {
        descriptionVisible.value = progress >= 0.08;
      }, 100);
      
      
      if(viewportWidth <= 414){
        description1.value = progress >= 0.22;
        description2.value = progress >= 0.35;
        description3.value = progress >= 0.45;
        description4.value = progress >= 0.55;
        description5.value = progress >= 0.65;
      } else if(viewportWidth <= 330){
        description1.value = progress >= 0.22;
        description2.value = progress >= 0.35;
        description3.value = progress >= 0.7;
        description4.value = progress >= 0.75;
        description5.value = progress >= 0.8;
      } else{
        description1.value = progress >= 0.2;
        description2.value = progress >= 0.25;
        description3.value = progress >= 0.35;
        description4.value = progress >= 0.44;
        description5.value = progress >= 0.55;
      }
      
  };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
      handleScroll();
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    });

    defineExpose({
        portfolio
    })

    const loaded = ref(false)

    function onLoad() {
      loaded.value = true
    }

    const workDescription = reactive({
        1 : false,
    })
    function showWorkDescription(No){
        workDescription[No] = !workDescription[No]
    }
    const images1 = ref([
        new URL('@/assets/images/ShopBridge1.jpg', import.meta.url).href,
        new URL('@/assets/images/ShopBridge2.jpg', import.meta.url).href,
        new URL('@/assets/images/ShopBridge3.jpg', import.meta.url).href,
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
  <div :class="['w-full relative flex justify-center z-95 font-robotoMono  pl-[6%] pr-[6%] mb-[50px] sm:pl-[10%] sm:pr-[10%] pt-[80px] text-[14px] sm:text-[16px] md:pl-[8%] md:pr-[8%] lg:pl-[0px] lg:pr-[0px]']" id="mySelf" ref="portfolio">
    <div class="sm:w-[512px] md:w-[671px] lg:w-[900px]">
      <Motion v-if="isVisible" :initial="{ opacity: 0, x: -200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}"
                class="w-full grid grid-cols-[45%_51%] gap-[15px] items-center text-white font-bold mb-[30px] text-[6.0vw] sm:text-[4.7vw] md:text-[4.6vw] lg:text-[5.1vw] xl:text-[4.2vw]">
        <div class="font-poppins text-[#EEEEEE]">My portfolio</div>
        <div class="h-[1px] bg-[#393E46] w-[100%]"></div>
      </Motion>

      <div class="md:flex md:gap-x-[40px] text-[14px]">
        <div class="md:w-[65%]">
          <Motion v-if="descriptionVisible" :initial="{ opacity: 0, x: 200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}" 
                  class="w-full flex items-center space-x-[4%] font-poppins text-[#00ADB5] leading-6 mb-[15px]">
            <div>
              Hi! I'm a Full Stack Web Developer and Cybersecurity Expert who builds secure, fast and SEO-optimized websites and applications that help businesses grow and stand out online. I leverage modern frameworks, scalable infrastructure, and efficient workflows to deliver solutions that are both high-performing and future-ready. My process combines technical precision with creative design, ensuring clean, user-friendly interfaces that work seamlessly across all devices — all while implementing advanced, industry-leading cybersecurity measures.
            </div>
          </Motion>

          <Motion v-if="description1" :initial="{ opacity: 0, x: 200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}" 
                  class="w-full flex items-center space-x-[4%] font-poppins text-[#00ADB5] leading-6 mb-[15px]">
            <div>
              I specialize in delivering complete, end-to-end digital solutions: from architecting databases and integrating payment systems to automating deployments and connecting complex third-party services. Alongside full stack development, I bring deep cybersecurity expertise in networking, web application penetration testing, open-source intelligence (OSINT), and vulnerability analysis. As a professional bug bounty hunter, I actively discover and responsibly disclose security flaws, helping organizations harden their infrastructure and safeguard data from emerging threats.
            </div>
          </Motion>
          <Motion v-if="description2" :initial="{ opacity: 0, x: 200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}" 
                  class="w-full flex items-center space-x-[4%] font-poppins text-[#00ADB5] leading-6 mb-[15px]">
            <div>
              I create Custom Web Applications from concept to launch, develop SEO-Optimized Websites with clean architecture and blazing load speeds, handle Frontend Development with modern JavaScript frameworks, engineer Backend Systems with scalable architectures, deliver RESTful API Development & Integrations, and design intuitive UI/UX in Figma — from wireframes to full mockups. Every project I build is secure, responsive, and mobile-first by default, with layered protection embedded into every stage of development.
            </div>
          </Motion>

          <Motion v-if="description3" :initial="{ opacity: 0, x: 200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}" 
                  class="w-full flex items-center space-x-[4%] font-poppins text-[#00ADB5] leading-6 mb-[15px]">
            <div>
              Clients choose me for my clean, maintainable code, design sensibility, clear communication, and dedication to delivering results on time and within budget. Whether you need a complete end-to-end solution or an expert to strengthen a specific part of your stack, I’m ready to help you build, scale, and secure your next big idea — combining cutting-edge development with strong, proactive cybersecurity.
            </div>
          </Motion>

          <Motion v-if="description4" :initial="{ opacity: 0, x: 200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}" 
                  class="w-full flex flex-col space-x-[4%] font-poppins text-[#00ADB5] leading-6 mb-[20px]">
            <div class="mb-[15px]">
              Over the time I've specialized in many technologies, some of them are...
            </div>
            <div class="text-white flex text-[12px]">
              <ol class="w-[50%]">
                <li class="flex space-x-[8%] items-center mb-[10px]">
                  <font-awesome-icon :icon="['fas', 'caret-right']"  class="text-[#00adb5]" />
                  <p>JavaScipt</p>
                </li>
                <li class="flex space-x-[8%] items-center mb-[10px]">
                  <font-awesome-icon :icon="['fas', 'caret-right']"  class="text-[#00adb5]" />
                  <p>PHP</p>
                </li>
                <li class="flex space-x-[8%] items-center mb-[10px]">
                  <font-awesome-icon :icon="['fas', 'caret-right']"  class="text-[#00adb5]" />
                  <p>Tailwind CSS</p>
                </li>
                <li class="flex space-x-[8%] items-center mb-[10px]">
                  <font-awesome-icon :icon="['fas', 'caret-right']"  class="text-[#00adb5]" />
                  <p>Bootstrap</p>
                </li>
                <li class="flex space-x-[8%] items-center mb-[10px]">
                  <font-awesome-icon :icon="['fas', 'caret-right']"  class="text-[#00adb5]" />
                  <p>Livewire</p>
                </li>
              </ol>

              <ol class="w-[50%]">
                <li class="flex space-x-[8%] items-center mb-[10px]">
                  <font-awesome-icon :icon="['fas', 'caret-right']"  class="text-[#00adb5]" />
                  <p>Laravel</p>
                </li>
                <li class="flex space-x-[8%] items-center mb-[10px]">
                  <font-awesome-icon :icon="['fas', 'caret-right']"  class="text-[#00adb5]" />
                  <p>VueJs</p>
                </li>
                <li class="flex space-x-[8%] items-center mb-[10px]">
                  <font-awesome-icon :icon="['fas', 'caret-right']"  class="text-[#00adb5]" />
                  <p>MySQL</p>
                </li>
                <li class="flex space-x-[8%] items-center mb-[10px]">
                  <font-awesome-icon :icon="['fas', 'caret-right']"  class="text-[#00adb5]" />
                  <p>Python</p>
                </li>
                <li class="flex space-x-[8%] items-center mb-[10px]">
                  <font-awesome-icon :icon="['fas', 'caret-right']"  class="text-[#00adb5]" />
                  <p>C/C++</p>
                </li>
              </ol>
            </div>
          </Motion>

          <Motion v-if="description4" :initial="{ opacity: 0, x: 200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}" 
                  class="w-full flex flex-col space-x-[4%] font-poppins text-[#00ADB5] leading-6 mb-[70px]">
            <div class="mb-[15px]">
              Other specialized services:
            </div>
            <div class="text-white flex text-[12px]">
              <ol class="w-[50%]">
                <li class="flex space-x-[8%] items-center mb-[10px]">
                  <font-awesome-icon :icon="['fas', 'caret-right']"  class="text-[#00adb5]" />
                  <div class="flex justify-between w-full pr-[5%]">
                      <p @click="[showWorkDescription(1), activeGallery = images1]" class="w-[200px] h-[42px] border-2 border-viewSiteB hover:bg-viewSiteB cursor-pointer bg-viewSiteB text-[14px] flex justify-center items-center">Bagisto Development</p>
                  </div>
                </li>
              </ol>
            </div>
            <Teleport to="body">
                <Transition name="workDescription" appear>
                    <div v-if="workDescription[1]" class="w-full fixed left-0 right-0 top-0 z-102 h-screen flex justify-center">
                        <div class="w-full fixed top-0 z-102 h-screen bg-black opacity-50" @click="showWorkDescription(1)"></div>
                        <div class="h-screen w-full bg-portfolio fixed top-0 z-103 overflow-hidden lg:w-[700px] lg:h-[95vh] flex flex-col items-center">
                            <button @click="showWorkDescription(1)" :class="['absolute z-103 top-[1vh] right-[3%] cursor-pointer hidden']">
                                <font-awesome-icon :icon="['fa', 'xmark']" class="text-[26px] text-xcloseModal"/>
                            </button>
                            <div :class="['relative h-[50vh] lg:h-[60vh] w-full overflow-hidden']">
                                <img @click="expand = !expand" @load="onLoad" :class="{ 'hidden': !loaded }" :src="images1[currentIndex]" alt="ShopBridge" class=" left-0 w-full h-full object-cover absolute z-102" >
                                <div v-if="!loaded" class="left-0 w-full h-full absolute z-102 bg-gray-300 animate-pulse">

                                </div>
                            </div>
                            <div class="absolute w-full h-[50vh] lg:h-[60vh] top-0 ">
                                <button @click="prevImage" :class="['absolute left-0 w-[10%] h-[37px] bg-black/20 z-103 flex justify-center items-center cursor-pointer bottom-0']">
                                    <font-awesome-icon :icon="['fas', 'chevron-left']" class="text-white text-[16px]" />
                                </button>
                                <button @click="nextImage" :class="['absolute right-0 w-[10%] h-[37px] bg-black/20 z-103 flex justify-center items-center cursor-pointer bottom-0']">
                                    <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-white text-[16px]" />
                                </button>
                              </div>
                            <div :class="['font-poppins font-semibold text-white pt-[15px] pr-[10px] pl-[15px]']" >
                                <div class="flex flex-col items-center">
                                    <p class="text-[26px] text-navBar1">Bagisto Development</p>
                                    <p class="text-[10px] font-[300px] text-[#959595] mb-[15px]">AN OPEN SOURCE ECOMMERCE PLATFORM</p>
                                </div>
                                <p class="text-[14px] font-[100px] text-[#F5F5F5] leading-5 mb-[40px]">
                                  I provide comprehensive eCommerce solutions using 
                                  <a href="https://bagisto.com" target="_blank" class="text-blue-500 hover:underline">Bagisto</a>
                                  , including store development, custom module and plugin development, seamless API integrations for payments, shipping, and ERP systems, as well as performance optimization and security enhancements to ensure your platform is fast, reliable, and secure.
                                </p>
                                <div class="flex justify-between w-full pr-[5%]">
                                    <a target="_blank" rel="noopener noreferrer" href="https://ecommerce.livesite.click" class="w-[110px] h-[35px] border-2 border-viewSiteB hover:bg-viewSiteB text-[14px] flex justify-center items-center">VIEW SITE</a>
                                    <button @click="showWorkDescription(1)" class="cursor-pointer">
                                        <font-awesome-icon :icon="['fa', 'xmark']" class="text-[26px] text-[#bbb]"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </Teleport>
          </Motion>
        </div>

        <Motion v-if="description5" :initial="{ opacity: 0, x: -200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}" 
                class="w-full flex justify-center text-[#00ADB5] md:w-[35%] md:hidden">
          <div class="relative  h-[313px] xs:w-[250px] rounded-[4px] overflow-visible border-[3px] border-white">
            <img @load="onLoad" :class="{ 'hidden': !loaded }" src="../assets/images/profile.jpg" alt="Profile" class="absolute w-[250px] h-[313px] object-contain rounded-[4px] -translate-x-[7%] -translate-y-[7%]">
            <div v-if="!loaded" class="absolute w-[250px] h-[313px] rounded-[4px] bg-gray-300 animate-pulse"> 
            </div>          
          </div>
        </Motion>
        <Motion v-if="descriptionVisible" :initial="{ opacity: 0, x: -200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}" 
                class="justify-center text-[#00ADB5] md:w-[40%] lg:w-[35%] hidden md:flex ">
          <div class="relative h-[313px] xs:w-[250px] rounded-[4px] overflow-visible border-[3px] border-white">
            <img @load="onLoad" :class="{ 'hidden': !loaded }" src="../assets/images/profile.jpg" alt="Profile" class="absolute w-[250px] h-[313px] object-contain rounded-[4px] -translate-x-[7%] -translate-y-[7%]">
            <div v-if="!loaded"  class="absolute w-[250px] h-[313px] rounded-[4px] bg-gray-300 animate-pulse">
              
            </div>          
          </div>
        </Motion>
      </div>
    </div>
  </div>

</template>