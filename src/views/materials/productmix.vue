<template>
  <div class="pmixPage" ref="scollElement">
    <ul class="navProduct">
      <span>产品跳转:</span>
      <!-- <el-button type="primary" size="small" round v-for="(item,index) in chartList" :key="index"
       @click="point(index)" >{{item.name}}</el-button> -->
       <el-select class="selectSearch" v-model="idSearch" clearable filterable size="small" placeholder="请选择" @change="point">
          <el-option v-for="(item,index) in chartList" :key="index" :label="item.name"
            :value="index">
          </el-option>
        </el-select>
    </ul>
    <!-- <div ref="chart" class="listChart" v-for="(item,index) in product_store" :key="index">    </div> -->
      <tree-chart v-for="(item,index) in chartList" :key="index" :chartli="item" :chartcount="index"></tree-chart>


  </div>
</template>

<script>
import treechart from './pChart'
import { mapState } from 'vuex'
export default {

  components:{
    [treechart.name]: treechart,
  },
  data(){
    return{
      idSearch:''
    }
  },
  computed: {
    ...mapState({
      // 获得菜单列表数据
      mock_all: state => state.materials.tableData,//{formData,list,columns}
      product_store: state => state.product.tableData.list,
    }),
 //数据
    chartList() {
      return (() => {
        var data = this.mock_all.list
        const chartData = []
        for (var z = 0; z < this.product_store.length; z++) {
          chartData[z] = {
            'name': this.product_store[z].product_id + ' ' + this.product_store[z].product_name,
            children: []
          }
          var tree = chartData[z].children;
          //加载父节点
          for (var k = 0; k < data.length; k++) {//为每个节点赋予id，text
            //初始化children属性
            data[k].children = [];
            data[k].name = data[k].material_id + ' ' + data[k].material_name
            if (data[k].product_id == chartData[z].name) {//加载一级节点
              tree.push(data[k]);
            }
          }
          //加载子节点
          for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data.length; j++) {//找到data[i]的父节点data[j]
              if (data[i].parent_id == data[j].material_id) {
                data[j].children.push(data[i])
                break;
              }
            }
          }
        }
        return chartData;
      })()
    }
  },
  watch: {
    chartList(val) {
      console.log(val)
    },
  },
  methods:{
    point(i){
      console.log(i)
      // this.$refs.scollElement.scrollTop= i*100+'px';
    }
  }

}
</script>

<style lang="scss" scoped>
.navProduct {
  height: 48px;
  width: 100%;
  padding: 8px;
  background-color: #fff;
  button {
    margin-left: 10px;
  }
}
.pmixPage{
  padding:20px 50px 50px 50px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

}

</style>