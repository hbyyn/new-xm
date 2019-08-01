<template>
  <div class="header_tabs">
    <div class="tabs">
      <h1 class="log">
        <router-link to="/">深圳市威尔电器有限公司</router-link>
      </h1>
      <nav>
        <li class="tab" v-for="item in list" :key="item.id">
          <router-link :to="item.url">{{item.navurl}}</router-link>
        </li>
      </nav>
      <el-dropdown trigger="click" @command="handleCommand">
        <a href="javascript:;" class="login" @click="showList">{{loginname}}<i class="el-icon-caret-bottom"></i></a>
        <el-dropdown-menu slot="dropdown" class="loginList">
          <el-dropdown-item class="loginListHeader">
            <div class="iconA">A</div><span>{{loginname}}</span>
          </el-dropdown-item>
          <el-dropdown-item command="personal" divided>个人档案</el-dropdown-item>
          <el-dropdown-item command="changePassword">更改密码</el-dropdown-item>
          <el-dropdown-item divided>
            <router-link to="/login">退出</router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 个人档案弹窗 -->
      <el-dialog title="修改密码" :visible.sync="personalDialogVisible" width="30%" :append-to-body="true" >
        <el-form label-position="right" label-width="50%">
          <el-form-item :label="personal_list[0].label+':'">
            <span>{{loginname}}</span>
          </el-form-item>
          <el-form-item :label="personal_list[1].label+':'">
            <span>{{personal_list[1].text}}</span>
          </el-form-item>
          <el-form-item :label="personal_list[2].label+':'">
            <span>{{personal_list[2].text}}</span>
          </el-form-item>
          <el-form-item :label="personal_list[3].label+':'">
            <span>{{personal_list[3].text}}</span>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 改密码弹窗 -->
      <el-dialog title="修改密码" :visible.sync="centerDialogVisible" width="40%" :append-to-body="true" >
        <el-form label-position="right" label-width="120px">
          <!-- <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"> -->
          <el-form-item :label="columns[0].label+':'">
            <span>{{loginname}}</span>
          </el-form-item>
          <el-form-item :label="columns[1].label+':'">
            <el-input v-model="passwordFrom.old_password"></el-input>
          </el-form-item>
          <el-form-item :label="columns[2].label+':'">
            <el-input v-model="passwordFrom.new_password"></el-input>
          </el-form-item>
          <el-form-item :label="columns[3].label+':'">
            <el-input v-model="passwordFrom.repeat_password"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeAdd">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  data() {
    return {
      list: [
        { id: 1, navurl: '首页', url: '/home' },
        { id: 3, navurl: '物料', url: '/materials' },
        { id: 8, navurl: '返修', url: '/repair' },
        { id: 2, navurl: '订购', url: '/order' },
        { id: 5, navurl: '工序', url: '/worker' },
        { id: 6, navurl: '设置', url: '/setting' },
      ],
      float: false,
      personal_list: [
        { id: 1, text: 'admin', label: "账号" },
        { id: 2, text: 'xxx', label: "用户名" },
        { id: 3, text: 'xxxxx', label: "职位" },
        { id: 14, text: 'xxxxxx', label: "部门" },
      ],
      columns: [
        { id: 1, prop: 'admin_name', label: "用户名" },
        { id: 2, prop: 'old_password', label: "原密码" },
        { id: 3, prop: 'new_password', label: "新密码" },
        { id: 14, prop: 'repeat_password', label: "重复输入密码" },
      ],
      passwordFrom: {
        old_password: "",
        new_password: "",
        repeat_password: "",
      },
      personalDialogVisible: false,
      centerDialogVisible: false,
    }
  },
  computed: {
    loginname() {
      return sessionStorage.getItem("user_name")
    }
  },
  methods: {
    selectAction(index) {
      this.value = index
    },
    showList() {
      this.float = !this.float
    },
    handleCommand(command) {
      if (command === "personal") {
        this.personalDialogVisible = true
      }
      if (command === "changePassword") {
        this.centerDialogVisible = true
      }
    },
    changeAdd() {
      console.log('add')
    }
  }
}
</script>

<style lang="scss" scoped>
.header_tabs {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  .tabs {
    height: 50px;
    background-color: #1183fb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px 0 50px;
    a {
      color: white;
    }

    nav {
      display: flex;
      margin-left: -150px;
      justify-content: space-between;
      align-items: center;
      .tab {
        width: 60px;
        .router-link-active {
          color: black;
        }
      }
    }
    .login {
      padding: 4px;
      border-radius: 2px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
  .loginList {
    width: 150px;
    .loginListHeader {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 50px;
      .iconA {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        text-align: center;
        line-height: 30px;
        background-color: #16a8f8;
        color: white;
      }
    }
  }
}
</style>