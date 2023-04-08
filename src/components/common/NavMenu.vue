<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item disabled index="3">消息中心</el-menu-item>
    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    <a style="color: #222;float: right;padding: 20px;" v-on:click="logout">退出登陆</a>
    <span style="color: #222;font-weight: bold;float: right;padding: 20px;">欢迎你，{{
        this.$store.state.user.username
      }}</span>
    <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">White Jotter - Your Mind Palace</span>
  </el-menu>
</template>

<script>
export default {
  name: 'NavMenu',
  data() {
    return {
      username: 'zhangzhiwei',
      activeIndex: "1"
    }
  },
  methods: {
    logout() {
      var _this = this
      this.axios
        .post('/logout')
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            _this.$store.commit('logout')
            var path = this.$route.query.redirect
            this.$router.replace({path: path === '/' || path === undefined ? '/login' : path})
            this.$message.success('成功退出登陆')
          }
        })
        .catch(failResponse => {
        })
    },
    handleSelect(id) {
      this.activeIndex = id
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

span {
  pointer-events: none;
}
</style>

