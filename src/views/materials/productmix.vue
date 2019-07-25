<template>
  <div class="pmixPage" ref="scollElement">
    <ul class="jumpProduct">
      <span>产品跳转:</span>
      <el-select class="selectSearch" v-model="idSearch" clearable filterable size="small" placeholder="请选择"
        @change="point">
        <el-option v-for="(item,index) in chartList" :key="index" :label="item.name" :value="index">
        </el-option>
      </el-select>
    </ul>
    <div style="width:100%;display: flex;
  justify-content: space-between;
  flex-wrap: wrap;">
      <tree-chart v-for="(item,index) in chartList" :key="index" :chartli="item" :chartcount="index"></tree-chart>
    </div>

  </div>
</template>

<script>
import treechart from './children/treeChart'
import { mapState } from 'vuex'
export default {

  components: {
    [treechart.name]: treechart,
  },
  //刷新页面///
  // inject:['reload'],
  data() {
    return {
      idSearch: '',
      flagJump: false
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
  // watch: {
  //   chartList() {
  //     // console.log(val)
  //     this.reload()
  //   },
  // },
//
  methods: {
    point(i) {
      console.log(i)
      this.$nextTick(() => {
        // console.log(document.documentElement.scrollTop)
        let anchorTop = Math.floor(i / 2) * 420
        document.documentElement.scrollTop = anchorTop;
      })
    },

  }

}
</script>

<style lang="scss" scoped>
.pmixPage {
  padding: 20px 50px 550px 50px;
  .jumpProduct {
    position: fixed;
    top: 100px;
    left: 50px;
    right: 50px;
    z-index: 10;
    padding-left: 20px;
    box-sizing: border-box;
    height: 40px;
    border-radius: 0 0 10px 10px;
    border: #f2f2f2 solid 1px;
    border-top: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background-color: #fff;
  }
}
</style>