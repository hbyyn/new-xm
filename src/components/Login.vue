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
            <el-form-item label="公司编号" prop="clint_id">
              <el-input placeholder="Test001" type="text" v-model="loginForm.clint_id"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input placeholder="admin" type="text" v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input placeholder="123456" v-model="loginForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item label-position="left">
              <el-button type="primary" @click="handLeLong">登录</el-button>
              <el-button>注册</el-button>
            </el-form-item>
          </el-form>
        </div>

      </footer>
    </div>
  </div>
</template>

<script>
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
        clint_id: '',
        username: '',
        password: ''
      },
      loginXXX: {
        clint_id: 'Test001',
        username: 'admin',
        password: '123456'
      }

    }
  },
  methods: {
    handLeLong() {

      if (this.loginForm.clint_id == this.loginXXX.clint_id && this.loginForm.username == this.loginXXX.username && this.loginForm.password == this.loginXXX.password) {
        sessionStorage.setItem("clint_id", this.loginForm.clint_id);
        sessionStorage.setItem("user_name", this.loginForm.username);
        sessionStorage.setItem("password", this.loginForm.password);
        this.$router.push('/');
      }
    }
  }
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