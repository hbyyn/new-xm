<template>
  <div class="listChartwarrper">
    <div class="listChart" v-for="(item,index) in chartList" :key="index">
      <ve-tree :data="{
        columns: ['name', 'value'],
        rows: [{
            name: 'tree',
            value: [item]
          }]
      }"></ve-tree>
    </div>
  </div>

</template>

<script>
import VeTree from 'v-charts/lib/tree.common'
import { mapState } from 'vuex'

export default {

  components: {
    [VeTree.name]: VeTree,
  },

  data() {
    return {
      chartDat: {},
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

}
</script>

<style lang="scss" scoped>
.listChartwarrper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.listChart {
  height: 400px;
  width: 49%;
  background-color: #fff;
}
</style>