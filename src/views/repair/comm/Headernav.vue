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
        { id: 3, urlname: '材料', url: '/repair/materials' },
        { id: 1, urlname: '材料修理', url: '/repair/mrepair' },
        { id: 2, urlname: '修理', url: '/repair/repair' },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>