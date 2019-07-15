<template>
  <div class="page">
    <div class="tableTop">
      <div class="search">
        <span>产品编号:</span>
        <el-select class="selectSearch" v-model="material_id_search" clearable filterable size="small"
          placeholder="请选择">
          <el-option v-for="item in mock_all.list" :key="item.material_id" :label="item.material_id"
            :value="item.material_id">
          </el-option>
        </el-select>
        <span>返修编号:</span>
        <el-select class="selectSearch" v-model="repair_id_search" clearable filterable size="small" placeholder="请选择">
          <el-option v-for="item in mock_all.list" :key="item.repair_id" :label="item.repair_id"
            :value="item.repair_id">
          </el-option>
        </el-select>
        <span>启动日期:</span>
        <el-date-picker class="selecData" v-model="begindate_search" value-format="yyyy-MM-dd" type="daterange"
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
        <span>结束日期:</span>
        <el-date-picker class="selecData" v-model="enddate_search" value-format="yyyy-MM-dd" type="daterange"
          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>

        <el-button type="primary" size="small" round @click="onFilter">查找</el-button>

      </div>

      <div class="rowAdd">
        <el-button type="primary" size="small" @click="rowAdd">新增</el-button>
        <el-button type="danger" size="small" @click="rowRemove()">删除选中</el-button>
      </div>
    </div>

    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" @click="rowSelec(mock_all.list)">
      </el-table-column>

      <!--  主体 -->
      <el-table-column v-for="col in mock_all.columns" :key="col.id" :prop="col.prop" :label="col.label">
      </el-table-column>

      <!-- //操作 -->
      <el-table-column fixed="right" width="140" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="pwdChange(scope.$index,scope.row)">
            修改
          </el-button>
          <el-button size="mini" type="danger" @click="rowDel(scope.$index, scope.row)">
            删除
          </el-button>

        </template>
      </el-table-column>

    </el-table>
    <!-- 分页 -->
    <el-pagination :class="{active_paging:flag_paging}" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :current="pageCurrent" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="mock_all.list.length">
    </el-pagination>
    <!-- 新增 -->
    <el-dialog :title="fromtitle" :visible.sync="centerDialogVisible" width="40%">
      <el-form label-position="right" label-width="120px">
        <!-- <el-form-item :label="mock_all.columns[0].label">
          <el-input v-model="mock_all.FromData.client_id"></el-input>
        </el-form-item> -->
        <el-form-item :label="mock_all.columns[1].label">
          <el-select v-model="mock_all.FromData.material_id" placeholder="请选择">
            <el-option class="dialog_select" v-for="item in materials_store" :key="item.id" :value="item.material_id+' '+item.material_name">
              <span>{{'ID:'+item.material_id}}</span>
              <span>{{'材料名:'+item.material_name}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="mock_all.columns[2].label">
          <el-select v-model="mock_all.FromData.repair_id" placeholder="请选择">
            <el-option class="dialog_select" v-for="item in repair_store" :key="item.id" :value="item.repair_id+' '+item.repair_name">
              <span>{{'ID:'+item.repair_id}}</span>
              <span>{{'返修名:'+item.repair_name}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="mock_all.columns[3].label">
          <!-- <el-input v-model="mock_all.FromData.material_repair_begindate"></el-input> -->
          <el-date-picker v-model="mock_all.FromData.material_repair_begindate" type="date" value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="mock_all.columns[4].label">
          <!-- <el-input v-model="mock_all.FromData.material_repair_enddate"></el-input> -->
          <el-date-picker v-model="mock_all.FromData.material_repair_enddate" type="date" value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

        <!-- <el-form-item :label="mock_all.columns[5].label">
          <el-input v-model="mock_all.FromData.client_creator"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[6].label">
          <el-input v-model="mock_all.FromData.client_createtime"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[7].label">
          <el-input v-model="mock_all.FromData.client_updator"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[8].label">
          <el-input v-model="mock_all.FromData.client_updatetime"></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="fromOr">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      centerDialogVisible: false,
      fromtitle: '',
      addorChange: true,//判断修改新增
      tableData: '',
      pageSize: 10,
      pageCurrent: 1,
      material_id_search: '',
      repair_id_search: '',
      begindate_search: '',
      enddate_search: '',
      flag_paging: false,

    }
  },
  computed: {
    ...mapState({
      // 获得菜单列表数据
      mock_all: state => state.mrepair.tableData,//{fromData,list,columns}
      changeIndex: state => state.mrepair.changeIndex,
      Fromadd: state => state.mrepair.Fromadd,
      materials_store: state => state.materials.tableData.list,
      repair_store: state => state.repair.tableData.list,
    }),

  },
  created() {
    this.tableShow(this.mock_all.list)
  },
  methods: {
    //列表显示
    tableShow(data) {
      let _data = data.slice((this.pageCurrent - 1) * this.pageSize, this.pageCurrent * this.pageSize)
      this.tableData = _data
      // 分页条
      this.$nextTick(() => {
        if (document.documentElement.scrollHeight > document.documentElement.offsetHeight) {
          this.flag_paging = true;
        }
        else {
          this.flag_paging = false;
        }
      })
    },
    //filter
    onFilter() {
      var filterData = this.mock_all.list.filter(item => !this.material_id_search || item.material_id.toLowerCase().includes(this.material_id_search.toLowerCase()))
      filterData = filterData.filter(item => !this.repair_id_search || item.repair_id.toLowerCase().includes(this.repair_id_search.toLowerCase()))

      filterData = filterData.filter(item => !this.begindate_search || (Date.parse(this.begindate_search[0]) <= Date.parse(item.material_repair_begindate)) && (Date.parse(item.material_repair_begindate) <= Date.parse(this.begindate_search[1])))
      filterData = filterData.filter(item => !this.enddate_search || (Date.parse(this.enddate_search[0]) <= Date.parse(item.material_repair_enddate)) && (Date.parse(item.material_repair_enddate) <= Date.parse(this.enddate_search[1])))
      this.tableShow(filterData)
    },
    // 选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //批量删除
    rowRemove() {
      const a = this.mock_all.list;
      const b = this.multipleSelection;
      this.mock_all.list = a.filter(function (item) {
        return b.indexOf(item) < 0;
      })
      this.tableShow(this.mock_all.list)
    },
    //新增
    rowAdd() {
      this.centerDialogVisible = true;
      this.addorChange = true;
      this.fromtitle = '新增';
      let obj = this.mock_all.FromData
      for (let k of Object.keys(obj)) {
        obj[k] = ''
      }
    },
    //修改
    pwdChange(index, row) {
      this.fromtitle = '修改';
      this.$store.commit('mrepair/setChangeIndex', (index + (this.pageCurrent - 1) * this.pageSize))
      this.addorChange = false;
      this.centerDialogVisible = true;
      this.mock_all.FromData = { ...row };
    },
    //弹窗确认
    fromOr() {
      //拷贝from的值
      this.$store.commit('mrepair/setFromadd', { ...this.mock_all.FromData })
      this.$store.commit('mrepair/setNowTime')
      if (this.addorChange) {
        this.$store.commit('mrepair/rowAddStore')
      } else {
        this.$store.commit('mrepair/pwdChange')
      }
      this.centerDialogVisible = false
      this.tableShow(this.mock_all.list)
    },

    //移除
    rowDel(index) {
      this.mock_all.list.splice(index, 1);
      this.tableShow(this.mock_all.list)
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.tableShow(this.mock_all.list)
      this.onFilter()
    },
    handleCurrentChange(val) {
      this.pageCurrent = val
      this.tableShow(this.mock_all.list)
      this.onFilter()
    }
  },


}
</script>

<style lang="scss" scoped>
.page .tableTop {
  display: block;
  height: 100px;
  position: relative;
}
.page .tableTop .search {
  float: left;
  flex-wrap: wrap;
  height: 100px;
  width: 930px;
  position: relative;
}
.page .tableTop .search .el-button {
  position: absolute;
  right: 20px;
  bottom: 6px;
}
.page .tableTop .rowAdd {
  position: absolute;
  right: 20px;
  bottom: 6px;
}
.page .tableTop .search .el-input {
  margin: 0 12px;
  width: 160px;
}
</style>