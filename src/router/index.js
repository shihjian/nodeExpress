import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../components/register/register.vue"
      ),
  },
  {
    path: "/home",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/HomeView.vue"),
    children: [
      {
        path: "postWall",
        name: "postWall",
        component: () =>
          import(/* webpackChunkName: "about" */ "../components/poseWall/poseWall.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
