<template>
  <div>
    <header-nav />
    <div class="pageWrapper">
      <h1>首页</h1>

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