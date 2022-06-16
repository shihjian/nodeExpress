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
          import(
            /* webpackChunkName: "about" */ "../components/poseWall/poseWall.vue"
          ),
      },
      {
        path: "addCard",
        name: "addCard",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/addCard/addCard.vue"
          ),
      },
      {
        path: "editUser",
        name: "editUser",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/editUser/editUser.vue"
          ),
      },
      {
        path: "selfPostWall/:id",
        name: "selfPostWall",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/selfPostWall/selfPostWall.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
