import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import cookie from "js-cookie"
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import '@/assets/scss/style.scss'
import Swal from 'sweetalert2'
import './vee-validate';
import VueCookies from 'vue-cookies';

const axiosinstance = axios.create({
    baseURL: 'https://payrollium.b2camp.id/',
    timeout: 180000,
    headers: {
        'Content-Type': 'application/json',
    }
})

if(cookie.getJSON('token') !== undefined){    
    let auth = cookie.getJSON('token')
    store.commit('SET_LOGIN', auth.token)
    axiosinstance.interceptors.request.use(
    (config) => {
        
        config.headers['Authorization'] = `Bearer ${auth.token}`;
        
      return config;
    },
    (error) => Promise.reject(error)
  );
}


const app = createApp(App)
app.use(store)
app.use(router)
app.use(Buefy)
app.use(VueCookies, { expires: '1d' });
app.config.globalProperties.$axios = {...axiosinstance}
app.config.globalProperties.$Swal = Swal
app.mount('#app')
