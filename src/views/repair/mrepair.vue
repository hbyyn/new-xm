<template>
  <div class="page">
    <div class="tableTop">
      <div class="search">
        <span>产品编号:</span>
        <el-select class="selectSearch" v-model="materialIdSearch" clearable filterable size="small" placeholder="请选择">
          <el-option v-for="item in mock_all.list" :key="item.material_id" :label="item.material_id"
            :value="item.material_id">
          </el-option>
        </el-select>
        <span>返修编号:</span>
        <el-select class="selectSearch" v-model="repairIdSearch" clearable filterable size="small" placeholder="请选择">
          <el-option v-for="item in mock_all.list" :key="item.repair_id" :label="item.repair_id"
            :value="item.repair_id">
          </el-option>
        </el-select>
        <span>启动日期:</span>
        <div class="selecDate">
          <el-date-picker v-model="begindateSearch.start" type="datetime" placeholder="开始日期" default-time="08:30:00"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
          <el-date-picker v-model="begindateSearch.end" type="datetime" placeholder="结束日期" default-time="18:00:00">
          </el-date-picker>
        </div>

        <span>结束日期:</span>
        <div class="selecDate">
          <el-date-picker v-model="enddateSearch.start" type="datetime" placeholder="开始日期" default-time="08:30:00"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
          <el-date-picker v-model="enddateSearch.end" type="datetime" placeholder="结束日期" default-time="18:00:00">
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
    <el-dialog :title="formtitle" :visible.sync="centerDialogVisible" width="500px">
      <el-form label-position="right" label-width="120px" :model="mock_all.formData" :rules="rules" ref="ruleForm">
        <el-form-item :label="mock_all.columns[0].label" prop="material_id">
          <el-select v-model="mock_all.formData.material_id" :readonly="readonlyFlat" placeholder="请选择">
            <el-option class="dialog_select" v-for="item in materials_store" :key="item.id"
              :value="item.material_id+' '+item.material_name">
              <span>{{'ID:'+item.material_id}}</span>
              <span>{{'材料名:'+item.material_name}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="mock_all.columns[1].label">
          <el-select v-model="mock_all.formData.repair_id" placeholder="请选择">
            <el-option class="dialog_select" v-for="item in repair_store" :key="item.id"
              :value="item.repair_id+' '+item.repair_name">
              <span>{{'ID:'+item.repair_id}}</span>
              <span>{{'返修名:'+item.repair_name}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="mock_all.columns[2].label">
          <el-date-picker v-model="mock_all.formData.material_repair_begindate" type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
          </el-date-picker>

        </el-form-item>
        <el-form-item :label="mock_all.columns[3].label">
          <el-date-picker v-model="mock_all.formData.material_repair_enddate" type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
          </el-date-picker>
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
    return {
      multipleSelection: [],
      centerDialogVisible: false,
      formtitle: '',
      addorChange: true,//判断修改新增
      readonlyFlat: false,
      tableData: '',
      pageSize: 10,
      pageCurrent: 1,
      materialIdSearch: '',
      repairIdSearch: '',
      begindateSearch: {
        start: '',
        end: ''
      },
      enddateSearch: {
        start: '',
        end: ''
      },
      flagPaging: false,
      rules: {
        material_id: [
          { required: true, message: '请输入编号', trigger: 'blur' },
        ],
      },

    }
  },
  computed: {
    ...mapState({
      // 获得菜单列表数据
      mock_all: state => state.mrepair.tableData,//{formData,list,columns}
      changeIndex: state => state.mrepair.changeIndex,
      formadd: state => state.mrepair.formadd,
      materials_store: state => state.materials.tableData.list,
      repair_store: state => state.repair.tableData.list,
    }),

  },
   watch: {
     //弹窗回车
    centerDialogVisible(val) {
      if (val) {
        document.onkeydown =  (e)=> {
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

      var filterData = this.mock_all.list.filter(item => !this.materialIdSearch || item.material_id.toLowerCase().includes(this.materialIdSearch.toLowerCase()))
      filterData = filterData.filter(item => !this.repairIdSearch || item.repair_id.toLowerCase().includes(this.repairIdSearch.toLowerCase()))

      filterData = filterData.filter(item => {
        let startTime = Date.parse(this.begindateSearch.start),
          endTime = Date.parse(this.begindateSearch.end),
          listTime = Date.parse(item.material_repair_begindate);
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
        let startTime = Date.parse(this.enddateSearch.start),
          endTime = Date.parse(this.enddateSearch.end),
          listTime = Date.parse(item.material_repair_enddate);
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
          message: '删除成功!'
        });
        this.mock_all.list.splice(index, 1);
        this.tableShow(this.mock_all.list)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
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
            message: '删除成功!'
          });
          this.$store.commit('mrepair/rowRemoveStore', this.multipleSelection)
          this.tableShow(this.mock_all.list)
          console.log(this.multipleSelection)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
      else {
        this.$message({
          type: "warning",
          message: "请选择需要删除的选项"
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
      this.$store.commit('mrepair/setChangeIndex', (index + (this.pageCurrent - 1) * this.pageSize))
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
          this.$store.commit('mrepair/setformadd', { ...this.mock_all.formData })
          this.$store.commit('mrepair/setNowTime')
          if (this.addorChange) {
            this.$store.commit('mrepair/rowAddStore')
            this.$message({
              type: 'success',
              message: '新增成功!'
            })
          } else {
            this.$store.commit('mrepair/pwdChange')
             this.$message({
              type: 'success',
              message: '修改成功!'
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
.page .tableTop {
  display: block;
  height: 100px;
  position: relative;
}
.page .tableTop .search {
  float: left;
  flex-wrap: wrap;
  height: 100px;
  width: 1000px;
  position: relative;
}
.page .tableTop .search .el-button {
  position: absolute;
  right: 60px;
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
</style>