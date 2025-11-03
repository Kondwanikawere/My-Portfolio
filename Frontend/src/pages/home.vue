<script setup>
  import { ref, onMounted, onUnmounted, onBeforeUnmount, computed, nextTick } from 'vue'
  import hero from '../components/hero.vue'
  import sideBar from '../components/menu.vue'
  import mySelf from '../components/mySelf.vue'
  import myWork from '@/components/myWork.vue'
  import contact from '@/components/contact.vue'
  import { gsap } from "gsap";
  import { ScrollToPlugin } from "gsap/ScrollToPlugin";

  gsap.registerPlugin(ScrollToPlugin);

  const sections = [
    { id: 'hero'},
    { id: 'mySelf'},
    { id: 'myWork'},
    { id: 'myContact'},
  ]

  const scrollProgress = ref(0)
  const activeSection = ref(null)
  const pageHeight = ref(null)
  const blur = ref(null)

  const updateScroll = () => {
    pageHeight.value = document.documentElement.scrollHeight 
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.value = Math.min((scrollTop / docHeight) * 100, 100)

    if(scrollTop > 5){
      blur.value = true
    } else{
      blur.value = false
    }
    
    for (const section of sections) {
      const el = document.getElementById(section.id)
      const rect = el.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 100) {
        activeSection.value = section.id
        localStorage.setItem('lastSection', section.id);
        break
      }
    }
  }

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    const mySelfHeight = document.getElementById('mySelf')
    const myWorkHeight = document.getElementById('myWork')
    if (el) {
      if(id !== activeSection.value ){
        mySelfHeight.style.height = '1935px';
        myWorkHeight.style.height = '1200px';
        //el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        gsap.to(window, {
          duration: 1, // seconds
          scrollTo: { y: el, offsetY: 0 }, // or { y: el, offsetY: 100 } for navbar offset
          ease: "power2.out", // optional easing
          onComplete: () => {
            // Reset height back to auto after scroll finishes
            mySelfHeight.style.height = 'auto';
            myWorkHeight.style.height = 'auto';
          },
      });
      }
      localStorage.setItem('lastSection', id);
      setTimeout(() => {
        blur.value = false;
      }, 1000);
    }
  }

  onMounted(() => {
    const lastSection = localStorage.getItem('lastSection');
    if (lastSection) {
      setTimeout(() => {
        const el = document.getElementById(lastSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100); // Delay ensures DOM is loaded
    }
    setTimeout(() => {
        window.addEventListener('scroll', updateScroll)
        updateScroll()
    }, 500)
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll)
  })

  const portfolio = ref(null)
  const work = ref(null)
  const contacts = ref(null)

  let observer
  let visibleSections = new Set()

  onMounted(() => {
  // Add custom transition styles to the body
  const myApp = document.getElementById('app')
  myApp.classList.add('bgTransition')

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const el = entry.target
        if (entry.isIntersecting) {
          visibleSections.add(el)
        } else {
          visibleSections.delete(el)
        }
      })

      // If any element is visible, apply the class
      if (visibleSections.size > 0) {
        myApp.classList.add('bg-portfolio')
      } else {
        myApp.classList.remove('bg-portfolio')
      }
    },
    { threshold: 0.1 }
  )

  if (portfolio.value.portfolio) {
    observer.observe(portfolio.value.portfolio)
    
  } 
  if(work.value.work){
    observer.observe(work.value.work)
  }
  if(contacts.value.contacts){
    observer.observe(contacts.value.contacts)
  }
})

onBeforeUnmount(() => {
  if (portfolio.value.portfolio) {
    observer.unobserve(portfolio.value.portfolio)
  }
  if(work.value.work){
    observer.unobserve(work.value.work)
  }
  if(contacts.value.contacts){
    observer.unobserve(contacts.value.contacts)
  }
  visibleSections.clear()
})

</script>

<template>
  <div v-show="blur" class="w-full top-0 fixed h-[80px] bg-[rgba(255,255,255,0.01)] backdrop-blur-sm z-97" id="navbar">
  </div>
  <div :class="['fixed top-0 left-0 h-1 z-101 transition-[width] duration-300 ease-in-out', scrollProgress < 50 ? 'bg-navBar1' : scrollProgress < 90 ? 'bg-navBar1' : scrollProgress < 95 ? 'bg-navBar1' : 'bg-navBar1']" :style="{ width: scrollProgress + '%' }"></div>
  <sideBar :active-section="activeSection" @scroll-to="scrollToSection"/>
  <hero :activeSection="activeSection" @scroll-to="scrollToSection"/>
  <mySelf ref="portfolio" />
  <myWork ref="work"/>
  <contact ref="contacts" @scroll-to="scrollToSection" />
</template>

