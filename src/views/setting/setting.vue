<template>
  <div class="page">
    <div class="tableTop">
      <div class="search">
        <span>创建时间:</span>
        <div class="selecDate">
          <el-date-picker v-model="createtimeSearch.start" placeholder="开始日期" default-time="08:30:00" type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
          <el-date-picker v-model="createtimeSearch.end" type="datetime" placeholder="结束日期" default-time="18:00:00">
          </el-date-picker>
        </div>
        <el-button type="primary" size="small" round @click="onFilter">查找</el-button>
      </div>

      <div class="rowAdd">
        <el-button type="danger" size="small" @click="rowRemove()">删除选中</el-button>
        <el-button type="primary" size="small" @click="rowAdd">新增</el-button>
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
          <!-- <el-button size="mini" type="primary" @click="roleChang(scope.$index,scope.row)">
            权限管理
          </el-button> -->
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
      <el-form label-position="right" label-width="120px" :model="mock_all.formData" :rules="rules" ref="ruleForm">
        <el-form-item :label="mock_all.columns[0].label" prop="login_id">
          <el-input v-model="mock_all.formData.login_id" :disabled="disabledFlat"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[1].label">
          <el-input v-model="mock_all.formData.login_name"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[2].label">
          <el-input v-model="mock_all.formData.login_acode"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[3].label">
          <el-select v-model="mock_all.formData.role_id"  clearable filterable placeholder="请选择">
            <!-- 对象加value-key="role_id" -->
            <el-option class="dialog_select" v-for="item in role_list" :key="item.role_id" :value="`${item.role_id} ${item.role_name}`"
              :label="`${item.role_id} ${item.role_name}`">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="formOr('ruleForm')">确 定</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 权限管理 -->
    <!-- <el-dialog title="权限设置" :visible.sync="roleVisible" width="540px">

    </el-dialog> -->

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      multipleSelection: [],
      centerDialogVisible: false,
      formtitle: '',
      addorChange: true,//判断修改新增
      disabledFlat: false,
      tableData: '',
      pageSize: 10,
      pageCurrent: 1,
      flagPaging: false,
      createtimeSearch: {
        start: '',
        end: ''
      },
      roleVisible: false,
      rules: {
        login_id: [
          { required: true, message: '请输入编号', trigger: 'blur' },
        ],
      },

    }
  },
  computed: {
    ...mapState({
      // 获得菜单列表数据
      mock_all: state => state.setting.tableData,//{formData,list,columns}
      changeIndex: state => state.setting.changeIndex,
      formadd: state => state.setting.formadd,
      role_list: state => state.role.tableData.list,
    }),

  },
  watch: {
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
      var filterData = this.mock_all.list.filter(item => {
        let startTime = Date.parse(this.createtimeSearch.start);
        let endTime = Date.parse(this.createtimeSearch.end);
        let listTime = Date.parse(item.client_createtime);
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
    rowDel(index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          showClose: true, duration: 2000, message: '删除成功!'
        });
        this.mock_all.list.splice(index, 1);
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
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            showClose: true, duration: 2000, message: '删除成功!'
          });
          this.$store.commit('setting/rowRemoveStore', this.multipleSelection)
          this.tableShow(this.mock_all.list)
          // console.log(this.multipleSelection)
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
      this.$store.commit('setting/setChangeIndex', (index + (this.pageCurrent - 1) * this.pageSize))
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
          this.$store.commit('setting/setformadd', { ...this.mock_all.formData })
          this.$store.commit('setting/setNowTime')
          if (this.addorChange) {
            this.$store.commit('setting/rowAddStore')
            this.$message({
              type: 'success',
              showClose: true, duration: 2000, message: '新增成功!'

            })
            console.log(this.mock_all.formData.role_id)
          } else {
            this.$store.commit('setting/pwdChange')
            this.$message({
              type: 'success',
              showClose: true, duration: 2000, message: '修改成功!'
            })
          }
          this.centerDialogVisible = false
          this.tableShow(this.mock_all.list)

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //权限管理
    roleChang(index, row) {
      this.roleVisible = true;
      console.log(index, row)
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
.page .tableTop .search .selecDate {
  margin: 0 10px;
}
.page .tableTop .search .selecDate .el-input {
  width: 190px;
  margin: 0 2px;
}
</style>