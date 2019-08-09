<template>
  <div ref="chart" class="listChart">
    <v-chart :options="polar"></v-chart>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/tree'

export default {
  name: 'tree-chart',
  components: {
    'v-chart': ECharts
  },
  props: ['chartData', 'treename', 'columns','columnsProduct'],
  computed: {
    polar() {
      return {
        tooltip: {
          position: 'right',
          trigger: 'item',
          formatter: (params) => {
            var res = '';
            if (params.data.product_name) {
              for (let k of this.columnsProduct) {
                res = res + '<br/>' + k.label + ':' + params.data[k.prop]
              }
            }else{
              for (let k of this.columns) {
                res = res + '<br/>' + k.label + ':' + params.data[k.prop]
              }
            }
            return res;
          },
          triggerOn: 'mousemove'
        },

        series: [
          {
            type: 'tree',
            initialTreeDepth: -1,
            data: [this.chartData],
            top: '2%',
            left: '26%',
            bottom: '2%',
            right: '26%',
            symbolSize: 12,
            itemStyle: {
              color: '#34C626'
            },
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
  .echarts {
    width: 100%;
    height: 100%;
  }
}
</style>