<template>
  <div class="hello">
    <el-container>
      <el-header>
        <el-menu mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">个人信息</template>
            <el-menu-item index="1-1">{{ store.globalState.userName }}</el-menu-item>
            <el-menu-item index="1-2">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="1" class="el-menu-vertical-demo">
            <el-submenu index="1">
              <template slot="title">系统管理</template>
              <el-menu-item index="1-1">用户管理</el-menu-item>
              <el-menu-item index="1-2">角色管理</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">内容管理</template>
              <el-menu-item index="2-1">文章管理</el-menu-item>
              <el-menu-item index="2-2">评论管理</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <h1 class="welcome">欢迎，已登录</h1>
          <el-form :model="form" label-width="120px">
            <el-form-item label="选择项">
              <el-select v-model="value" placeholder="Select" style="width: 240px" @change="onSelect">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            </el-form-item>
            <el-form-item label="日期">
              <el-date-picker v-model="form.dateValue" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="showDialog">显示弹窗</el-button>
            </el-form-item>
          </el-form>

          <el-dialog title="提示" v-model="dialogVisible" width="30%">
            <span>这是一个弹窗</span>
            <template #footer>
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确定</el-button>
            </template>
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { useGlobalStore } from '@/stores/globalStore'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      form: {
        selectValue: '',
        dateValue: ''
      },
      dialogVisible: false,
      options: [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
      ],
      store: useGlobalStore()
    }
  },
  created() {
    console.log('Form initialized:', this.form);
  },
  methods: {
    showDialog() {
      console.log('Form values:', this.form);
      this.dialogVisible = true;
    },
    onSelect(value) {
      console.log('value:', value);
      debugger;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-select-dropdown__item{
  display: block;
}
.welcome{
  color: #42b983;
}
</style>
