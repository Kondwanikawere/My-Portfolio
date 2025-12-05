<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
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

</script>

<template>
  <div :class="['w-full relative flex justify-center z-95 font-robotoMono  pl-[6%] pr-[6%] mb-[50px] sm:pl-[10%] sm:pr-[10%] pt-[80px] text-[14px] sm:text-[16px] md:pl-[8%] md:pr-[8%] lg:pl-[0px] lg:pr-[0px]']" id="mySelf" ref="portfolio">
    <div class="sm:w-[512px] md:w-[671px] lg:w-[900px]">
      <Motion v-if="isVisible" :initial="{ opacity: 0, x: -200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}"
                class="w-full grid grid-cols-[45%_51%] gap-[15px] items-center text-white font-bold mb-[30px] text-[6.4vw] sm:text-[4.7vw] md:text-[4.6vw] lg:text-[5.1vw] xl:text-[4.2vw]">
        <div class="font-poppins text-[#EEEEEE]">My portfolio</div>
        <div class="h-[1px] bg-[#393E46] w-[100%]"></div>
      </Motion>

      <div class="md:flex md:gap-x-[40px] text-[14px]">
        <div class="md:w-[65%]">
          <Motion v-if="descriptionVisible" :initial="{ opacity: 0, x: 200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}" 
                  class="w-full flex items-center space-x-[4%] font-poppins text-[#00ADB5] leading-6 mb-[15px]">
            <div>
              Hi! I'm a Full Stack Web Developer and Cybersecurity Expert who builds secure, lightning-fast, and SEO-optimized websites and applications that help businesses grow and stand out online. I leverage modern frameworks, scalable infrastructure, and efficient workflows to deliver solutions that are both high-performing and future-ready. My process combines technical precision with creative design, ensuring clean, user-friendly interfaces that work seamlessly across all devices — all while implementing advanced, industry-leading cybersecurity measures.
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
                  class="w-full flex flex-col space-x-[4%] font-poppins text-[#00ADB5] leading-6 mb-[70px]">
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
        </div>

        <Motion v-if="description5" :initial="{ opacity: 0, x: -200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}" 
                class="w-full flex justify-center text-[#00ADB5] md:w-[35%] md:hidden">
          <div class="relative  h-[313px] xs:w-[250px] rounded-[4px] overflow-visible border-[3px] border-white">
            <img src="../assets/images/profile.jpg" alt="Profile" class="absolute w-[250px] h-[313px] object-contain rounded-[4px] -translate-x-[7%] -translate-y-[7%]">
          </div>
        </Motion>
        <Motion v-if="descriptionVisible" :initial="{ opacity: 0, x: -200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}" 
                class="justify-center text-[#00ADB5] md:w-[40%] lg:w-[35%] hidden md:flex ">
          <div class="relative h-[313px] xs:w-[250px] rounded-[4px] overflow-visible border-[3px] border-white">
            <img src="../assets/images/profile.jpg" alt="Profile" class="absolute w-[250px] h-[313px] object-contain rounded-[4px] -translate-x-[7%] -translate-y-[7%]">
          </div>
        </Motion>
      </div>
    </div>
  </div>

</template>