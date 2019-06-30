<template>
  <div class="header_tabs">
    <div class="tabs">
      <h1 class="log">
        <a href="#">深圳市威尔电器有限公司</a>
      </h1>
      <nav>
        <li
          class="tab"
          v-for="item in list"

          :key="item.id"
        >
          <router-link :to="item.url">{{item.navurl}}</router-link>
        </li>
      </nav>
      <a
        class="login"
        href="#"
      >登陆</a>
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
        { id: 3, navurl: '材料', url: '/materials' },
        { id: 8, navurl: '修理', url: '/repair' },
        { id: 2, navurl: '订购', url: '/order' },
        { id: 5, navurl: '工作', url: '/worker' }

      ]
    }
  },
  methods:{
    selectAction(index){
      this.value=index
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  a {
    color: white;
  }
  height: 50px;
  background-color: cornflowerblue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px 0 50px;
  .log{

  }
  nav {

    display: flex;
    justify-content: space-between;
    align-items: center;
    .tab {
      width: 60px;
      .router-link-active{
        color: black;
      }
    }
  }
  .login{

  }
}
</style>