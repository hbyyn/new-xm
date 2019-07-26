<template>
  <div ref="chart" class="listChart">
    <v-chart :options="polar"></v-chart>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/tree'

export default {
  name: 'tree-chart',
   components: {
    'v-chart': ECharts
  },
  props: ['chartData'],
  computed:{
    polar(){
      return {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series:[
          {
            type: 'tree',
            initialTreeDepth: -1,
            data: [this.chartData],
            top: '1%',
            left: '25%',
            bottom: '1%',
            right: '28%',
            symbolSize: 12,
            label: {
              normal: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right',
                fontSize: 12
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
}
</script>

<style lang="scss" scoped>
.listChart {
  height: 400px;
  width: 49%;
  background-color: #fff;
  display: flex;
  margin-top: 20px;
}
</style>