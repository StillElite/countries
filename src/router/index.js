import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CountryView from "@/views/CountryView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/country/:cca3",
      name: "country-details",
      component: CountryView,
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
