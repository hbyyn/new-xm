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
        { id: 1, urlname: '材料', url: '/materials/materials' },
        { id: 2, urlname: '供应商', url: '/materials/supplier' },
        { id: 3, urlname: '计划', url: '/materials/format' },
        { id: 4, urlname: '产品', url: '/materials/product' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>