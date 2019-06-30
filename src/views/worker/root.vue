<template>
  <div>
    <header-nav />
    <div class="pageWrapper">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Headernav from './comm/Headernav'
export default {
  components: {
    [Headernav.name]: Headernav
  }

}
</script>

<style lang="scss" scoped>
</style>