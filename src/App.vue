<template>
  <div id="app">
    <el-container>
      <el-header>
        用户管理
      </el-header>
      <el-main>
        <mall />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import mall from "./views/mall/index.vue"
export default {
  name: 'App',
  components: {
    mall
  }
}
</script>

<style>
.el-header {
  background-color: #dedfe1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

* {
  padding: 0;
  margin: 0
}
</style>
