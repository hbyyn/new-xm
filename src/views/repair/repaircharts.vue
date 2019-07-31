<template>
  <div class="pmixPage" ref="scollElement">
    <ul class="jumpProduct">
      <span>产品跳转:</span>
      <el-select class="selectSearch" v-model="idSearch" clearable filterable size="small" placeholder="请选择"
        @change="point">
        <el-option v-for="(item,index) in chartList" :key="index" :label="`${item.id} ${item.name}`"  :value="index">
        </el-option>
      </el-select>
    </ul>
    <div style="width:100%;display: flex;
  justify-content: space-between;
  flex-wrap: wrap;">
      <tree-chart v-for="(item,index) in chartList" :key="index" :chartData="item" :columns="mock_all.columns"></tree-chart>
    </div>

  </div>
</template>

<script>
import treechart from '../../components/treeChart'
import { mapState } from 'vuex'
export default {

  components: {
    [treechart.name]: treechart,
  },
  data() {
    return {
      idSearch: '',
      flagJump: false
    }
  },
  computed: {
    ...mapState({
      // 获得菜单列表数据
      mock_all: state => state.repair.tableData,//{formData,list,columns}
    }),
    //数据
    chartList() {
      //简化list
        const data =[]//{id:'',name:'',parent_id:''}
        this.mock_all.list.map((item)=>{
          const newList={...item}
          newList.id=item.repair_id
          newList.name=item.repair_name
          newList.parent_id=item.parent_id
          data.push(newList)
        })
          var tree = [];
          //加载父节点
          for (var k = 0; k < data.length; k++) {//为每个节点赋予id
            //初始化children属性
            data[k].children = [];
            if (data[k].parent_id == '') {//加载一级节点
              tree.push(data[k]);
            }
          }
          // 加载子节点
          for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data.length; j++) {//找到data[i]的父节点data[j]
              if (data[i].parent_id == data[j].id) {
                data[j].children.push(data[i])
                break;
              }
            }
          }
      return  tree;
    }
  },
  methods: {
    point(i) {
      this.$nextTick(() => {
        let anchorTop = Math.floor(i / 2) * 420
        document.documentElement.scrollTop = anchorTop;
      })
    },
  },
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