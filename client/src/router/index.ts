import { createRouter, createMemoryHistory } from "vue-router";
import Hero from "../views/Hero.vue";
import Dashboard from "../views/Dashboard.vue";

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
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
