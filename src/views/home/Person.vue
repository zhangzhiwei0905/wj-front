<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="修改密码">
        <el-button type="danger" @click="dialogEditPassVisible = true">修改密码</el-button>
        <el-dialog :visible.sync="dialogEditPassVisible" title="修改密码">
          <el-form :model="form">
            <el-form-item :label-width="formLabelWidth" label="请输入旧密码">
              <el-input v-model="oldPass" autocomplete="off" show-password
                        style="width: 500px"></el-input>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="请输入新密码">
              <el-input v-model="newPass" autocomplete="off" show-password style="width: 500px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogEditPassVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleEditPass()">确 定
            </el-button>
          </div>
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="savePersonInfo">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "Person",
  data() {
    return {
      form: {
        name: '',
        nickname: '',
        phone: '',
        email: ''
      },
      oldPass: '',
      newPass: '',
      dialogEditPassVisible: false,
      formLabelWidth: '120px'
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    savePersonInfo() {

    },
    handleEditPass() {
      let postData = qs.stringify({
        username: this.form.name,
        oldPass: this.oldPass,
        newPass: this.newPass
      })
      this.axios.post('/user/changePass', postData).then(successResponse => {
        if (successResponse.data.code === 200) {
          // this.$store.commit('changePass', successResponse.data)
          this.$message.success("修改成功")
          this.dialogEditPassVisible = false
        } else {
          this.$message.error("旧密码错误")
        }
      })
    },
  },
  mounted() {
    const user = JSON.parse(sessionStorage.getItem('token'))
    this.form.name = user.username
    this.form.nickname = user.nickname
    this.form.phone = user.phone
    this.form.email = user.email

  }
}
</script>

<style scoped>

</style>
