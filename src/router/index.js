import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestView from '../views/TestView.vue'
import AuthView from '../views/AuthView.vue'
import MapView from '../views/MapView.vue'
import { useStore } from 'vuex'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/test',
      name: 'test',
      component: TestView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/map',
      name: 'map',
      component: MapView
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   const store = useStore();  
//   const isAuthenticated = store.getters.isAuthenticated;  

//   if (to.path !== '/auth' && !isAuthenticated) {
//     next('/auth');  
//   } else if (to.path === '/auth' && isAuthenticated) {
//     next('/');  
//   } else {
//     next();  
//   }
// });

export default router
