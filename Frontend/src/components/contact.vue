<script setup>
    import { ref, onMounted, onUnmounted} from 'vue';

    const contacts = ref(null)
    const contactVisible = ref(null)
    const questionVisible = ref(null)
    const formVisible = ref(null)
    const footerVisible = ref(null)

    defineExpose({
        contacts
    })

    defineEmits(['scroll-to'])

    const myContactScroll = () => {
      if (!contacts.value) return;

      const rect = contacts.value.getBoundingClientRect();
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
      contactVisible.value = progress >= 0.15;
      questionVisible.value = progress >= 0.2;
      formVisible.value = progress >= 0.3;
      footerVisible.value = progress >= 0.47;
    };

    onMounted(() => {
      window.addEventListener('scroll', myContactScroll);
      window.addEventListener('resize', myContactScroll);
      myContactScroll();
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', myContactScroll);
      window.removeEventListener('resize', myContactScroll);
    });

</script>

<template>
    <div class="relative h-[1140.57px] w-full pt-[80px] font-poppins font-semibold" id="myContact" ref="contacts">
        <div class="relative border-t-1 border-[#393E46] w-full bg-cardBg pt-[170px] pb-[100px]">
            <div class="absolute w-full h-[80px] flex items-center justify-center pt-0 top-0"> 
                <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full bg-cardBg"  viewBox="0 0 100 102" preserveAspectRatio="none"><path fill="#222831" d="M0 0 L50 100 L100 0 Z"/></svg>
            </div>
            <div class="w-full flex flex-col items-center leading-[50px]">
                <Motion v-if="contactVisible" :initial="{ opacity: 0, x: -200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}">
                    <p class="text-[12vw] md:text-[60px] mb-[40px]">CONTACT</p>
                </Motion>
                <Motion v-if="questionVisible" :initial="{ opacity: 0, x: 200, scale: 0.2 }" :enter="{opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}"
                        class="flex flex-col items-center">
                    <div class="h-[4px] w-[30%] md:w-[110px] bg-white mb-[40px] md:mb-[30px]"></div>
                    <div class="text-[14px] md:text-[14px] font-[600px] text-cyanBlue mb-[40px]">Have a question or want to work together?</div>
                </Motion>
                <Motion v-if="formVisible" :initial="{ opacity: 0, y: 200, scale: 0.2 }" :enter="{opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}"
                        class="w-full flex justify-center">
                    <form action="" class="flex flex-col items-center w-full lg:w-[730px] xl:w-[800px] md:w-[630px]">
                        <div class="flex flex-col w-[92%] space-y-[10px] mb-[15px]">
                            <input type="text" placeholder="Name" class="bg-contactInputBg rounded-[1px] text-[16px] pl-[15px] pr-[15px] font-light focus:outline-none focus:ring-0">
                            <input type="text" placeholder="Enter email" class="bg-contactInputBg rounded-[1px] text-[16px] pl-[15px] pr-[15px] font-light focus:outline-none focus:ring-0">
                            <textarea name="" id="" placeholder="Your Message" class="bg-contactInputBg h-[150px] rounded-[1px] text-[16px] pl-[15px] pr-[15px] pt-[10px] pb-[10px] font-light focus:outline-none focus:ring-0 leading-normal"></textarea>
                        </div>
                        <div class="w-[95%] flex justify-end pr-[1.5%]">
                            <button class="cursor-pointer border-white border-2 w-[120px] text-[16px] h-[45px] font-normal flex justify-center items-center">
                                SUBMIT
                            </button>
                        </div>
                    </form>
                </Motion>
            </div>
        </div>

        <transition
            enter-active-class="transition duration-500 ease-out"
            enter-from-class="opacity-0 translate-y-10 scale-50"
            enter-to-class="opacity-100 translate-y-0 scale-100">
            <div v-if="footerVisible" class="flex w-full flex-col items-center">
                <button @click="$emit('scroll-to', 'hero')" class="cursor-pointer h-[50px] w-[45px] -translate-y-[25px] bg-[#e31b6d] flex justify-center items-center mb-[20px]">
                    <img src="../assets/icons/upChevron.png" class="w-[25px] h-[25px]">
                </button>
                <div class="flex w-full justify-center space-x-[30px] mb-[35px]">
                    <div class="w-[50px] h-[50px] bg-cardBg flex justify-center items-center cursor-pointer">
                        <font-awesome-icon :icon="['fab', 'whatsapp']" class="text-white text-[25px] transition duration-300 hover:drop-shadow-[0_0_12px_#00c1a1]" />
                    </div>
                    <div class="w-[50px] h-[50px] bg-cardBg flex justify-center items-center cursor-pointer">
                        <font-awesome-icon icon="fa-brands fa-square-facebook" class="text-white text-[24px] transition duration-300 hover:drop-shadow-[0_0_12px_#00c1a1]"/>
                    </div>
                    <div class="w-[50px] h-[50px] bg-cardBg flex justify-center items-center cursor-pointer">
                        <img src="../assets/icons/gmail.svg" alt="" class="w-[25px] h-[25px] transition duration-300 hover:drop-shadow-[0_0_12px_#00c1a1]">
                    </div>
                </div>
                <p class="text-[13px] text-[#8f9aa7] font-light">Kondwani Kawere <span class="text-[#e31b6d]">©2025</span></p>
            </div>
         </transition>
    </div>
</template>



