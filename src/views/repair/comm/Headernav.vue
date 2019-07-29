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
        // { id: 3, urlname: '物料表', url: '/repair/materials' },
        { id: 1, urlname: '产品返修表', url: '/repair/mrepair' },
        { id: 2, urlname: '返修表', url: '/repair/repair' },
        {id:5,urlname:'返修报表',url:'/repair/repaircharts'}
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