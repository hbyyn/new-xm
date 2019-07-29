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
        // { id: 1, urlname: '物料', url: '/worker/materials' },
        { id: 2, urlname: '物料工序', url: '/worker/mwork' },
        { id: 3, urlname: '工序', url: '/worker/work' },
        {id:5,urlname:'工序报表',url:'/worker/workcharts'}
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