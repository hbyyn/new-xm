<template>
  <div class="loginwrapper">
    <div class="login">
      <header class="login_header">
        <h3>深圳威尔生产系统</h3>
        <el-select v-model="value" style="width:100px" size="mini">
          <el-option v-for="item in languageArr" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </header>
      <footer class="login_fooer">
        <div>
          <img src="../assets/logo.jpg" alt="logo">
        </div>
        <div class="footerfrom">
          <el-form label-position="right" label-width="80px" class="demo-ruleForm" size="mini">
            <el-form-item label="公司编号" prop="client_id">
              <el-input placeholder="Test001" type="text" v-model="loginForm.client_id"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input placeholder="admin" type="text" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" >
              <el-input placeholder="123456" v-model="loginForm.password" show-password @keyup.enter.native="handleLong"></el-input>
            </el-form-item>
            <el-form-item label-position="left">
              <el-button type="primary" v-loading.fullscreen.lock="loginForm.loginLoading" @click="handleLong" >登录</el-button>
              <el-button>
                <router-link to="/register" style="color:#000">注册</router-link>
              </el-button>
            </el-form-item>
          </el-form>
        </div>

      </footer>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import api from "../ajax/api"
export default {
  data() {
    return {
      languageArr: [
        {
          value: "zh-cn",
          label: "简体"
        },
        {
          value: "zh-tw",
          label: "繁体"
        },
        {
          value: "en",
          label: "English"
        }
      ],
      value: 'zh-cn',
      loginForm: {
        client_id: 'Test001',
        username: 'admin',
        password: '123123',
        loginLoading:false,
        remember: sessionStorage.getItem("remember") || false
      },


    }
  },
  methods: {
    handleLong() {
      axios(
        {
            method: "post",
            url:api.HOST+"/api/UserLogin/login",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json"
            },
            timeout: 5000,
            data: JSON.stringify({
              clientId: this.loginForm.client_id,
              userId: this.loginForm.username,
              userPassword: this.loginForm.password
            })
          }
      ).then(res=>{
        console.log(res)
        if(res.data.statusCode == "10000"){
          console.log(res)
           this.$store.state.headerBool = true;
                sessionStorage.setItem(
                  "loginPrefix",
                  res.data.data.tokenResult.accessPrefix
                );
                sessionStorage.setItem("loginToken", res.data.data.tokenResult.accessToken);
                sessionStorage.setItem("user_name", this.loginForm.username);
                sessionStorage.setItem("client_id", this.loginForm.client_id);
                sessionStorage.setItem("remember", this.loginForm.remember);
                // this.storage.set("language", this.$i18n.locale);
                this.loginForm.loginLoading = false;
                this.$message({
                  showClose: true,
                  duration: 2000,
                  message: "登录成功",
                  type: "success"
                });
                this.$router.push('/')
        }else if(res.data.statusCode == "30004"){
          this.loginForm.loginLoading = false;
                this.$message({
                  showClose: true,
                  duration: 2000,
                  message: "用户不存在",
                  type: "error"
                });
        }else if (res.data.statusCode == "20002") {
                this.loginForm.loginLoading = false;
                this.$message({
                  showClose: true,
                  duration: 2000,
                  message: "用户名或密码错误",
                  type: "error"
                });
              }else{
                this.loginForm.loginLoading = false;
                this.$message({
                  showClose: true,
                  duration: 2000,
                  message: res.data.message,
                  type: "error"
                });
              }

      })
    //   if (this.loginForm.client_id == this.loginXXX.client_id && this.loginForm.username == this.loginXXX.username && this.loginForm.password == this.loginXXX.password) {
    //     sessionStorage.setItem("client_id", this.loginForm.client_id);
    //     sessionStorage.setItem("user_name", this.loginForm.username);
    //     sessionStorage.setItem("password", this.loginForm.password);
    //     this.$router.push('/');
    //   }
    }
  },

}
</script>

<style lang="scss" scoped>
.loginwrapper {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #1183fb;
  justify-content: center;
  align-items: center;
  h3 {
    font-weight: bold;
    font-size: 26px;
  }
  .login {
    width: 520px;
    height: 300px;
    background-color: white;
    .login_header {
      display: flex;
      justify-content: space-between;
      height: 33px;
      padding: 20px;
      border-bottom: 1px solid #eee;
    }
    footer {
      display: flex;
      img {
        width: 135px;
        margin: 50px 20px;
      }
      .footerfrom {
        margin: 20px 10px 0 30px;
      }
    }
  }
}
</style>