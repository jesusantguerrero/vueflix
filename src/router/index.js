import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Auth from "@/views/AuthPage.vue";
import { useAuth } from "../composables/useAuth";
const { isAuthenticated } = useAuth();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      meta: {
        requiresAuth: false,
      },
      component: Auth,
    },
    {
      path: "/register",
      component: Auth,
      name: "register",
      props: {
        mode: "register",
      },
      meta: {
        requiresAuth: false,
      },
    },
  ],
});

router.beforeEach(async (to, _from, next) => {
  const user = await isAuthenticated();
  const isPublicRoute = to.matched.some(
    (record) => record.meta.requiresAuth === false
  );
  const isLoginRoute = to.matched.some((record) =>
    ["login", "register"].includes(record.name)
  );

  if (!isPublicRoute && !user) {
    next({ name: "login" });
  } else if (user && isLoginRoute) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
