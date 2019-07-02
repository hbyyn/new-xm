<template>
  <div id="app">
    <Tabs></Tabs>
    <keep-alive>
        <router-view />
    </keep-alive>
  </div>
</template>


<script>
import Header from './components/Header'
``
export default {
  components: {
    [Header.name]: Header,
  }
}
</script>

<style lang="scss" scoped>
#app {
}
</style>

