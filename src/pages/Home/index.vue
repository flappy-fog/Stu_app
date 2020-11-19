<template>
  <div class="home-page">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200">
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          :router="true"
          :collapse="isCollapse"
        >
          <qf-sub-menu :sideMenu="menuList"></qf-sub-menu>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- 顶部栏 -->
        <el-header>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <i
                  class="iconfont icon-zhankai"
                  @click="isCollapse = !isCollapse"
                ></i>
                图标
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple-light">千锋管理系统</div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-avatar
                  shape="square"
                  :size="40"
                  fit="fit"
                  src="https://tse1-mm.cn.bing.net/th/id/OIP.F3IHj63MYpZ0RmpvKz4Q_wHaJQ?pid=Api&rs=1"
                >
                </el-avatar>
                <span>欢迎您：</span>
                <b class="nickname">{{ userInfo.nickname }}</b>
                <span class="quit" @click="quit">退出：</span>
              </div>
            </el-col>
          </el-row>
        </el-header>

        <!-- 主题区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getLoginLog } from "@/api";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userInfo", 'menuList']),
  },
  mounted() {
    // getLoginLog().then((res) => {
    //   console.log(res);
    // });

    // this.$store.dispatch("FETCH_MENULIST")
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    quit() {
      //  退出登入
      //  1.清除token和userInfo
      //  2.跳转到登入页

      localStorage.removeItem("qf2006-token");
      localStorage.removeItem("qf2006-userInfo");

      this.$router.push("/login");
      //  刷新页面
      window.location.reload()
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.icon-zhankai {
  color: hotpink;
  /* font-size: 36px; */
  cursor: pointer;
}

.quit {
  cursor: pointer;
  color: hotpink;
}

/* 图片样式对齐 */
.el-avatar.el-avatar--square {
  vertical-align: middle !important;
  margin-right: 10px;
}

/* 顶部左中右样式 */
.el-row {
  margin-bottom: 20px;
  /* &:last-child {
    margin-bottom: 0;
  } */
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

/* 侧边栏样式 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
