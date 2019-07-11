<template>
  <div class="page">
    <div class="tableTop">
      <div class="search">
        <span>规格查找:</span>
        <el-select class="selectSearch" v-model="format_search" clearable filterable size="small" placeholder="请选择">
          <el-option v-for="item in mock_all.list" :key="item.format_id" :label="item.format_id"
            :value="item.format_id">
          </el-option>
        </el-select>
        <span>供应商查找:</span>
        <el-select class="selectSearch" v-model="supplier_search" clearable filterable size="small" placeholder="请选择">
          <el-option v-for="item in mock_all.list" :key="item.supplier_id"
            :label="item.supplier_id" :value="item.supplier_id">
          </el-option>
        </el-select>
        <span>产品查找:</span>
        <el-select class="selectSearch" v-model="product_search" clearable filterable size="small" placeholder="请选择">
          <el-option v-for="item in mock_all.list" :key="item.product_id" :label="item.product_id"
            :value="item.product_id">
          </el-option>
        </el-select>
        <el-button type="primary" size="small" round @click="onFilter">查找</el-button>
      </div>
      <div class="rowAdd">
        <el-button type="primary" size="small" @click="rowAdd">新增</el-button>
        <el-button type="danger" size="small" @click="rowRemove()">删除选中</el-button>
      </div>
    </div>

    <el-table ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" @click="rowSelec(mock_all.list)">
      </el-table-column>

      <!--  主体 -->
      <el-table-column v-for="col in mock_all.columns" :key="col.id" :prop="col.prop" :label="col.label">
      </el-table-column>

      <!-- //操作 -->
      <el-table-column fixed="right" width="140" label="操作" show-overflow-tooltip >
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
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]"
      :current="pageCurrent" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="mock_all.list.length">
    </el-pagination>

    <!-- 新增 -->
    <el-dialog :title="fromtitle" :visible.sync="centerDialogVisible" width="30%">
      <div class="fromheight">
        <el-form label-position="right" label-width="120px">

          <!-- <el-form-item :label="mock_all.columns[0].label">
          <el-input v-model="mock_all.FromData.client_id"></el-input>
        </el-form-item> -->
          <el-form-item :label="mock_all.columns[1].label">
            <el-input v-model="mock_all.FromData.material_id" width="217px"></el-input>
          </el-form-item>
          <el-form-item :label="mock_all.columns[2].label">
            <el-input v-model="mock_all.FromData.material_type"></el-input>
          </el-form-item>
          <el-form-item :label="mock_all.columns[3].label">
            <el-input v-model="mock_all.FromData.material_name"></el-input>
          </el-form-item>
          <el-form-item :label="mock_all.columns[4].label">
            <el-select v-model="mock_all.FromData.format_id" filterable clearable placeholder="请选择">
              <el-option class="dialog_select" v-for="item in format_store" :key="item.id"
                :value="item.format_id+' '+item.format_name">
                <span>{{item.format_id}}</span>
                <span>{{' '+item.format_name}}</span>
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="mock_all.columns[5].label">
            <el-input v-model="mock_all.FromData.material_unit"></el-input>
          </el-form-item>
          <el-form-item :label="mock_all.columns[6].label">
            <!-- <el-input v-model="mock_all.FromData.supplier_id"></el-input> -->
            <el-select v-model="mock_all.FromData.supplier_id" filterable clearable placeholder="请选择">
              <el-option class="dialog_select" v-for="item in supplier_store" :key="item.id"
                :value="item.supplier_id+' '+item.supplier_name">
                <span>{{item.supplier_id}}</span>
                <span>{{" "+item.supplier_name}}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="mock_all.columns[7].label">
            <el-input v-model="mock_all.FromData.material_erpid"></el-input>
          </el-form-item>
          <el-form-item :label="mock_all.columns[8].label">
            <!-- <el-input v-model="mock_all.FromData.material_indate"></el-input> -->
            <el-date-picker v-model="mock_all.FromData.material_indate" type="date"
          value-format="yyyy-MM-dd" placeholder="选择日期">
          </el-date-picker>
          </el-form-item>
          <el-form-item :label="mock_all.columns[9].label">
            <el-input v-model="mock_all.FromData.material_storeid"></el-input>
          </el-form-item>
          <el-form-item :label="mock_all.columns[10].label">
            <el-input v-model="mock_all.FromData.material_operaterid"></el-input>
          </el-form-item>
          <el-form-item :label="mock_all.columns[11].label">
            <!-- <el-input v-model="mock_all.FromData.material_operaterdate"></el-input> -->
            <el-date-picker v-model="mock_all.FromData.material_operaterdate" type="date"
          value-format="yyyy-MM-dd" placeholder="选择日期">
          </el-date-picker>
          </el-form-item>
          <el-form-item :label="mock_all.columns[12].label">
            <el-select v-model="mock_all.FromData.product_id" placeholder="请选择">
              <el-option class="dialog_select" v-for="item in product_store" :key="item.id"
                :value="item.product_id+' '+item.product_name">
                <span>{{item.product_id}}</span>
                <span>{{' '+item.product_name}}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="mock_all.columns[13].label">
            <el-input v-model="mock_all.FromData.parent_id"></el-input>
          </el-form-item>

          <!-- <el-form-item :label="mock_all.columns[14].label">
          <el-input v-model="mock_all.FromData.client_creator"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[15].label">
          <el-input v-model="mock_all.FromData.client_createtime"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[16].label">
          <el-input v-model="mock_all.FromData.client_updator"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[17].label">
          <el-input v-model="mock_all.FromData.client_updatetime"></el-input>
        </el-form-item> -->
        </el-form>
      </div>

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
      centerDialogVisible: false,//弹框
      fromtitle: '',
      addorChange: true,//判断修改新增
      tableData: '',
      pageSize: 10,
      pageCurrent: 1,
      format_search: '',
      supplier_search: '',
      product_search: ''
    }
  },
  computed: {
    ...mapState({
      // 获得菜单列表数据
      mock_all: state => state.materials.tableData,//{fromData,list,columns}
      changeIndex: state => state.materials.changeIndex,//修改的位置
      Fromadd: state => state.materials.Fromadd,
      format_store: state => state.format.tableData.list,
      supplier_store: state => state.supplier.tableData.list,
      product_store: state => state.product.tableData.list,
    }),

  },
  created() {
    this.tableShow(this.mock_all.list)
  },
  methods: {
    //列表显示
    tableShow(data) {
      let _data=data.slice((this.pageCurrent - 1) * this.pageSize, this.pageCurrent * this.pageSize)
      this.tableData = _data
    },
    //filter
    onFilter() {
      var filterData = this.mock_all.list.filter(item => !this.format_search || item.format_id.toLowerCase().includes(this.format_search.toLowerCase()))
      filterData = filterData.filter(item => !this.supplier_search || item.supplier_id.toLowerCase().includes(this.supplier_search.toLowerCase()))
      filterData = filterData.filter(item => !this.product_search || item.product_id.toLowerCase().includes(this.product_search.toLowerCase()))

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

    },
    //修改
    pwdChange(index, row) {
      this.fromtitle = '修改';
      this.$store.commit('materials/setChangeIndex', (index + (this.pageCurrent - 1) * this.pageSize))
      this.addorChange = false;
      this.centerDialogVisible = true;
      this.mock_all.FromData = { ...row };
    },
    //弹窗确认
    fromOr() {
      //拷贝from的值
      this.$store.commit('materials/setFromadd', { ...this.mock_all.FromData })
      this.$store.commit('materials/setNowTime')
      if (this.addorChange) {
        this.$store.commit('materials/rowAddStore')
      } else {
        this.$store.commit('materials/pwdChange')
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
  }

}
</script>

<style lang="scss" scoped>
.dialog_select {
  display: flex;
  justify-content: space-between;
}
.fromheight {
  height: 500px;
  overflow: auto;
}


</style>