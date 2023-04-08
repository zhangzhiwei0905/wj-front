<template>
  <el-menu
    :default-active="'/index'"
    active-text-color="red"
    background-color="white"
    mode="horizontal"
    router
    style="min-width: 1300px"
    text-color="#222">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
      {{ item.navItem }}
    </el-menu-item>
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
  data () {
    return {
      navList: [
        {name: '/index', navItem: '首页'},
        {name: '/jotter', navItem: '笔记本'},
        {name: '/library', navItem: '图书馆'},
        {name: '/admin', navItem: '个人中心'}
      ],
      username: 'zhangzhiwei'
    }
  },
  methods: {
    logout () {
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

