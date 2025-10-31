import { createRouter, createWebHistory } from "vue-router";
import Hero from "../views/Hero.vue";
import Dashboard from "../views/Dashboard.vue";
import About from "../views/AboutView.vue";
import FlightsView from "../views/Flights.vue";
import LoginView from "../views/LoginView.vue";
import VoyagesView from "../views/Voyages.vue";
import Account from "../views/Account.vue";
import { useSessionUser } from "../store/useSessionUser";
import VoyageJoin from "../views/VoyageJoin.vue";
import Outpost from "../views/Outpost.vue";

//routes for the app
const routes = [
  {
    path: "/",
    name: "Home",
    component: Hero,
  },
  {
    path: "/flights",
    name: "Flights",
    component: FlightsView,
  },
  {
    path: "/voyages",
    name: "Voyages",
    component: VoyagesView,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/voyages/:name",
    name: "voyage-details",
    component: VoyageJoin,
  },
  {
    path: "/outpost",
    name: "Outpost",
    component: Outpost,
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
    meta: { requiresAuth: true },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// navigation guard
router.beforeEach(async (to) => {
  const session = useSessionUser();

  // optional: while the store is hydrating, allow navigation
  if (session.loading) return true;

  // needs auth but user not authed → send to login with redirect back
  if (to.meta.requiresAuth && !session.isAuthed) {
    if (to.name === "Login") return true;
    return { name: "Login", query: { redirect: to.fullPath } };
  }

  // already authed and trying to open Login → bounce to redirect or account
  if (to.name === "Login" && session.isAuthed) {
    return { path: (to.query.redirect as string) || "/account" };
  }

  // otherwise proceed
  return true;
});

export default router;
