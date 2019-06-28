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
    <header-nav></header-nav>
  </div>
</template>

<script>
import Headernav from './Headernav'
export default {
  name: 'Tabs',
  components: {
    [Headernav.name]: Headernav
  },
  data() {
    return {
      list: [
        { id: 1, navurl: '首页', url: '/home' },
        { id: 2, navurl: '产品', url: '/product' },
        { id: 3, navurl: '物资', url: '/materialls' },
        { id: 4, navurl: '客户', url: '/client' }
      ]
    }
  },

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
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tab {
      width: 60px;
    }

  }
}
</style>