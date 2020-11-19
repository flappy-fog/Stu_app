import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../pages/Login";
import Home from "../pages/Home"
import allRoutes from "./allRoutes";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  // {
  //   path:"*",
  //   component:() => import(/*webpackChunkName:'page404' */ '../pages/Page404 ')
  // },
  // {
  //   path: "/",
  //   name: "home",
  //   // component: () =>import(/* webpackChunkName: "home" */ "../pages/Home/index.vue"),
  //   component: Home,
  //   children: allRoutes
  // }
];

const router = new VueRouter({
  routes
});

export default router;
