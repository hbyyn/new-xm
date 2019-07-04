<template>
  <div>
    <Tabs></Tabs>
    <header-nav />
    <div class="pageWrapper">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header'
import Headernav from './comm/Headernav'
export default {
  components: {
    [Header.name]: Header,
    [Headernav.name]: Headernav
  }

}
</script>

<style lang="scss" scoped>
</style>