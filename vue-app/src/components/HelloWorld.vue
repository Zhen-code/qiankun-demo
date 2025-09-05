<template>
  <div class="hello">
     <el-container style="height: 100%">
        <el-aside width="200px" style="height: 100%;background:#fff"> 
          <el-menu default-active="1-1" class="el-menu-vertical-demo">
            <el-menu-item index="0" @click="handleShowSidebar">
              <i class="el-icon-s-home"></i>首页
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">用户与权限</template>
              <el-menu-item index="1-1" @click="activeMenu='userList'">用户列表</el-menu-item>
              <el-menu-item index="1-2" @click="activeMenu='rolePermission'">角色权限</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">内容管理</template>
              <el-menu-item index="2-1" @click="activeMenu='articleList'">文章列表</el-menu-item>
              <el-menu-item index="2-2" @click="activeMenu='commentReview'">评论审核</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">数据统计</template>
              <el-menu-item index="3-1" @click="activeMenu='dataOverview'">数据概览</el-menu-item>
              <el-menu-item index="3-2" @click="activeMenu='detailedReport'">详细报表</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <div v-if="activeMenu === 'home' || activeMenu === ''">
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
          </div>

          <!-- 用户列表 -->
          <div v-if="activeMenu === 'userList'">
            <el-table :data="userTableData" style="width: 100%">
              <el-table-column prop="date" label="日期" width="180"></el-table-column>
              <el-table-column prop="name" label="姓名" width="180"></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
              <el-table-column prop="status" label="状态">
                <template v-slot:default="scope">
                  <el-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">{{ scope.row.status }}</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- 角色权限 -->
          <div v-if="activeMenu === 'rolePermission'">
            <el-form :model="roleForm" label-width="120px">
              <el-form-item label="角色名称">
                <el-input v-model="roleForm.name" placeholder="请输入角色名称"></el-input>
              </el-form-item>
              <el-form-item label="角色描述">
                <el-input type="textarea" v-model="roleForm.description" placeholder="请输入角色描述"></el-input>
              </el-form-item>
              <el-form-item label="权限设置">
                <el-checkbox-group v-model="roleForm.permissions">
                  <el-checkbox label="user:read" border>用户查看</el-checkbox>
                  <el-checkbox label="user:write" border>用户编辑</el-checkbox>
                  <el-checkbox label="role:read" border>角色查看</el-checkbox>
                  <el-checkbox label="role:write" border>角色编辑</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitRoleForm">提交</el-button>
              </el-form-item>
            </el-form>
          </div>

          <!-- 文章列表 -->
          <div v-if="activeMenu === 'articleList'">
            <el-table :data="articleTableData" style="width: 100%">
              <el-table-column prop="title" label="文章标题" width="300"></el-table-column>
              <el-table-column prop="author" label="作者" width="120"></el-table-column>
              <el-table-column prop="date" label="发布日期" width="180"></el-table-column>
              <el-table-column prop="status" label="状态" width="120">
                <template v-slot:default="scope">
                  <el-tag :type="scope.row.status === 'published' ? 'success' : 'info'">{{ scope.row.status }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template v-slot:default="scope">
                  <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- 数据概览 -->
          <div v-if="activeMenu === 'dataOverview'">
            <el-table :data="overviewData" style="width: 100%">
              <el-table-column prop="name" label="指标名称" width="200"></el-table-column>
              <el-table-column prop="value" label="数值" width="150"></el-table-column>
              <el-table-column prop="change" label="环比变化">
                <template v-slot:default="scope">
                  <span :style="{color: scope.row.change.indexOf('+') > -1 ? 'green' : 'red'}">{{ scope.row.change }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
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
      activeMenu: 'userList', // 初始化默认激活用户列表
      form: {
        selectValue: '',
        dateValue: ''
      },
      dialogVisible: false,
      options: [
        { value: 'Option1', label: 'Option1' },
        { value: 'Option2', label: 'Option2' },
        { value: 'Option3', label: 'Option3' },
        { value: 'Option4', label: 'Option4' },
        { value: 'Option5', label: 'Option5' }
      ],
      // 用户列表数据
      userTableData: [
        { date: '2023-05-01', name: '张三', address: '北京市海淀区', status: 'active' },
        { date: '2023-05-02', name: '李四', address: '上海市浦东新区', status: 'inactive' },
        { date: '2023-05-03', name: '王五', address: '广州市天河区', status: 'active' }
      ],
      // 角色权限表单
      roleForm: {
        name: '',
        description: '',
        permissions: []
      },
      // 文章列表数据
      articleTableData: [
        { title: 'Vue.js实战教程', author: '张开发', date: '2023-05-10', status: 'published' },
        { title: 'React性能优化技巧', author: '李前端', date: '2023-05-15', status: 'draft' },
        { title: 'Node.js后端开发', author: '王后端', date: '2023-05-20', status: 'published' }
      ],
      // 数据概览数据
      overviewData: [
        { name: '总用户数', value: '12,500', change: '+12.5%' },
        { name: '文章总数', value: '3,200', change: '+8.3%' },
        { name: '日活跃用户', value: '3,800', change: '-2.1%' },
        { name: '平均访问时长', value: '8.5分钟', change: '+1.2%' }
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
    },
    handleShowSidebar() {
        window.setGlobalState({
          sidebarVisible: true,
          app: 'main-app',
         });
    },
    // 提交角色表单
    submitRoleForm() {
      console.log('提交角色表单:', this.roleForm);
      this.$message.success('角色信息提交成功');
    },
    // 编辑文章
    handleEdit(index, row) {
      console.log('编辑文章:', index, row);
      this.$message.info('编辑功能待实现');
    },
    // 删除文章
    handleDelete(index, row) {
      console.log('删除文章:', index, row);
      this.$confirm('确定要删除这篇文章吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.articleTableData.splice(index, 1);
        this.$message.success('删除成功');
      });
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
.hello{
  height: 100%;
}
/* 使菜单项撑满父容器宽度 */
::v-deep .el-menu-vertical-demo .el-menu-item {
  width: 100%;
  padding: 0 20px !important;
}
/* 调整子菜单标题样式以匹配菜单项宽度 */
::v-deep .el-menu-vertical-demo .el-submenu__title {
  width: 100%;
  padding: 0 20px !important;
}
</style>
