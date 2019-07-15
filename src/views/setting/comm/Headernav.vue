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
        { id: 1, urlname: '管理员设置', url: '/setting/setting' },
        { id: 2, urlname: '角色设置', url: '/setting/role' },
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