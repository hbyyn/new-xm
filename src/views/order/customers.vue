<template>
  <div class="page">
    <div class="tableTop">
      <div class="search">
        <span>客户编号:</span>
        <el-select class="selectSearch" v-model="idSearch" clearable filterable size="small" placeholder="请选择">
          <el-option v-for="(item,index) in searchList" :key="index"
            :label="item.customers_id+' '+item.customers_name" :value="item.customers_id">
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
        <el-form-item :label="mock_all.columns[0].label" prop="customers_id">
          <el-input v-model="mock_all.formData.customers_id" :disabled="disabledFlat"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[1].label">
          <el-input v-model="mock_all.formData.customers_name"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[2].label">
          <el-input v-model="mock_all.formData.customers_tel"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[3].label">
          <el-input v-model="mock_all.formData.customers_address"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[4].label">
          <el-input v-model="mock_all.formData.customers_fax"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[5].label">
          <el-input v-model="mock_all.formData.customers_meno"></el-input>
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
          let idCheck = this.mock_all.list.filter(item => item.customers_id == value)
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
      centerDialogVisible: false,
      formtitle: '',
      addorChange: true,//判断修改新增
      disabledFlat: false,
      tableData: '',
      pageSize: 10,
      pageCurrent: 1,
      idSearch: '',
      nameSearch: '',
      flagPaging: false,
      rules: {
        customers_id: [
          { validator: checkID, trigger: 'blur' },
        ],
      },

    }
  },
  computed: {
    ...mapState({
      // 获得菜单列表数据
      mock_all: state => state.customers.tableData,//{formData,list,columns}
      changeIndex: state => state.customers.changeIndex,
      formadd: state => state.customers.formadd,
      count: state => state.customers.count,
      searchList: state => state.customers.searchList,
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
    this.$store.dispatch('customers/getListAction',{
      "pageIndex":1,
      "pageSize": 10,
    });
    this.$store.dispatch('customers/checkListAction');
    this.tableShow(this.mock_all.list)
  },
  methods: {
    // // 搜索弹框数据，去重
    // restaurants(key) {
    //   let restaurants = [];
    //   for (var i = 0; i < this.mock_all.list.length; i++) {
    //     restaurants.push({ value: '' });
    //     restaurants[i].value = this.mock_all.list[i][key]//修改点
    //   }
    //   // 去重
    //   let hash = {};
    //   restaurants = restaurants.reduce((preVal, curVal) => {
    //     hash[curVal.value] ? '' : hash[curVal.value] = true && preVal.push(curVal);
    //     return preVal
    //   }, [])
    //   return restaurants
    // },
    // //搜索1
    // queryStringId(queryString, cb) {
    //   let restaurants = this.restaurants('customers_id')
    //   var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
    //   // 调用 callback 返回建议列表的数据
    //   cb(results);
    // },
    // //搜索2
    // queryStringName(queryString, cb) {
    //   let restaurants = this.restaurants('customers_name')
    //   var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
    //   // 调用 callback 返回建议列表的数据
    //   cb(results);
    // },
    // createFilter(queryString) {
    //   return (restaurant) => {
    //     return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
    //   };
    // },

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
      // var filterData = this.mock_all.list.filter(item => !this.idSearch || item.customers_id.toLowerCase().includes(this.idSearch.toLowerCase()))
      this.$store.dispatch('customers/getListAction',{"customersId":this.idSearch});
      this.tableShow(this.mock_all.list)
      // this.tableShow(filterData)
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
        this.$store.dispatch('customers/deleteSingleAction', row.customers_id);
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
          listRemove.push(item.customers_id)
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
          // this.$store.commit('customers/rowRemoveStore', this.multipleSelection)
          this.$store.dispatch('customers/deleteListAction', listRemove)
          this.tableShow(this.mock_all.list)
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
      this.$store.commit('customers/setChangeIndex', (index + (this.pageCurrent - 1) * this.pageSize))
      this.addorChange = false;
      this.centerDialogVisible = true;
      this.disabledFlat = true;
      this.mock_all.formData = { ...row };
    },
    //submit
    formOr(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // submit
          this.$store.commit('customers/setformadd', { ...this.mock_all.formData })
          // this.$store.commit('customers/setNowTime')
          if (this.addorChange) {
            // this.$store.commit('customers/rowAddStore')
            // this.$message({
            //   type: 'success',
            //   showClose: true, duration: 2000, message: '新增成功!'
            // })
            this.$store.dispatch('customers/addListAction');
          } else {
            // this.$store.commit('customers/pwdChange')
            // this.$message({
            //   type: 'success',
            //   showClose: true, duration: 2000, message: '修改成功!'
            // })
            this.$store.dispatch('customers/editListAction');
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
      console.log('1111',val)
      this.$store.dispatch('customers/getListAction',{"pageSize":val});
      this.tableShow(this.mock_all.list)
      // this.onFilter()
    },
    handleCurrentChange(val) {
      this.pageCurrent = val
      console.log('2222',val)
      this.$store.dispatch('customers/getListAction',{"pageIndex":val});
      this.tableShow(this.mock_all.list)
      // this.onFilter()
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