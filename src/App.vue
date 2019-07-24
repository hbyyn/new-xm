<template>
  <div id="app">
    <keep-alive>
        <router-view v-if="isRouterAlive"></router-view>
    </keep-alive>
  </div>
</template>


<script>


export default {
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        console.log('页面刷新了')
        this.isRouterAlive = true
      })
    }
  }

}
</script>

<style lang="scss" scoped>
#app {
}
</style>

