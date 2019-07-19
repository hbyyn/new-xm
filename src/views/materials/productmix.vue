<template>
  <div>
    <v-chart :options="orgOptions" ref="chart"></v-chart>
  </div>
</template>

<script>
import echarts from 'vue-echarts'
import "echarts/lib/chart/tree"
import "echarts/lib/chart/treemap"
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/tooltip'


export default {
  components: {
    'v-chart': echarts
  },
  data() {
    return {
      chartData: {
        "name": "flare",
        "children": [
          {
            "name": "flex",
            "children": [
              { "name": "FlareVis", "value": 4116 }
            ]
          },
          {
            "name": "scale",
            "children": [
              { "name": "IScaleMap", "value": 2105 },
              { "name": "LinearScale", "value": 1316 },
              { "name": "LogScale", "value": 3151 },
              { "name": "OrdinalScale", "value": 3770 },
              { "name": "QuantileScale", "value": 2435 },
              { "name": "QuantitativeScale", "value": 4839 },
              { "name": "RootScale", "value": 1756 },
              { "name": "Scale", "value": 4268 },
              { "name": "ScaleType", "value": 1821 },
              { "name": "TimeScale", "value": 5833 }
            ]
          },
          {
            "name": "display",
            "children": [
              { "name": "DirtySprite", "value": 8833 }
            ]
          }
        ]
      },
      orgOptions:{
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',

            data: [this.chartData],

            top: '1%',
            left: '7%',
            bottom: '1%',
            right: '20%',

            symbolSize: 7,

            label: {
              normal: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right',
                fontSize: 9
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

      }
    }
  },
  methods: {
    // init() {
    //   let $chart = this.$refs.chart
    //   $chart.setOption(orgOptions)
    // }

  },
  mounted() {
    // this.init()
  }


}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>