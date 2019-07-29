<template>
  <div class="nav_tabs">
    <ul>
      <li
        v-for="item in list"
        :key="item.id"
      >
        <router-link
          :to="{ path: item.url}"
          append
        >{{item.urlname}}</router-link>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'header-nav',
  data() {
    return {
      list: [
        { id: 1, urlname: '物料表', url: '/materials/materials' },
        { id: 2, urlname: '供应商表', url: '/materials/supplier' },
        { id: 3, urlname: '规格表', url: '/materials/format' },
        { id: 4, urlname: '产品表', url: '/materials/product' },
        {id:5,urlname:'产品组成报表',url:'/materials/productcharts'}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.router-link-active {
  color: #0c64eb;
}
</style>