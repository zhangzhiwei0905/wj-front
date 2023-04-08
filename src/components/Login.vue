<template>
  <body id="poster">
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">登录</h3>
    <el-form-item>
      <el-input v-model="loginForm.account" auto-complete="off"
                placeholder="请输入您的账号/邮箱/手机号" type="text"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="loginForm.password" auto-complete="off"
                placeholder="请输入密码" type="password"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button style="background: #505458;border: none;" type="primary" v-on:click="login">登录
      </el-button>
      <el-button v-on:click="$router.replace('/register')">注册</el-button>

    </el-form-item>
  </el-form>
  </body>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {},
      responseResult: []
    }
  },
  methods: {
    login () {
      var _this = this
      this.axios
        .post('/login', {
          account: this.loginForm.account,
          password: this.loginForm.password
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            // _this.$store.commit('login', _this.loginForm)
            _this.$store.commit('login', successResponse.data.data)
            var path = this.$route.query.redirect
            this.$message.success('登陆成功')
            this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
          } else {
            this.$message.error('账户密码错误')
          }
        })
        .catch(failResponse => {
          this.$message.error('请输入账号密码')
        })
    }
  }
}
</script>

<style scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

#poster {
  background: url("../assets/1.jpg") no-repeat;
  /*background-position: center;*/
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  margin: 0px;
}

</style>
