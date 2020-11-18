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
        <el-form-item>
          <el-button
            type="success"
            @click="submitForm('loginForm')"
            
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
      src="../../../movie/stock-footage--k-video-hologram-zoom-out-loop-ideal-for-science-fiction-movies-technology-news-tv-shows.mp4"
    ></video>
  </div>
</template>


<script>
//  登入逻辑的实现

//  1.收集用户输入的username&password传递给后端
//  2.


export default {
  data() {
    //jsDoc
    /**
     * @param {Object} rule 就是一个表单验证对象
     * @param {String} value 输入框
     * @param {Function} callback 校验通过不传参  不通过传参数
     */
    var pavalidateUsername = (rule, value, callback) => {
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
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        callback("请输入密码");
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: pavalidateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      // console.log(this.$refs[formName]);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //  代表本地校验通过
          alert("submit!");
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

.el-button{
  width: 250px;
  background: linear-gradient(90deg,#1596fb,#002dff)!important;
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