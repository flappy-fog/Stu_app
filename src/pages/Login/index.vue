<template>
  <div class="login-page">
    <div class="loginContainer">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <h3 class="title">千锋管理系统</h3>
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <!-- <el-form-item label="验证码" prop="captcha">
          <el-input
            type="text"
            v-model="loginForm.captcha"
            autocomplete="off"
          ></el-input>
        </el-form-item> -->

        <el-form-item>
          <el-button type="success" @click="submitForm('loginForm')"
            >登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <video
      muted="muted"
      autoplay="autoplay"
      loop="loop"
      preload="auto"
      src="../../assets/movie/stock-footage--k-video-hologram-zoom-out-loop-ideal-for-science-fiction-movies-technology-news-tv-shows.mp4"
    ></video>
  </div>
</template>


<script>
//  登入逻辑的实现
//  1.收集用户输入的username&password传递给后端

//  2.登录通过后，将后端返回的token存到本地，跳转到主页

//  3.每次请求的时候，携带token到请求头authorization

//  4.展示token校验正确的数据

//  5.校验不通过，跳转到登入页

import { login } from "@/api";
import { mapMutations } from "vuex";
export default {
  data() {
    //jsDoc
    /**
     * @param {Object} rule 就是一个表单验证对象
     * @param {String} value 输入框
     * @param {Function} callback 校验通过不传参  不通过传参数
     */
    var validateUsername = (rule, value, callback) => {
      // console.log(rule);
      // console.log(value);

      //  用户名正则，4到16位（字母，数字，下划线，减号）
      // var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      // if(!uPattern.test(value)) {
      if (!value) {
        callback("4到16位(字母,数字,下划线,减号)");
      } else {
        callback();
      }
    };

    //  校验用户密码
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    //  校验验证码
    var validateCaptcha = (rule, value, callback) => {
      if (value === "" || value.length !== 5) {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        username: "",
        password: "",
        captcha:""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        captcha: [{ validator: validateCaptcha, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations(["SET_USERINFO"]),
    submitForm(formName) {
      // console.log(this.$refs[formName]);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //  代表本地校验通过
          //打开登入加载动画
          const loading = this.$loading({
            lock: true,
            text: "正在登入",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });

          let { username, password } = this.loginForm;
          //  发送登入请求
          login(username, password)
            .then((res) => {
              // console.log(res);

              //  服务器响应，关闭loading动画

              loading.close();

              if (res.data.state) {
                this.$message.success("登入成功");
                //  用户名密码正确
                localStorage.setItem("qf2006-token", res.data.token);
                localStorage.setItem(
                  "qf2006-userInfo",
                  JSON.stringify(res.data.userInfo)
                );
                //  更改vuex中state['userInfo']的值
                this.SET_USERINFO(res.data.userInfo);
                //  跳转到主页
                this.$router.push("/welcome");
              } else {
                //  用户名或密码错误
                this.$message.error("用户名密码错误");
              }
            })
            .catch((err) => {
              console.log(err);
            });
          // console.log(this.loginForm.username, this.loginForm.password);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
body {
  width: 100%;
}

/* 表单样式 */
.el-form {
  width: 400px;
}

.title {
  color: #fff;
  margin-top: 100px;
  margin-bottom: 50px;
}

.loginContainer {
  z-index: 9;
  width: 25rem;
  height: 30rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 11px;
  background: rgba(0, 0, 0, 0.4);
  text-align: center;
}

.el-button {
  width: 250px;
  background: linear-gradient(90deg, #1596fb, #002dff) !important;
  margin: 0 auto;
}

video {
  /* object-fit: fill; */
  position: fixed;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -999;
  opacity: 0.9;
}
</style>