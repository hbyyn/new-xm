<template>
  <div class="page">
    <div class="tableTop">
      <div class="search">
        <!-- <span>订购编号:</span>
        <el-input v-model="nameSearch" type="text" size="small" placeholder="输入关键字搜索" /> -->
        <span>订购编号:</span>
        <el-select class="selectSearch" v-model="orderSearch" clearable filterable size="small" placeholder="请选择">
          <el-option v-for="item in mock_all.list" :key="item.order_id" :label="item.order_id" :value="item.order_id">
          </el-option>
        </el-select>
        <span>客户编号:</span>
        <el-select class="selectSearch" v-model="customersSearch" clearable filterable size="small" placeholder="请选择">
          <el-option v-for="item in mock_all.list" :key="item.customers_id" :label="item.customers_id"
            :value="item.customers_id">
          </el-option>
        </el-select>
        <span>订购时间:</span>
        <div class="selecData">
          <el-date-picker v-model="dateSearch.start" placeholder="开始日期" default-time="08:30:00" type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
          <el-date-picker v-model="dateSearch.end" type="datetime" placeholder="结束日期" default-time="18:00:00">
          </el-date-picker>
        </div>

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
    <el-pagination :class="{active_paging:flagPaging}" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :current="pageCurrent" :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="mock_all.list.length">
    </el-pagination>
    <!-- 新增 -->
    <el-dialog :title="fromtitle" :visible.sync="centerDialogVisible" width="40%">
      <el-form label-position="left" label-width="80px">
        <!-- <el-form-item :label="mock_all.columns[0].label">
          <el-input v-model="mock_all.FromData.client_id"></el-input>
        </el-form-item> -->
        <el-form-item :label="mock_all.columns[1].label">
          <el-input v-model="mock_all.FromData.order_id" :readonly="readonlyFlat"></el-input>
        </el-form-item>
        <!-- <el-form-item :label="mock_all.columns[2].label">
          <el-input v-model="mock_all.FromData.customers_id"></el-input>
        </el-form-item> -->
        <el-form-item :label="mock_all.columns[2].label">
          <el-select v-model="mock_all.FromData.customers_id" placeholder="请选择">
            <el-option class="dialog_select" v-for="item in customers_store" :key="item.id"
              :value="item.customers_id+' '+item.customers_name">
              <span>{{'ID:'+item.customers_id}}</span>
              <span>{{'产品名:'+item.customers_name}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="mock_all.columns[3].label">
          <!-- <el-input v-model="mock_all.FromData.order_date"></el-input> -->
          <el-date-picker v-model="mock_all.FromData.order_date" type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="mock_all.columns[4].label">
          <!-- <el-input v-model="mock_all.FromData.order_outdate"></el-input> -->
          <el-date-picker v-model="mock_all.FromData.order_outdate" type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
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
      readonlyFlat: false,
      tableData: '',
      pageSize: 10,
      pageCurrent: 1,
      orderSearch: '',
      customersSearch: '',
      dateSearch: {
        start: '',
        end: ''
      },
      flagPaging: false,
    }
  },
  computed: {
    ...mapState({
      // 获得菜单列表数据
      mock_all: state => state.order.tableData,//{fromData,list,columns}
      changeIndex: state => state.order.changeIndex,
      Fromadd: state => state.order.Fromadd,
      customers_store: state => state.customers.tableData.list,
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
          this.flagPaging = true;
        }
        else {
          this.flagPaging = false;
        }
      })
    },
    //filter
    onFilter() {
      var filterData = this.mock_all.list.filter(item => !this.orderSearch || item.order_id.toLowerCase().includes(this.orderSearch.toLowerCase()))
      filterData = filterData.filter(item => !this.customersSearch || item.customers_id.toLowerCase().includes(this.customersSearch.toLowerCase()))
      // filterData = filterData.filter(item => !this.dateSearch || (Date.parse(this.dateSearch[0]) <= Date.parse(item.order_date)) && (Date.parse(item.order_date) <= Date.parse(this.dateSearch[1])))
      filterData = filterData.filter(item => {
        let startTime = Date.parse(this.dateSearch.start);
        let endTime = Date.parse(this.dateSearch.end);
        let listTime = Date.parse(item.order_date);
        if (!startTime && !endTime) {
          return true
        } else if (startTime && !endTime) {
          return listTime >= startTime
        }
        else if (!startTime && endTime) {
          return listTime <= endTime
        } else if (startTime && endTime) {
          return listTime >= startTime && listTime <= endTime
        }
      })

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
      this.readonlyFlat = false;
      this.fromtitle = '新增';
      let obj = this.mock_all.FromData
      for (let k of Object.keys(obj)) {
        obj[k] = ''
      }
    },
    //修改
    pwdChange(index, row) {
      this.fromtitle = '修改';
      this.$store.commit('order/setChangeIndex', (index + (this.pageCurrent - 1) * this.pageSize))
      this.addorChange = false;
      this.centerDialogVisible = true;
      this.readonlyFlat = true;
      this.mock_all.FromData = { ...row };
    },
    //弹窗确认
    fromOr() {
      //拷贝from的值
      this.$store.commit('order/setFromadd', { ...this.mock_all.FromData })
      this.$store.commit('order/setNowTime')
      if (this.addorChange) {
        this.$store.commit('order/rowAddStore')
      } else {
        this.$store.commit('order/pwdChange')
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
.rowAdd {
  float: right;
  margin-right: 50px;
}
.page .tableTop .search .el-input {
  margin: 0 12px;
  width: 160px;
}
.page .tableTop .search .selecData {
  margin: 0 10px;
}
.page .tableTop .search .selecData .el-input {
  width: 190px;
  margin: 0 2px;
}
</style>