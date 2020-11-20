import axios from "axios";
// import { config } from "vue/types/umd";
import router from "../router"

import ElementUI from 'element-ui';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? "/api" : "http://www.chst.vip"

axios.defaults.withCredentials = true;  //  允许请求携带认证

//  引入NProgress进度条
import NProgress from "nprogress"

//  中断请求属性
export let CancelToken = axios.CancelToken;


//  创建请求拦截器，可以给每个请求都携带上想要传递的内容

axios.interceptors.request.use(config => {
    //  登入&注册时不需要携带token
    // console.log(config);
    if (config.url == "/users/login") {
        return config
    } else {
        let token = localStorage.getItem('qf2006-token')
        //  config指的是每个请求对象
        config.headers['authorization'] = token;
        //  放行
        return config
    }

})

//  响应拦截
axios.interceptors.response.use(config => {
    // NProgress.done()    //  请求到数据进度条关闭
    let { data } = config;
    if (data.code == '1004' || data.code == '10022') {
        //  在当前的后台api中1004代表token校验失败，10022表示session到期失效，提示错误，并且让页面跳转到登入页
        ElementUI.Message.error("登入信息失效，请重新登入")
        localStorage.removeItem("qf2006-token") //  移除token防止信息过期产生的死循环
        router.push("/login")
        window.location.reload()
    }
    // console.log(config);
    return config
})

axios.create({
    timeout: 4000
})

// export {
//     CancelToken as default
// }

export default axios