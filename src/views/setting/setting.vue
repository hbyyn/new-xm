<template>
  <div class="page">
    <div class="tableTop">
      <div class="search">
        <span>创建时间:</span>
        <el-date-picker class="selecData" v-model="createtime_search" value-format="yyyy-MM-dd" type="daterange"
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
      <el-table-column fixed="right" width="240" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="pwdChange(scope.$index,scope.row)">
            修改
          </el-button>
          <el-button size="mini" type="primary" @click="roleChang(scope.$index,scope.row)">
            权限管理
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
      <el-form label-position="left" label-width="80px">
        <el-form-item :label="mock_all.columns[0].label">
          <el-input v-model="mock_all.FromData.login_id"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[1].label">
          <el-input v-model="mock_all.FromData.login_name"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[2].label">
          <el-input v-model="mock_all.FromData.login_acode"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="fromOr">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 权限管理 -->
    <el-dialog title="权限设置" :visible.sync="roleVisible" width="540px">

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
      flag_paging: false,
      createtime_search: '',
      roleVisible: false,

    }
  },
  computed: {
    ...mapState({
      // 获得菜单列表数据
      mock_all: state => state.setting.tableData,//{fromData,list,columns}
      changeIndex: state => state.setting.changeIndex,
      Fromadd: state => state.setting.Fromadd,
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
      var filterData = this.mock_all.list.filter(item => !this.createtime_search || (Date.parse(this.createtime_search[0]) <= Date.parse(item.client_createtime)) && (Date.parse(item.client_createtime) <= Date.parse(this.createtime_search[1])))
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
      this.$store.commit('setting/setChangeIndex', (index + (this.pageCurrent - 1) * this.pageSize))
      this.addorChange = false;
      this.centerDialogVisible = true;
      this.mock_all.FromData = { ...row };
    },
    //弹窗确认
    fromOr() {
      //拷贝from的值
      this.$store.commit('setting/setFromadd', { ...this.mock_all.FromData })
      this.$store.commit('setting/setNowTime')
      if (this.addorChange) {
        // this.mock_all.list.unshift(this.Fromadd)
        this.$store.commit('setting/rowAddStore')
      } else {
        // this.mock_all.list.splice(this.changeIndex, 1, this.Fromadd)
        this.$store.commit('setting/pwdChange')
      }
      this.centerDialogVisible = false
      this.tableShow(this.mock_all.list)
    },
    //权限管理
    roleChang(index, row) {
      this.roleVisible = true;
      console.log(index, row)
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
.rowAdd {
  float: right;
  margin-right: 50px;
}
.page .tableTop .search .searchInputS {
  margin: 0 12px;
  width: 160px;
}
</style>