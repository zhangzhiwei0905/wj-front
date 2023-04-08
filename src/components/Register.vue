<template>
  <body id="poster">
  <el-form ref="registerForm" :model="registerForm"
           :rules="rules" class="login-container" label-position="left" label-width="0px">
    <h3 class="login_title">注册</h3>
    <el-form-item prop="username">
      <el-input v-model="registerForm.username" auto-complete="off"
                clearable placeholder="请输入您要注册的账号" type="text"></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input v-model="registerForm.email" auto-complete="off"
                clearable placeholder="请输入您的邮箱" type="text"></el-input>
    </el-form-item>
    <el-form-item prop="phone">
      <el-input v-model="registerForm.phone" auto-complete="off"
                clearable placeholder="请输入您的手机号" type="text"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-tooltip :content="passwordFormat" class="item" effect="dark" placement="top">
        <el-input v-model="registerForm.password" auto-complete="off"
                  clearable placeholder="请输入密码" show-password type="password"></el-input>
      </el-tooltip>
    </el-form-item>
    <el-form-item prop="password2">
      <el-input v-model="registerForm.password2" auto-complete="off"
                clearable placeholder="请再次输入密码" show-password type="password"></el-input>
    </el-form-item>

    <el-form-item style="width: 100%">
      <el-button style="background: #505458;border: none;" type="primary" v-on:click="handleRegister">注册
      </el-button>
      <el-button @click="$router.replace('/login')">返回登录</el-button>

    </el-form-item>
  </el-form>
  </body>
</template>

<script>

export default {
  name: 'Register',
  data () {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        const reg = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}$/
        if (reg.test(value)) {
          console.log('格式正确')
          callback()
        } else {
          console.log('格式错误')
          callback(new Error('密码格式不正确'))
        }
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      }
    }
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        console.log('手机号为空')
        callback(new Error('请输入手机号'))
      } else {
        console.log('手机号不为空')
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (reg.test(value)) {
          console.log('格式正确')
          callback()
        } else {
          callback(new Error('手机号格式错误'))
        }
      }
    }
    var validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入您的邮箱'))
      } else {
        const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        if (reg.test(value)) {
          callback()
        } else {
          callback(new Error('邮箱格式错误'))
        }
      }
    }
    return {
      registerForm: {},
      responseResult: [],
      passwordFormat: '密码中必须包含大小字母、数字、特称字符，至少8个字符，最多30个字符',
      rules: {
        phone: [{required: true, validator: validatePhone, trigger: 'blur'}],
        email: [{required: true, validator: validateEmail, trigger: 'blur'}],
        password: [{required: true, validator: validatePass, trigger: 'blur'}],
        password2: [{required: true, validator: validatePass2, trigger: 'blur'}],
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
      }
    }

  },
  methods: {
    handleRegister () {
      this.$refs.registerForm.validate((valid) => {
        if (!valid) {
          this.$message.error('请修改格式')
          return false
        } else {
          this.axios
            .post('/user/register', {
              username: this.registerForm.username,
              password: this.registerForm.password,
              email: this.registerForm.email,
              phone: this.registerForm.phone
            })
            .then(successResponse => {
              if (successResponse.data.code === 200) {
                var path = this.$route.query.redirect
                this.$message.success('注册成功')
                this.$router.replace({path: path === '/' || path === undefined ? '/login' : path})
              } else {
                this.$message.error('账号已存在')
              }
            })
            .catch(failResponse => {
              this.$message.error('请求错误')
            })
        }
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
