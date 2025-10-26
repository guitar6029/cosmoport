import { createRouter, createWebHistory } from "vue-router";
import Hero from "../views/Hero.vue";
import Dashboard from "../views/Dashboard.vue";
import About from "../views/AboutView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Hero,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      About

  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;