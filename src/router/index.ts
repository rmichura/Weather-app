import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WeatherView from '../views/WeatherView.vue'
import store from "@/store";

Vue.use(VueRouter)

const authGuard = (to: any, from: any, next: any) => {
  if (store.getters.isAuth) {
    next();
  } else {
    next({name: 'home'});
  }
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/weather',
    name: 'weather',
    component: WeatherView,
    beforeEnter: authGuard
  }
]

const router = new VueRouter({
  routes
})

export default router
