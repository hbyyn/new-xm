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
          <el-dropdown-item divided command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 个人档案弹窗 -->
      <el-dialog title="修改密码" :visible.sync="personalDialogVisible" width="30%" :append-to-body="true">
        <el-form label-position="right" label-width="50%">
          <el-form-item :label="personalList[0].label+':'">
            <span>{{loginname}}</span>
          </el-form-item>
          <el-form-item :label="personalList[1].label+':'">
            <span>{{personalList[1].text}}</span>
          </el-form-item>
          <el-form-item :label="personalList[2].label+':'">
            <span>{{personalList[2].text}}</span>
          </el-form-item>
          <el-form-item :label="personalList[3].label+':'">
            <span>{{personalList[3].text}}</span>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 改密码弹窗 -->
      <el-dialog title="修改密码" :visible.sync="centerDialogVisible" width="40%" :append-to-body="true">
        <el-form label-position="right" label-width="120px" :model="passwordFrom" :rules="rules" ref="passwordFrom">
          <!-- <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"> -->
          <el-form-item :label="changePassword[0].label+':'">
            <span>{{loginname}}</span>
          </el-form-item>
          <el-form-item :label="changePassword[1].label+':'" prop="old_password">
            <el-input v-model="passwordFrom.old_password"></el-input>
          </el-form-item>
          <el-form-item :label="changePassword[2].label+':'" prop="new_password">
            <el-input show-password v-model="passwordFrom.new_password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item :label="changePassword[3].label+':'" prop="repeat_password">
            <el-input show-password v-model="passwordFrom.repeat_password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onChangePassword('passwordFrom')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { api, request } from "../ajax";

export default {
  name: 'Tabs',
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.passwordFrom.repeat_password !== '') {
          this.$refs.passwordFrom.validateField('repeat_password');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.passwordFrom.new_password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      list: [
        { id: 1, navurl: '首页', url: '/home' },
        { id: 3, navurl: '物料', url: '/materials' },
        { id: 8, navurl: '返修', url: '/repair' },
        { id: 2, navurl: '订购', url: '/order' },
        { id: 5, navurl: '工序', url: '/worker' },
        // { id: 6, navurl: '设置', url: '/setting' },
      ],
      float: false,
      personalList: [
        { id: 1, text: 'admin', label: "账号" },
        { id: 2, text: 'xxx', label: "用户名" },
        { id: 3, text: 'xxxxx', label: "职位" },
        { id: 14, text: 'xxxxxx', label: "部门" },
      ],
      changePassword: [
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
      rules: {
        old_password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        new_password: [
          { validator: validatePass, trigger: 'blur' },
        ],
        repeat_password: [
          { validator: validatePass2, trigger: 'blur' },
        ],
      }
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
      if (command === "logout") {
        request.get(api.USER_LOGOUT_API).then(res => {
          if (res.data.statusCode == 10000) {
            sessionStorage.removeItem('loginPrefix');
            sessionStorage.removeItem('loginToken');
            sessionStorage.removeItem('user_name')
            sessionStorage.removeItem('remember')
            this.$message({
              type: 'success',
              message: '退出账号',
              showClose: true,
              duration: 2000
            });
            this.$router.push('/login');
          } else {
            console.log(res)
            this.$message({
              type: 'error',
              message: res.data.message,
              showClose: true,
              duration: 2000
            });
            this.$router.push('/login');
          }
        })
      }
    },
    onChangePassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = {
            "oldPassword": this.passwordFrom.old_password,
            "newPassword": this.passwordFrom.new_password
          }
          request.put(api.USER_CHANGE_PASSWORD_API, obj).then(res => {
            if (res.data.statusCode == 10000) {
              // sessionStorage.setItem(
              //   "loginPrefix",
              //   res.data.data.tokenResult.accessPrefix
              // );
              // sessionStorage.setItem("loginToken", res.data.data.tokenResult.accessToken);
              this.centerDialogVisible = false;
              this.$message({
                type: 'success',
                message: res.data.message,
                showClose: true,
                duration: 2000
              });

            } else {
              this.$message({
                type: 'success',
                message: res.data.message,
                showClose: true,
                duration: 2000
              });
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: "填写错误",
            showClose: true,
            duration: 2000
          });
          return false;
        }
      });


    },
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