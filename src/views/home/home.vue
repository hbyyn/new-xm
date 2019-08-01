<template>
  <div>
      首页
  </div>
</template>

<script>
  export default {
    created(){
        this.$store.dispatch('user/getUserAction');

    }
  }
</script>

<style lang="scss" scoped>

</style>