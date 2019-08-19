<template>
  <div class="page">
    <div class="tableTop">
      <div class="search">
        <span>物料编号:</span>
        <el-select class="selectSearch" v-model="materialIdSearch" clearable filterable size="small" placeholder="请选择">
          <el-option v-for="(item,index) in mock_all.list" :key="index" :label="item.material_id"
            :value="item.material_id">
          </el-option>
        </el-select>
        <span>物料名称:</span>
        <el-select class="selectSearch" v-model="materialNameSearch" clearable filterable size="small"
          placeholder="请选择">
          <el-option v-for="(item,index) in mock_all.list" :key="index" :label="item.material_name"
            :value="item.material_name">
          </el-option>
        </el-select>
        <span>物料类型:</span>
        <el-select class="selectSearch" v-model="materialTypeSearch" clearable filterable size="small"
          placeholder="请选择">
          <el-option v-for="(item,index) in mock_all.list" :key="index" :label="item.material_type"
            :value="item.material_type">
          </el-option>
        </el-select>


        <span>规格编号:</span>
        <el-select class="selectSearch" v-model="formatSearch" clearable filterable size="small" placeholder="请选择">
          <el-option v-for="(item,index) in mock_all.list" :key="index" :label="item.format_id" :value="item.format_id">
          </el-option>
        </el-select>
        <span>供应商编号:</span>
        <el-select class="selectSearch" v-model="supplierSearch" clearable filterable size="small" placeholder="请选择">
          <el-option v-for="(item,index) in mock_all.list" :key="index" :label="item.supplier_id"
            :value="item.supplier_id">
          </el-option>
        </el-select>
        <span>ERP编号:</span>
        <el-select class="selectSearch" v-model="materialErpidSearch" clearable filterable size="small"
          placeholder="请选择">
          <el-option v-for="(item,index) in mock_all.list" :key="index" :label="item.material_erpid"
            :value="item.material_erpid">
          </el-option>
        </el-select>
        <span>领料人:</span>
        <el-select class="selectSearch" v-model="materialOperateridSearch" clearable filterable size="small"
          placeholder="请选择">
          <el-option v-for="(item,index) in mock_all.list" :key="index" :label="item.material_operaterid"
            :value="item.material_operaterid">
          </el-option>
        </el-select>
        <span>产品编号:</span>
        <el-select class="selectSearch" v-model="productSearch" clearable filterable size="small" placeholder="请选择">
          <el-option v-for="(item,index) in mock_all.list" :key="index" :label="item.product_id"
            :value="item.product_id">
          </el-option>
        </el-select>
        <span>EPR入库日期:</span>
        <div class="selecDate">
          <el-date-picker v-model="indateSearch.start" type="datetime" placeholder="开始日期" default-time="08:30:00"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
          <el-date-picker v-model="indateSearch.end" type="datetime" placeholder="结束日期" default-time="18:00:00">
          </el-date-picker>
        </div>

        <span>领料时间:</span>
        <div class="selecDate">
          <el-date-picker v-model="operaterdateSearch.start" type="datetime" placeholder="开始日期" default-time="08:30:00"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
          <el-date-picker v-model="operaterdateSearch.end" type="datetime" placeholder="结束日期" default-time="18:00:00">
          </el-date-picker>
        </div>
        <el-button type="primary" size="small" round @click="onFilter">查找</el-button>
      </div>
      <div class="rowAdd">
        <el-button type="primary" size="small" @click="rowAdd">新增</el-button>
        <el-button type="danger" size="small" @click="rowRemove()">删除选中</el-button>
      </div>
    </div>
    <!--  主体 -->
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" @click="rowSelec(mock_all.list)">
      </el-table-column>

      <!--  list -->
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
    <el-dialog :title="formtitle" :visible.sync="centerDialogVisible" width="500px">
      <div class="formheight">
        <el-form class="formAdd" label-position="right" label-width="120px" :model="formData" :rules="rules"
          ref="ruleForm">

          <!-- <el-form-item :label="mock_all.columns[0].label">
          <el-input v-model="formData.client_id"></el-input>
        </el-form-item> -->
          <el-form-item :label="mock_all.columns[0].label" prop="material_id">
            <el-input v-model="formData.material_id" :disabled="disabledFlat"></el-input>
          </el-form-item>
          <el-form-item :label="mock_all.columns[1].label">
            <el-input v-model="formData.material_name"></el-input>
          </el-form-item>
          <el-form-item :label="mock_all.columns[2].label">
            <el-input v-model="formData.material_type"></el-input>
          </el-form-item>

          <el-form-item :label="mock_all.columns[3].label">
            <el-select @keyup.enter.native.self.prevent v-model="formData.format_id" filterable clearable
              placeholder="请选择">
              <el-option class="dialog_select" v-for="item in format_store" :key="item.id"
                :value="item.format_id+' '+item.format_name">
                <span>{{item.format_id}}</span>
                <span>{{' '+item.format_name}}</span>
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="mock_all.columns[4].label">
            <el-input v-model="formData.material_unit"></el-input>
          </el-form-item>
          <el-form-item :label="mock_all.columns[5].label">
            <!-- <el-input v-model="formData.supplier_id"></el-input> -->
            <el-select v-model="formData.supplier_id" filterable clearable placeholder="请选择">
              <el-option class="dialog_select" v-for="item in supplier_store" :key="item.id"
                :value="item.supplier_id+' '+item.supplier_name">
                <span>{{item.supplier_id}}</span>
                <span>{{" "+item.supplier_name}}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="mock_all.columns[6].label">
            <el-input v-model="formData.material_erpid"></el-input>
          </el-form-item>
          <el-form-item :label="mock_all.columns[7].label">
            <!-- <el-input v-model="formData.material_indate"></el-input> -->
            <el-date-picker v-model="formData.material_indate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="mock_all.columns[8].label">
            <el-input v-model="formData.material_storeid"></el-input>
          </el-form-item>
          <el-form-item :label="mock_all.columns[9].label">
            <el-input v-model="formData.material_operaterid">
            </el-input>
          </el-form-item>
          <el-form-item :label="mock_all.columns[10].label">
            <!-- <el-input v-model="formData.material_operaterdate"></el-input> -->
            <el-date-picker v-model="formData.material_operaterdate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="mock_all.columns[11].label">
            <el-select v-model="formData.parent_id" clearable :disabled="flagParentId" placeholder="请选择">
              <el-option class="dialog_select" v-for="(item,index) in mock_all.list" :key="index" :value="item.material_id" :label="item.material_id+ ' ' +item.material_name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="mock_all.columns[12].label">

            <el-select v-model="formData.product_id" clearable :disabled="flagProductId" placeholder="请选择">
              <el-option class="dialog_select" v-for="item in product_store" :key="item.id"
                :value="item.product_id+' '+item.product_name">
                <span>{{item.product_id}}</span>
                <span>{{' '+item.product_name}}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="mock_all.columns[13].label">
          <el-input v-model="formData.material_meno"></el-input>
        </el-form-item>

          <!-- <el-form-item :label="mock_all.columns[14].label">
          <el-input v-model="formData.client_creator"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[15].label">
          <el-input v-model="formData.client_createtime"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[16].label">
          <el-input v-model="formData.client_updator"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[17].label">
          <el-input v-model="formData.client_updatetime"></el-input>
        </el-form-item> -->
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" native-type="submit" @click="formOr('ruleForm')">确 定</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      multipleSelection: [],
      centerDialogVisible: false,//弹框
      formtitle: '',
      addorChange: true,//判断修改新增
      disabledFlat: false,
      tableData: '',
      flagParentId: false,
      flagProductId: false,
      formData: {
        client_id: "",
        material_id: "",
        material_type: "",
        material_name: "",
        format_id: "",
        material_unit: "",
        supplier_id: "",
        material_erpid: "",
        material_indate: "",
        material_storeid: "",
        material_operaterid: "",
        material_operaterdate: "",
        parent_id: "",
        product_id: "",
        material_meno:'',
        client_creator: "",
        client_createtime: "",
        client_updator: "",
        client_updatetime: ""
      },
      pageSize: 10,
      pageCurrent: 1,
      flagPaging: false,
      //搜索框value
      materialIdSearch: '',
      materialTypeSearch: '',
      materialNameSearch: '',
      formatSearch: '',
      supplierSearch: '',
      materialErpidSearch: '',
      materialOperateridSearch: '',
      productSearch: '',
      indateSearch: {
        start: '',
        end: ''
      },
      operaterdateSearch: {
        start: '',
        end: ''
      },
      //验证
      rules: {
        material_id: [
          { required: true, message: '请输入编号', trigger: 'blur' },
        ],
      }
    }
  },
  computed: {
    ...mapState({
      // 获得菜单列表数据
      mock_all: state => state.materials.tableData,//{formData,list,columns}
      changeIndex: state => state.materials.changeIndex,//修改的位置
      formadd: state => state.materials.formadd,
      format_store: state => state.format.tableData.list,
      supplier_store: state => state.supplier.tableData.list,
      product_store: state => state.product.tableData.list,
    }),
    tableList(){
      return this.mock_all.list
    },
    fromParentId() {
      return this.formData.parent_id
    },
    fromProductId() {
      return this.formData.product_id
    },
  },
  watch: {
    tableList(){
      this.tableShow(this.mock_all.list)
    },
    //弹窗回车
    centerDialogVisible(val) {
      if (val) {
        document.onkeydown = (e) => {
          let ev = e || window.event
          if (ev.keyCode == 13) {
            this.formOr('ruleForm');
          }
        }
      } else {
        document.onkeydown = undefined;
      }
    },
    // fromParentId(val) {
    //   if (val) {
    //     this.flagProductId = true
    //   } else {
    //     this.flagProductId = false
    //   }
    // },
    // fromProductId(val) {
    //   if (val) {
    //     this.flagParentId = true
    //   } else {
    //     this.flagParentId = false
    //   }
    // },


  },
  created() {
    this.$store.dispatch('materials/getListAction');
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
      var filterData = this.mock_all.list.filter(item => !this.materialIdSearch || item.material_id.toLowerCase().includes(this.materialIdSearch.toLowerCase()))
      filterData = filterData.filter(item => !this.materialTypeSearch || item.material_type.toLowerCase().includes(this.materialTypeSearch.toLowerCase()))
      filterData = filterData.filter(item => !this.materialNameSearch || item.material_name.toLowerCase().includes(this.materialNameSearch.toLowerCase()))
      filterData = filterData.filter(item => !this.formatSearch || item.format_id.toLowerCase().includes(this.formatSearch.toLowerCase()))
      filterData = filterData.filter(item => !this.supplierSearch || item.supplier_id.toLowerCase().includes(this.supplierSearch.toLowerCase()))
      filterData = filterData.filter(item => !this.materialErpidSearch || item.material_erpid.toLowerCase().includes(this.materialErpidSearch.toLowerCase()))
      filterData = filterData.filter(item => !this.materialOperateridSearch || item.material_operaterid.toLowerCase().includes(this.materialOperateridSearch.toLowerCase()))
      filterData = filterData.filter(item => !this.productSearch || item.product_id.toLowerCase().includes(this.productSearch.toLowerCase()))

      filterData = filterData.filter(item => {
        let startTime = Date.parse(this.indateSearch.start),
          endTime = Date.parse(this.indateSearch.end),
          listTime = Date.parse(item.material_indate);
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
      filterData = filterData.filter(item => {
        let startTime = Date.parse(this.operaterdateSearch.start),
          endTime = Date.parse(this.operaterdateSearch.end),
          listTime = Date.parse(item.material_operaterdate);
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
    //移除
    rowDel(index,row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.$message({
        //   type: 'success',
        //   showClose: true, duration: 2000, message: '删除成功!'
        // });
        // this.mock_all.list.splice(index, 1);
        this.$store.dispatch('materials/deleteSingleAction', row.material_id);
        this.tableShow(this.mock_all.list)
      }).catch(() => {
        this.$message({
          type: 'info',
          showClose: true, duration: 2000, message: '已取消删除'
        });
      });

    },
    // 选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //批量删除
    rowRemove() {
      if (this.multipleSelection.length) {
         let listRemove = []
        let xxx = this.multipleSelection
        xxx.map(item => {
          listRemove.push(item.material_id)
          return listRemove
        })
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   showClose: true, duration: 2000, message: '删除成功!'
          // });
          // this.$store.commit('materials/rowRemoveStore', this.multipleSelection)
          this.$store.dispatch('materials/deleteListAction', listRemove)
          this.tableShow(this.mock_all.list)
          console.log(this.multipleSelection)
        }).catch(() => {
          this.$message({
            type: 'info',
            showClose: true, duration: 2000, message: '已取消删除'
          });
        });
      }
      else {
        this.$message({
          type: "warning",
          showClose: true, duration: 2000, message: "请选择需要删除的选项"
        });
        return false;
      }
    },
    //新增
    rowAdd() {
      this.addorChange = true;
      this.centerDialogVisible = true;
      this.disabledFlat = false;
      this.formtitle = '新增';

      let obj = this.formData
      for (let k of Object.keys(obj)) {
        obj[k] = ''
      }

    },
    //修改
    pwdChange(index, row) {
      this.formtitle = '修改';
      this.$store.commit('materials/setChangeIndex', (index + (this.pageCurrent - 1) * this.pageSize))
      this.addorChange = false;
      this.centerDialogVisible = true;
      this.disabledFlat = true;
      this.formData = { ...row };
    },
    //弹窗确认
    formOr(formName) {
      //验证
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // submit
          this.$store.commit('materials/setformadd', { ...this.formData })
          // this.$store.commit('materials/setNowTime')
          if (this.addorChange) {
            // this.$store.commit('materials/rowAddStore')
            // this.$message({
            //   type: 'success',
            //   showClose: true, duration: 2000, message: '新增成功!'
            // })
            this.$store.dispatch('materials/addListAction');

          } else {
            // this.$store.commit('materials/pwdChange')
            // this.$message({
            //   type: 'success',
            //   showClose: true, duration: 2000, message: '修改成功!'
            // })
            console.log(this.formData.parent_id)
            this.$store.dispatch('materials/editListAction');
          }
          this.centerDialogVisible = false
          this.tableShow(this.mock_all.list)

        } else {
          console.log('error submit!!');
          return false;
        }
      })

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
  height: 150px;
  position: relative;
}
.page .tableTop .search {
  float: left;
  flex-wrap: wrap;
  width: 1040px;
  height: 150px;
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
.page .tableTop .search .selecDate {
  margin: 0 10px;
}
.page .tableTop .search .selecDate .el-input {
  width: 190px;
  margin: 0 2px;
}

.formheight {
  height: 400px;
  overflow: auto;
}
</style>