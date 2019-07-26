<template>
  <div class="XXX">
    <Tabs></Tabs>
    <header-nav />
    <div class="pageWrapper">
        <router-view />
    </div>
    <footer class="footer"></footer>
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