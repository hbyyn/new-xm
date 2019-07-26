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
            权限编辑
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
      <el-form label-position="right" label-width="120px" :model="mock_all.formData" :rules="rules" ref="ruleForm">
        <el-form-item :label="mock_all.columns[0].label" prop="role_id">
          <el-input v-model="mock_all.formData.role_id" :readonly="readonlyFlat"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[1].label">
          <el-input v-model="mock_all.formData.role_name"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="formOr('ruleForm')">确 定</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 权限编辑 -->
    <el-dialog class="rolePower" title="角色编辑" :visible.sync="roleVisible" width="340px">
      <el-form label-position="left" label-width="80px">
        <!-- <el-form-item hieght="20px" :label="item.label" v-for="(item,index) in listPower" :key="index"> -->
        <div v-for="(item,index) in listPower" :key="index">
          <span class="labelPower">{{item.label}} : </span>
          <el-checkbox v-model="item.visible" label="可见"></el-checkbox>
          <el-checkbox v-model="item.Operable" label="编辑"></el-checkbox>
        </div>

      </el-form>
      <span class="dialog-footer">
        <el-button type="primary" @click="rolesSubmit">确 定</el-button>
        <el-button @click="roleVisible = false">取 消</el-button>
      </span>

    </el-dialog>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      initlistPower: [
        {
          label: '供应商表',
          visible: true,
          Operable: true,
          url: '/materials/supplier',
        },
        {
          label: '物料表',
          visible: true,
          Operable: true,
          url: '/materials/product'
        },
        {
          label: '规格表',
          visible: true,
          Operable: true,
          url: '/materials/format'
        },
      ],
      listPower: () => (JSON.parse(JSON.stringify(this.initlistPower))),
      multipleSelection: [],//多选
      centerDialogVisible: false,
      formtitle: '',
      addorChange: true,//判断修改新增
      readonlyFlat: false,
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
        role_id: [
          { required: true, message: '请输入编号', trigger: 'blur' },
        ],
      },

    }
  },
  computed: {
    ...mapState({
      // 获得菜单列表数据
      mock_all: state => state.role.tableData,//{formData,list,columns}
      changeIndex: state => state.role.changeIndex,
      formadd: state => state.role.formadd,
    }),

  },
  created() {
    this.tableShow(this.mock_all.list)
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
  methods: {
    // 权限
    roleChang(index, row) {
      this.roleVisible = true;
      this.$store.commit('role/setChangeIndex', (index + (this.pageCurrent - 1) * this.pageSize))
      if (row.role_power) {
        this.listPower = [...row.role_power]
      } else {
        this.listPower = JSON.parse(JSON.stringify(this.initlistPower))
      }

    },
    rolesSubmit() {
      this.roleVisible = false;
      var xxx = this.listPower
      this.$store.commit('role/setRolePower', [...xxx])
    },
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
          this.$store.commit('role/rowRemoveStore', this.multipleSelection)
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
      this.readonlyFlat = false;
      this.formtitle = '新增';
      let obj = this.mock_all.formData
      for (let k of Object.keys(obj)) {
        obj[k] = ''
      }
    },
    //修改
    pwdChange(index, row) {
      this.formtitle = '修改';
      this.$store.commit('role/setChangeIndex', (index + (this.pageCurrent - 1) * this.pageSize))
      this.addorChange = false;
      this.centerDialogVisible = true;
      this.readonlyFlat = true;
      this.mock_all.formData = { ...row };
    },
    //submit
    formOr(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // submit
          this.$store.commit('role/setformadd', { ...this.mock_all.formData })
          this.$store.commit('role/setNowTime')
          if (this.addorChange) {
            this.$store.commit('role/rowAddStore')
            this.$message({
              type: 'success',
              showClose: true, duration: 2000, message: '新增成功!'
            })
          } else {
            this.$store.commit('role/pwdChange')
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
.rolePower {
  .labelPower {
    display: inline-block;
    width: 80px;
    margin-right: 20px;
  }

  .el-checkbox {
    height: 20px;
    line-height: 20px;
  }
}
</style>