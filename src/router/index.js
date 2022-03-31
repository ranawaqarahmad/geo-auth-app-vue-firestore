import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Signup from "../components/auth/Signup.vue";
import Login from "../components/auth/Login.vue";
import { getAuth } from "firebase/auth";
import ViewProfile from "../components/profile/ViewProfile.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomeView",
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/profile/:id",
      name: "ViewProfile",
      component: ViewProfile,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((rec) => rec.meta.requiresAuth)) {
    let user = getAuth().currentUser;
    if (user) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router;
