<template>
  <div class="page">
    <ul class="navProduct">
      <span>产品列表:</span>
      <el-button type="primary" size="small" round v-for="(item,index) in product_store" :key="index"
        @click="treeChange(index)">{{item.product_id+' '+item.product_name}}</el-button>

    </ul>
    <div ref="chart" style="height:600px;">

    </div>

  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import "echarts/lib/chart/tree"
import { mapState } from 'vuex'


export default {
  // data() {
  //   return {
  //     chartData: {
  //       "name": "flare",
  //       "children": [
  //         {
  //           "name": "flex",
  //           "children": [
  //             { "name": "FlareVis" }
  //           ]
  //         },
  //         {
  //           "name": "scale",
  //           "children": [
  //             { "name": "IScaleMap" },
  //             { "name": "LinearScale" },
  //             { "name": "LogScale" },
  //             { "name": "OrdinalScale" },
  //             { "name": "QuantileScale" },
  //             { "name": "QuantitativeScale" },
  //             { "name": "RootScale" },
  //             { "name": "Scale" },
  //             { "name": "ScaleType" },
  //             { "name": "TimeScale" }
  //           ]
  //         },
  //         {
  //           "name": "display",
  //           "children": [
  //             { "name": "DirtySprite" }
  //           ]
  //         }
  //       ]
  //     }
  //   }
  // },

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
      this.treeChart()
    }
  },

  methods: {
    //点击换表
    treeChange(index) {
      this.treeChart(index)
    },
    treeChart(i) {
      let _this = this.$refs.chart
      this.chart = echarts.init(_this)
      this.chart.on('contextmenu', params => {
        console.log(params)
        if (params.componentType === 'series') {
          this.selectedOrg = params.data
          this.popoverPanelShow = true
        } else {
          return
        }
      });
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',

            data: [this.chartList[i]],

            top: '1%',
            left: '15%',
            bottom: '1%',
            right: '20%',

            symbolSize: 24,

            label: {
              normal: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right',
                fontSize: 24
              }
            },

            leaves: {
              label: {
                normal: {
                  position: 'right',
                  verticalAlign: 'middle',
                  align: 'left'
                }
              }
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      })
    },
    hidePopoverPanel() {
      this.popoverPanelShow = false;
    },
  },
  //  created(){
  //    this.$nextTick()
  //   console.log(this.chartData)
  // },
  mounted() {
    console.log(this.chartList)
    this.treeChart(0)
  },
}
</script>

<style lang="scss" scoped>
.navProduct {
  height: 48px;
  padding: 8px;
  button {
    margin-left: 10px;
  }
}
</style>