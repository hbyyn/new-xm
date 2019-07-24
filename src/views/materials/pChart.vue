<template>
  <div ref="chart">

  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import "echarts/lib/chart/tree"
// import { mapState } from 'vuex'


export default {
  name: 'tree-chart',
  props: ['chartli', 'chartcount',],
  watch: {
    chartli() {
      //  console.log(val)
      this.treeChart()
    },

  },

  methods: {
    treeChart() {
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
            data: [this.chartli],
            top: '1%',
            left: '15%',
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
      },true)
    },
    hidePopoverPanel() {
      this.popoverPanelShow = false;
    },
  },
  mounted() {
    console.log(this.chartcount)
    console.log(this.chartli)
    this.treeChart()

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