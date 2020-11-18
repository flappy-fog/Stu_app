import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/styles/base.css"
import "@/assets/styles/el-reset.css"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);

//  按需引入
// import { Carousel, CarouselItem } from "element-ui"

//  注册组件
// Vue.component('el-carousel', Carousel)
// Vue.component('el-carousel-item' ,CarouselItem)

// window.lodash = _.noConflict();

//  路由前置钩子(导航守卫)
router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  //  用户登入之后,localStorage中有token
  let token = localStorage.getItem("qf2006-token");
  if(token){
    //  如果是注册页面或者是登入页面，直接放行;
    next()
  } else{ //  没token
    if(to.path === "/"){
      next()
    } else{ //  访问的不是登入页，就要跳转到登入页
      next({ path:"/" })
    }
  }
  
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
