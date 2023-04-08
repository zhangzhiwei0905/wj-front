<template>
  <div>
    <nav-menu></nav-menu>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside style="background-color: rgb(238, 241, 246)" width="200px">
        <el-menu>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="toPerson">个人中心</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <router-view/>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavMenu from './common/NavMenu'

export default {
  name: 'Home',
  components: {NavMenu},
  data() {
    return {}
  },
  methods: {
    toPerson() {
      this.$router.push('/index/person')
    }
  }
}
</script>

<style scoped>
.el-container {
  margin-bottom: 40px;
  height: 100%;
}
</style>

