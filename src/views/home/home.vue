<template>
  <div>
      首页
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    mounted(){
      axios.get("https://easy-mock.com/mock/5d414b8449d6fd3f971c59a4/api/customers").then(res=>{
          console.log(res)
        })
    }
  }
</script>

<style lang="scss" scoped>

</style>