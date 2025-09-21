<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ref, onMounted } from 'vue'

const menuOpen = ref(false)
const spinDirection = ref('')

function spinButton() {
  menuOpen.value = !menuOpen.value
  spinDirection.value = menuOpen.value
    ? 'animate-spin-fast-cw'
    : 'animate-spin-fast-ccw'
}

defineProps({
  activeSection: String,
})

defineEmits(['scroll-to'])

const sideBarTrue = ref(false)
onMounted(()=>{
  setTimeout(()=>{
    sideBarTrue.value = true
  }, 1000)
})


</script>

<template>
    <Menu>
      <Transition appear enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0" >
        <MenuButton v-if="sideBarTrue" class="text-white fixed z-100 top-0 right-0 mt-[30px] mr-[3%] sm:mr-[1.5%]  cursor-pointer" @click="spinButton">
          <img src="../assets/icons/hamburger.png" alt="Menu":class="['transition-transform h-[16px] w-[24px] sm:h-[20px] sm:w-[28px]',spinDirection]"  @animationend="spinDirection = ''">
          </img>
        </MenuButton>
      </Transition>
      <transition enter-active-class="transition ease-out duration-400" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-400" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        
        <MenuItems class="flex flex-col divide-y-2 text-[14px] text-black font-poppins fixed z-99 right-0 justify-end items-end ">
            
          <MenuItem v-slot="{ active }" class=" border-2 border-[#2A2F3C] flex justify-center items-end bg-[#1A1F2C]  w-[250px] h-[250px] rounded-full absolute top-0 right-0 z-[100]  -mr-[125px] -mt-[125px]">
            <button  @click="$emit('scroll-to', 'hero'); spinButton()" :class="[active || activeSection === 'hero' ? 'bg-[#252B36]' : 'bg-[#1A1F2C]', 'cursor-pointer']">
              <div class="w-[100%] h-[100%] rounded-full overflow-hidden text-white">
                <svg viewBox="0 0 200 200" class="w-[100%] h-[100%] group">
                  <!-- Define the arc path -->
                  <defs>
                    <path id="HomeArcPath" d="M 30,30 A 100,100 0 0,0 170,170" />
                  </defs>

                  <!-- Attach text to the arc -->
                  <text :class="[activeSection === 'hero' ? 'fill-[#4BD6E5]' : 'fill-white', 'transition-colors duration-100 group-hover:fill-[#4BD6E5]']" font-size="14" text-anchor="middle">
                    <textPath href="#HomeArcPath" startOffset="50%">
                      HOME
                    </textPath>
                  </text>
                </svg>
              </div>
            </button>
          </MenuItem>

          <MenuItem v-slot="{ active }" class="flex justify-center border-2 border-[#2A2F3C] items-end bg-[#1A1F2C]  w-[350px] h-[350px] rounded-full absolute top-0 right-0 z-[99] -mr-[175px] -mt-[175px]">
            <button @click="$emit('scroll-to', 'mySelf'); spinButton()" :class="[active || activeSection === 'mySelf' ? 'bg-[#252B36]' : 'bg-[#1A1F2C]', 'cursor-pointer']">
              <div class="w-[100%] h-[100%] rounded-full overflow-hidden">
                <svg viewBox="0 0 400 400" class="w-full h-full group">
                  <!-- Define the arc path -->
                  <defs>
                    <path id="MyselfArcPath" d="M 73,73 A 100,100 0 0,0 327,327" />
                  </defs>

                  <!-- Attach text to the arc -->
                  <text :class="[activeSection === 'mySelf' ? 'fill-[#4BD6E5]' : 'fill-white', 'transition-colors duration-100 group-hover:fill-[#4BD6E5]']" font-size="20" text-anchor="middle">
                    <textPath href="#MyselfArcPath" startOffset="50%">
                      MYSELF
                    </textPath>
                  </text>
                </svg>
              </div>
            </button>
          </MenuItem>  
          
          <MenuItem v-slot="{ active }" class="flex justify-center border-2 border-[#2A2F3C] items-end bg-[#1A1F2C]  w-[450px] h-[450px] rounded-full absolute top-0 right-0 z-[98] -mr-[225px] -mt-[225px]">
            <button  @click="$emit('scroll-to', 'myWork'); spinButton()" :class="[active || activeSection === 'myWork' ? 'bg-[#252B36]' : 'bg-[#1A1F2C]', 'cursor-pointer']">
              <div class="w-[100%] h-[100%] rounded-full overflow-hidden text-white">
                <svg viewBox="0 0 600 600" class="w-full h-full group">
                  <!-- Define the arc path -->
                  <defs>
                    <path id="MyWorkArcPath" d="M 106,106 A 100,100 0 0,0 494,494" />
                  </defs>

                  <!-- Attach text to the arc -->
                  <text :class="[activeSection === 'myWork' ? 'fill-[#4BD6E5]' : 'fill-white', 'transition-colors duration-100 group-hover:fill-[#4BD6E5]']" font-size="22" text-anchor="middle">
                    <textPath href="#MyWorkArcPath" startOffset="50%">
                      MY WORK
                    </textPath>
                  </text>
                </svg>

              </div>
            </button>
          </MenuItem>    
          
          <MenuItem v-slot="{ active }" class="flex justify-center border-2 border-[#2A2F3C] items-end bg-[#1A1F2C]  w-[550px] h-[550px] rounded-full absolute top-0 right-0 z-[97] -mr-[275px] -mt-[275px]">
            <button @click="$emit('scroll-to', 'myContact'); spinButton()" :class="[active || activeSection === 'myContact' ? 'bg-[#252B36]' : 'bg-[#1A1F2C]', 'cursor-pointer']">
              <div class="w-[100%] h-[100%] rounded-full overflow-hidden text-white">
                <svg viewBox="0 0 800 800" class="w-full h-full group">
                  <!-- Define the arc path -->
                  <defs>
                    <path id="MyContactArcPath" d="M 136,136 A 100,100 0 0,0 664,664" />
                  </defs>

                  <!-- Attach text to the arc -->
                  <text :class="[activeSection === 'myContact' ? 'fill-[#4BD6E5]' : 'fill-white', 'transition-colors duration-100 group-hover:fill-[#4BD6E5]']" font-size="23" text-anchor="middle">
                    <textPath href="#MyContactArcPath" startOffset="50%">
                      CONTACT
                    </textPath>
                  </text>
                </svg>

              </div>
            </button>
          </MenuItem>

        </MenuItems>
      </transition>
    </Menu>
</template>