<template>
  <div class="page">
    <div class="tableTop">
      <div class="search">
        <span>供应商编号:</span>
        <el-select class="selectSearch" v-model="idSearch" clearable filterable size="small" placeholder="请选择">
          <el-option v-for="(item,index) in searchList" :key="index" :label="item.supplier_id+' '+item.supplier_name"
            :value="item.supplier_id">
          </el-option>
        </el-select>
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
      layout="total, sizes, prev, pager, next, jumper" :total="count">
    </el-pagination>
    <!-- 新增 -->
    <el-dialog :title="formtitle" :visible.sync="centerDialogVisible" width="500px">
      <el-form class="formAdd" label-position="right" label-width="120px" :model="mock_all.formData" :rules="rules" ref="ruleForm">
        <!-- <el-form-item :label="mock_all.columns[0].label">
          <el-input v-model="mock_all.formData.client_id"></el-input>
        </el-form-item> -->
        <el-form-item :label="mock_all.columns[0].label" prop="supplier_id">
          <el-input v-model="mock_all.formData.supplier_id" :disabled="disabledFlat"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[1].label">
          <el-input v-model="mock_all.formData.supplier_name"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[2].label">
          <el-input v-model="mock_all.formData.supplier_tel"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[3].label">
          <el-input v-model="mock_all.formData.supplier_address"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[4].label">
          <el-input v-model="mock_all.formData.supplier_fax"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[5].label">
          <el-input v-model="mock_all.formData.supplier_meno"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="formOr('ruleForm')">确 定</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    var checkID = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空,请输入编号'));
      }
      setTimeout(() => {
        if (this.addorChange == true) {
          let idCheck = this.mock_all.list.filter(item => item.supplier_id == value)
          if (idCheck.length > 0) {
            callback(new Error('编号已存在，请重新输入'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      }, 200);
    };
    return {
      multipleSelection: [],
      centerDialogVisible: false,//弹框
      formtitle: '',
      addorChange: true,//判断修改新增
      disabledFlat: false,
      tableData: '',
      pageSize: 10,
      pageCurrent: 1,
      flagPaging: false,
      nameSearch: '',
      idSearch: '',
      rules: {
        supplier_id: [
          { validator: checkID, trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      // 获得菜单列表数据
      mock_all: state => state.supplier.tableData,//{formData,list,columns}
      changeIndex: state => state.supplier.changeIndex,
      formadd: state => state.supplier.formadd,
      count: state => state.supplier.count,
      searchList: state => state.supplier.searchList,
    }),
    tableList() {
      return this.mock_all.list
    }
  },
  watch: {
    tableList() {
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
    }
  },
  created() {
    this.$store.dispatch('supplier/getListAction',{
      "pageIndex":1,
      "pageSize": 10,
    });
    this.$store.dispatch('supplier/checkListAction');
    this.tableShow(this.mock_all.list)

  },
  methods: {

    //列表显示
    tableShow(data) {
      // let _data = data.slice((this.pageCurrent - 1) * this.pageSize, this.pageCurrent * this.pageSize)
      this.tableData = data
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
      // var filterData = this.mock_all.list.filter(item => !this.idSearch || item.supplier_id.toLowerCase().includes(this.idSearch.toLowerCase()))

      // this.tableShow(filterData)
      this.$store.dispatch('supplier/getListAction',{"supplierId":this.idSearch});
      this.tableShow(this.mock_all.list)

    },
    //移除
    rowDel(index, row) {
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
        this.$store.dispatch('supplier/deleteSingleAction', row.supplier_id);
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
        let Selection = this.multipleSelection
        Selection.map(item => {
          listRemove.push(item.supplier_id)
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
          // this.$store.commit('supplier/rowRemoveStore', this.multipleSelection)
          this.$store.dispatch('supplier/deleteListAction', listRemove)
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
      this.centerDialogVisible = true;
      this.addorChange = true;
      this.disabledFlat = false;
      this.formtitle = '新增';
      let obj = this.mock_all.formData
      for (let k of Object.keys(obj)) {
        obj[k] = ''
      }
    },
    //修改
    pwdChange(index, row) {
      this.formtitle = '修改';
      this.$store.commit('supplier/setChangeIndex', (index + (this.pageCurrent - 1) * this.pageSize))
      this.addorChange = false;
      this.centerDialogVisible = true;
      this.disabledFlat = true;
      this.mock_all.formData = { ...row };
    },
    //弹窗确认
    formOr(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.commit('supplier/setformadd', { ...this.mock_all.formData })
          // this.$store.commit('supplier/setNowTime')
          if (this.addorChange) {
            // this.$store.commit('supplier/rowAddStore')
            // this.$message({
            //   type: 'success',
            //   showClose: true, duration: 2000, message: '新增成功!'
            // })
            this.$store.dispatch('supplier/addListAction');
          } else {
            // this.$store.commit('supplier/pwdChange')
            // this.$message({
            //   type: 'success',
            //   showClose: true, duration: 2000, message: '修改成功!'
            // })
            this.$store.dispatch('supplier/editListAction');
          }
          this.centerDialogVisible = false
          this.tableShow(this.mock_all.list)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.$store.dispatch('supplier/getListAction',{"pageSize":val});
      this.tableShow(this.mock_all.list)
    },
    handleCurrentChange(val) {
      this.pageCurrent = val
      this.$store.dispatch('supplier/getListAction',{"pageIndex":val});
      this.tableShow(this.mock_all.list)
    },
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