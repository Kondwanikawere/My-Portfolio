<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted,onBeforeMount } from 'vue';
import textInput  from '../../components/textInput.vue';
import router from '../../router';
import axiosClient from '../../axios';

const processing = ref(false)
const form = ref({
    email : '',
    password : '',
    remember : '',
})

const errorMessage = ref({
    email : ''
})
function submit()  {
    processing.value = true
    axiosClient.get('/sanctum/csrf-cookie').then(response => {
        axiosClient.post('/login', form.value)
        .then( response => {
            router.push({name : 'admin'})
        })
        .catch(error => {
            errorMessage.value = error.response.data.errors
            form.value.password = '';
        }).finally(() => {
            processing.value = false
        })
    });
}

onBeforeMount(async () => {
    try {
        await axiosClient.get('/sanctum/csrf-cookie');
        
        const response = await axiosClient.get('/api/user', {
            metadata: { routeName: router.currentRoute.value.name }
        });
        if (response && response.status === 200) {
            router.push({ name: 'admin' });
        }
    } catch (error) {
        
    }
});
</script>
<template>
    <div class="flex w-full h-screen relative bg-background">
        <div class="flex flex-col items-center pt-[20vh] w-full text-black">
            <div class="grid w-[88%]">
                <p class="font-PetitFormalScript text-textRed text-[30px] justify-self-center">Messages</p>
            </div>  
            <div class="w-[360px] sb3:w-[400px]">
                <form @submit.prevent ="submit" class="flex flex-col text-white w-full text-[20px] pl-[2%] pt-[47px] gap-y-[1.313rem]">
                    <textInput name="email" v-model="form.email" placeholder="email" type="email" ></textInput>
                    <textInput name="password" v-model="form.password" placeholder="Password" type="password"  :message="errorMessage.email[0]"></textInput>
                    <div class="flex w-[100%]">
                        <button id="submit" class="bg-textRed cursor-pointer h-[45px] rounded-[10px] pr-[8%] w-[100%] disabled:opacity-60" :disabled="processing.value"><p>Sign in</p></button>
                    </div>
                </form>
            </div> 
            <div class="flex gap-x-2 pl-4 pt-2 text-white">
                <input type="checkbox" v-model="form.remember" id="remember">
                <label for="remember" >Remember me</label>
            </div>
        </div>
    </div>
</template>