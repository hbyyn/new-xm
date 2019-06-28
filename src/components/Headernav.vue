<template>
  <div class="nav_tabs">
    <ul>
      <li
        v-for="item in list"
        :key="item.id"
      >
      <router-link :to="item.url">{{item.navurl}}</router-link>

      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'header-nav',
  data() {
    return {
      list:[
        {id:1,navurl:'a1',url:'/a1'},
        {id:2,navurl:'b2',url:'/b2'},
        {id:3,navurl:'c3',url:'/c3'},
        {id:4,navurl:'d4',url:'/d4'}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.nav_tabs{
  height: 50px;
  ul{
    line-height: 50px;
    display: flex;
    justify-content: center;
    a{
      height: 50px;
      display: block;
      margin: 0 20px;
      color: black;
      width: 100px;
    }
  }
}
</style>