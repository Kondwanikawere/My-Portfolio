import './style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
//import { solid } from '@fortawesome/free-solid-svg-icons'
//import { regular } from '@fortawesome/free-regular-svg-icons'
import { faWhatsapp, faSquareFacebook, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faCaretRight, faChevronLeft, faChevronRight, faXmark } from '@fortawesome/free-solid-svg-icons'
import { MotionPlugin } from '@vueuse/motion'


library.add(faWhatsapp, faSquareFacebook, faCaretRight, faChevronLeft, faChevronRight, faXmark, faLinkedin, faInstagram)

const app = createApp(App)
app.use(MotionPlugin)
app.component('font-awesome-icon', FontAwesomeIcon)
app.config.devtools = false

app.use(createPinia())
app.use(router)

app.mount('#app')
