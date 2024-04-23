import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import OTP from '../views/OTP.vue'
import UploadDoc from '../views/UploadDoc.vue'
import UploadDoc2 from '../views/UploadDoc2.vue'
import UploadVideo from '../views/UploadVideo.vue'
import Login from "../views/Login.vue"
import Uploadsample from '../views/uploadsample.vue'
const routes = [
  {
    path: '/',
    name: 'Register',
    component:Register 
  },

  {
    path: '/login',
    name: 'Login',
    component:Login 
  },
  
  {
    path: '/OTP',
    name: 'OTP',
    component:OTP 
  },
  {
    path: '/UploadDoc',
    name: 'UploadDoc',
    component:UploadDoc
  },
  {
    path: '/UploadDoc2',
    name: 'UploadDoc2',
    component:UploadDoc2
  },
  {
    path: '/UploadVideo',
    name: 'UploadVideo',
    component:UploadVideo
  },
  {
    path: '/Uploadsample',
    name: 'Uploadsample',
    component:Uploadsample
  },

  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
