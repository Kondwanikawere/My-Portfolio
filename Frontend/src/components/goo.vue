<script>
</script>
<template>

    -mr-[100px] -mt-[100px]

        <MenuItem v-slot="{ active }" class="flex justify-center items-end bg-red-600  w-[200px] h-[200px] rotate-[45deg] rounded-full text-white note pb-[10px] -mr-[80px] -mt-[80px]">
          <RouterLink href="#" :class="[active ? 'bg-gray-100' : 'bg-red-600']">
            <div class="w-[100%] h-[100%] rounded-full overflow-hidden rotate-[25deg]">
              <svg viewBox="0 0 200 200" class="w-[100%] h-[100%] rounded-full">
                <!-- Define the arc path -->
                <defs>
                  <path id="arcPath" d="M 10,135 A 90,90 0 0,0 190,50" />
                </defs>

                <!-- Attach text to the arc -->
                <text fill="white" font-size="20" text-anchor="middle">
                  <textPath href="#arcPath" startOffset="50%">
                    Home
                  </textPath>
                </text>
              </svg>
            </div>
          </RouterLink>
        </MenuItem>

        <path id="arcPath" d="M 80,0 A 90,90 0 0,0 200,100" />

      <MenuItems class="w-[550px] h-[550px] border-none flex flex-col divide-y-2 text-[14px] border-hBackground text-black fixed z-10 right-0 justify-end items-end ">
          
        <MenuItem v-slot="{ active }" class="w-[] border-2 border-amber-400 flex justify-center items-end bg-red-600  w-[45.5%] h-[45.5%] rounded-full absolute top-0 right-0 z-[100]  -mr-[22.8%] -mt-[22.8%]">
          <RouterLink :to="{ name: 'trending'}" :class="[active ? 'bg-gray-100' : 'bg-red-600']">
            <div class="w-[100%] h-[100%] rounded-full overflow-hidden text-white">
              <svg viewBox="0 0 200 200" class="w-[100%] h-[100%]">
                <!-- Define the arc path -->
                <defs>
                  <path id="HomeArcPath" d="M 30,30 A 100,100 0 0,0 170,170" />
                </defs>

                <!-- Attach text to the arc -->
                <text fill="white" font-size="14" text-anchor="middle">
                  <textPath href="#HomeArcPath" startOffset="50%">
                    HOME
                  </textPath>
                </text>
              </svg>
            </div>
          </RouterLink>
        </MenuItem>

        <MenuItem v-slot="{ active }" class="flex justify-center items-end bg-red-600  w-[63.6%] h-[63.6%] rounded-full absolute top-0 right-0 z-[99] -mr-[31.8%] -mt-[31.8%]">
          <RouterLink :to="{ name: 'latest'}" :class="[active ? 'bg-gray-100' : 'bg-red-600']">
            <div class="w-[100%] h-[100%] rounded-full overflow-hidden text-white">
              <svg viewBox="0 0 400 400" class="w-full h-full">
                <!-- Define the arc path -->
                <defs>
                  <path id="MyselfArcPath" d="M 73,73 A 100,100 0 0,0 327,327" />
                </defs>

                <!-- Attach text to the arc -->
                <text fill="white" font-size="20" text-anchor="middle">
                  <textPath href="#MyselfArcPath" startOffset="50%">
                    MYSELF
                  </textPath>
                </text>
              </svg>

            </div>
          </RouterLink>
        </MenuItem>  
        
        <MenuItem v-slot="{ active }" class="flex justify-center items-end bg-red-600  w-[81.8%] h-[81.8%] rounded-full absolute top-0 right-0 z-[98] -mr-[40.9%] -mt-[40.9%]">
          <RouterLink :to="{ name: 'latest'}" :class="[active ? 'bg-gray-100' : 'bg-red-600']">
            <div class="w-[100%] h-[100%] rounded-full overflow-hidden text-white">
              <svg viewBox="0 0 600 600" class="w-full h-full">
                <!-- Define the arc path -->
                <defs>
                  <path id="MyWorkArcPath" d="M 106,106 A 100,100 0 0,0 494,494" />
                </defs>

                <!-- Attach text to the arc -->
                <text fill="white" font-size="22" text-anchor="middle">
                  <textPath href="#MyWorkArcPath" startOffset="50%">
                    MY WORK
                  </textPath>
                </text>
              </svg>

            </div>
          </RouterLink>
        </MenuItem>    
        
        <MenuItem v-slot="{ active }" class="flex justify-center items-end bg-red-600  w-[100%] h-[100%] rounded-full absolute top-0 right-0 z-[97] -mr-[50%] -mt-[50%]">
          <RouterLink :to="{ name: 'latest'}" :class="[active ? 'bg-gray-100' : 'bg-red-600']">
            <div class="w-[100%] h-[100%] rounded-full overflow-hidden text-white">
              <svg viewBox="0 0 800 800" class="w-full h-full">
                <!-- Define the arc path -->
                <defs>
                  <path id="MyContactArcPath" d="M 136,136 A 100,100 0 0,0 664,664" />
                </defs>

                <!-- Attach text to the arc -->
                <text fill="white" font-size="23" text-anchor="middle">
                  <textPath href="#MyContactArcPath" startOffset="50%">
                    CONTACT
                  </textPath>
                </text>
              </svg>

            </div>
          </RouterLink>
        </MenuItem>

      </MenuItems>      
      
      <MenuItems class="flex flex-col divide-y-2 text-[14px]  border-hBackground w-[30%] text-black fixed z-10 right-0 justify-end items-end ">
          
        <MenuItem v-slot="{ active }" class=" border-2 border-amber-400 flex justify-center items-end bg-red-600  w-[250px] h-[250px] rounded-full absolute top-0 right-0 z-[100]  -mr-[125px] -mt-[125px]">
          <RouterLink :to="{ name: 'trending'}" :class="[active ? 'bg-gray-100' : 'bg-red-600']">
            <div class="w-[100%] h-[100%] rounded-full overflow-hidden text-white">
              <svg viewBox="0 0 200 200" class="w-[100%] h-[100%]">
                <!-- Define the arc path -->
                <defs>
                  <path id="HomeArcPath" d="M 30,30 A 100,100 0 0,0 170,170" />
                </defs>

                <!-- Attach text to the arc -->
                <text fill="white" font-size="14" text-anchor="middle">
                  <textPath href="#HomeArcPath" startOffset="50%">
                    HOME
                  </textPath>
                </text>
              </svg>
            </div>
          </RouterLink>
        </MenuItem>

        <MenuItem v-slot="{ active }" class="flex justify-center items-end bg-red-600  w-[350px] h-[350px] rounded-full absolute top-0 right-0 z-[99] -mr-[175px] -mt-[175px]">
          <RouterLink :to="{ name: 'latest'}" :class="[active ? 'bg-gray-100' : 'bg-red-600']">
            <div class="w-[100%] h-[100%] rounded-full overflow-hidden text-white">
              <svg viewBox="0 0 400 400" class="w-full h-full">
                <!-- Define the arc path -->
                <defs>
                  <path id="MyselfArcPath" d="M 73,73 A 100,100 0 0,0 327,327" />
                </defs>

                <!-- Attach text to the arc -->
                <text fill="white" font-size="20" text-anchor="middle">
                  <textPath href="#MyselfArcPath" startOffset="50%">
                    MYSELF
                  </textPath>
                </text>
              </svg>

            </div>
          </RouterLink>
        </MenuItem>  
        
        <MenuItem v-slot="{ active }" class="flex justify-center items-end bg-red-600  w-[450px] h-[450px] rounded-full absolute top-0 right-0 z-[98] -mr-[225px] -mt-[225px]">
          <RouterLink :to="{ name: 'latest'}" :class="[active ? 'bg-gray-100' : 'bg-red-600']">
            <div class="w-[100%] h-[100%] rounded-full overflow-hidden text-white">
              <svg viewBox="0 0 600 600" class="w-full h-full">
                <!-- Define the arc path -->
                <defs>
                  <path id="MyWorkArcPath" d="M 106,106 A 100,100 0 0,0 494,494" />
                </defs>

                <!-- Attach text to the arc -->
                <text fill="white" font-size="22" text-anchor="middle">
                  <textPath href="#MyWorkArcPath" startOffset="50%">
                    MY WORK
                  </textPath>
                </text>
              </svg>

            </div>
          </RouterLink>
        </MenuItem>    
        
        <MenuItem v-slot="{ active }" class="flex justify-center items-end bg-red-600  w-[550px] h-[550px] rounded-full absolute top-0 right-0 z-[97] -mr-[275px] -mt-[275px]">
          <RouterLink :to="{ name: 'latest'}" :class="[active ? 'bg-gray-100' : 'bg-red-600']">
            <div class="w-[100%] h-[100%] rounded-full overflow-hidden text-white">
              <svg viewBox="0 0 800 800" class="w-full h-full">
                <!-- Define the arc path -->
                <defs>
                  <path id="MyContactArcPath" d="M 136,136 A 100,100 0 0,0 664,664" />
                </defs>

                <!-- Attach text to the arc -->
                <text fill="white" font-size="23" text-anchor="middle">
                  <textPath href="#MyContactArcPath" startOffset="50%">
                    CONTACT
                  </textPath>
                </text>
              </svg>

            </div>
          </RouterLink>
        </MenuItem>

      </MenuItems>

      useIntersectionObserver(
      portfolio,
      ([entry]) => {
        const ratio = entry.intersectionRatio;
        console.log('Intersection ratio:', ratio);

        isVisible.value = ratio >= 0.2;
        setTimeout(() => {
          descriptionVisible.value = ratio >= 0.2;
        }, 100);

        description1.value = ratio >= 0.4;
        description2.value = ratio >= 0.6;
        description3.value = ratio >= 0.8;
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1], once: false }
    );


    const handleScroll = () => {
      if (!portfolio.value) return;

      const rect = portfolio.value.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // How much of the element is in view
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(viewportHeight, rect.bottom);
      const visibleHeight = visibleBottom - visibleTop;
      const totalHeight = rect.height;

      const ratio = visibleHeight / totalHeight;
      console.log('Scroll-based ratio:', ratio.toFixed(2));

      // Threshold-based triggers
      isVisible.value = ratio >= 0.2;

      setTimeout(() => {
        descriptionVisible.value = ratio >= 0.2;
      }, 100);

      description1.value = ratio >= 0.4;
      description2.value = ratio >= 0.6;
      description3.value = ratio >= 0.8;
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
      handleScroll(); // initial check
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    });






            <div class="w-full mb-[60px]" id="card3">
            <div v-if="card3Visible" class="w-full mb-[25px]">
                <Motion :initial="{ opacity: 0, x: -200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}"
                    class="w-full flex flex-col items-center text-navBar1 font-bold">
                    <div class="w-[90%]">
                        <div class="mb-[20px] text-[24px] cursor-pointer w-[98%]">School Management Sys</div>
                        <div class="w-[100%] rounded-[4px] h-[325px] cursor-pointer overflow-hidden">
                            <img src="../assets/images/profile.jpg" alt="MusicStream" class="w-[100%] h-[100%] rounded-[4px] hover:scale-110">
                        </div>
                    </div>
                </Motion>
            </div>

            <Motion v-if="technologies3Visible" :initial="{ opacity: 0, x: -200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}"
                    class="w-full flex flex-col items-center text-navBar1 font-bold">
                    <div class="w-[90%]">
                        <div class="text-[13px]">
                            Laravel | Vue 3 | Tailwind
                        </div>
                    </div>
            </Motion>
        </div> 
        
        
        <div class="w-full z-0 absolute top-0" id="wrapper" :style="{ height: totalPageHeight + 'vh' }">
</template>