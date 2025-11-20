<script setup>
    import { ref, onMounted, onUnmounted, shallowRef} from 'vue';
    import axiosClient from '../axios';
    const processing = ref(false)
    const buttonText = ref('SUBMIT')
    const successfullySent = ref(false)
    const form = shallowRef({
        name : '',
        email : '',
        message : '',
    })
    
    const errorMessage = shallowRef({
        name : '',
        email : '',
        message : '',
    })
    function clearError(field) {
        // Only clear if there is an error
        if (errorMessage.value[field] && errorMessage.value[field].length > 0) {
            errorMessage.value = {
                ...errorMessage.value,
                [field]: [],
            }
        }
    }
    function submit()  {
        processing.value = true
        axiosClient.get('/sanctum/csrf-cookie').then(response => {
            axiosClient.post('/api/sendMessage', form.value)
            .then( response => {
                console.log("Message Sent successfully")
                form.value = { name: '', email: '', message: '' }
                buttonText.value = 'Received'      // Change text
                successfullySent.value = true
                setTimeout(() => {
                    buttonText.value = 'SUBMIT'      // Back to default after 3s
                    successfullySent.value = false
                }, 2000)
            })
            .catch(error => {
               errorMessage.value = error.response.data.errors
               console.log(errorMessage.value)
            }).finally(() => {
                processing.value = false
            })
        });
    }

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
    <div class="relative w-full pt-[80px] font-poppins font-semibold h-[1140.57px]" id="myContact" ref="contacts">
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
                <Motion  v-if="formVisible" :initial="{ opacity: 0, y: 200, scale: 0.2 }" :enter="{opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}"
                        class="w-full flex justify-center">
                    <form @submit.prevent ="submit" class="flex flex-col items-center w-full lg:w-[730px] xl:w-[800px] md:w-[630px]">
                        <div class="flex flex-col w-[92%] space-y-[10px] mb-[15px]">
                            <input required name="name" v-model="form.name" type="text" placeholder="Name" @input="clearError('name')" class="bg-contactInputBg rounded-[1px] text-[16px] pl-[15px] pr-[15px] font-light focus:outline-none focus:ring-0 autofill:shadow-[inset_0_0_0px_1000px_rgb(31,31,35)]">
                            <Motion :initial="{ opacity: 0, scale: 0.2 }" :enter="{opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}" class="w-full flex pl-[2%] pr-[2%]">
                                <p v-if="errorMessage.name && errorMessage.name[0]" class="text-red-500 text-[12px] mt-1 leading-[1.5]">
                                    {{ errorMessage.name[0] }}
                                </p>
                            </Motion>
                            <input required name="email" v-model="form.email" type="text" placeholder="Enter email" @input="clearError('email')" class="bg-contactInputBg rounded-[1px] text-[16px] pl-[15px] pr-[15px] font-light focus:outline-none focus:ring-0 autofill:shadow-[inset_0_0_0px_1000px_rgb(31,31,35)]">
                            <Motion :initial="{ opacity: 0, scale: 0.2 }" :enter="{opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}" class="w-full flex pl-[2%] pr-[2%]">
                                <p v-if="errorMessage.email && errorMessage.email[0]" class="text-red-500 text-[12px] mt-1 leading-[1.5]">
                                    {{ errorMessage.email[0] }}
                                </p>
                            </motion>
                            <textarea required name="message" v-model="form.message" type="email" placeholder="Your Message" @input="clearError('message')" class="bg-contactInputBg h-[150px] rounded-[1px] text-[16px] pl-[15px] pr-[15px] pt-[10px] pb-[10px] font-light focus:outline-none focus:ring-0 leading-normal"></textarea>  
                            <div>
                            <Motion :initial="{ opacity: 0, scale: 0.2 }" :enter="{opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 20 }}" class="w-full flex pl-[2%] pr-[2%] autofill:shadow-[inset_0_0_0px_1000px_rgb(31,31,35)]">
                                <p v-if="errorMessage.message && errorMessage.message[0]" class="text-red-500 text-[12px] mt-1 leading-[1.5]">
                                    {{ errorMessage.message[0] }}
                                </p>
                            </motion>
                            </div>
                        </div>
                        <Motion :initial="{ opacity: 1 }" :enter="{opacity: 1}" class="w-[95%] flex justify-end pr-[1.5%]">
                            <button :disabled="processing" :class="['hover:bg-[#00ADB5] active:bg-[#00ADB5] hover:border-[#00ADB5] active:border-[#00ADB5] cursor-pointer border-white border-2 w-[120px] text-[16px] h-[45px] font-normal flex justify-center items-center gap-1 text-white', successfullySent ? 'bg-[#00ADB5] border-[#00ADB5] border-none pl-[7px]' : 'border-white']">
                                <span>{{ buttonText }}</span>
                                <span v-if="successfullySent">😊</span>
                            </button>
                        </Motion>
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
                    <a href="https://wa.me/265997967304" target="_blank" rel="noopener noreferrer">
                        <div class="w-[50px] h-[50px] bg-cardBg flex justify-center items-center cursor-pointer">
                            <font-awesome-icon :icon="['fab', 'whatsapp']" class="text-white text-[25px] transition duration-300 hover:drop-shadow-[0_0_12px_#00c1a1]" />
                        </div>
                    </a>
                    <a href="https://www.facebook.com/share/1VUjXCi9rt/?mibextid=qi2Omg" target="_blank" rel="noopener noreferrer">
                        <div class="w-[50px] h-[50px] bg-cardBg flex justify-center items-center cursor-pointer">
                            <font-awesome-icon icon="fa-brands fa-square-facebook" class="text-white text-[24px] transition duration-300 hover:drop-shadow-[0_0_12px_#00c1a1]"/>
                        </div>
                    </a>
                    <a href="mailto:kondwanikawere1@gmail.com">
                        <div class="w-[50px] h-[50px] bg-cardBg flex justify-center items-center cursor-pointer">
                            <img src="../assets/icons/gmail.svg" alt="" class="w-[25px] h-[25px] transition duration-300 hover:drop-shadow-[0_0_12px_#00c1a1]">
                        </div>
                    </a>
                    <a href="https://www.linkedin.com/in/kondwani-kawere-86a65729b" target="_blank" rel="noopener noreferrer">
                        <div class="w-[50px] h-[50px] bg-cardBg flex justify-center items-center cursor-pointer">
                            <font-awesome-icon :icon="['fab', 'linkedin']" class="text-white text-[25px] transition duration-300 hover:drop-shadow-[0_0_12px_#00c1a1]" />
                        </div>
                    </a>
                </div>
                <p class="text-[13px] text-[#8f9aa7] font-light">Kondwani Kawere <span class="text-[#e31b6d]">©2025</span></p>
            </div>
         </transition>
    </div>
</template>



