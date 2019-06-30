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
        { id: 1, urlname: '订购产品', url: '/order/orderproduct' },
        { id: 3, urlname: '产品', url: '/order/product' },
        { id: 4, urlname: '订购', url: '/order/order' },
        { id: 2, urlname: '客户', url: '/order/customers' },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>