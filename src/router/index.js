import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../pages/Login";
import Home from "../pages/Home"
import allRoutes from "./allRoutes";

//  解决路由导航到同一路径重复报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location){
  return originalPush.call(this,location).catch(err => err)
}

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
