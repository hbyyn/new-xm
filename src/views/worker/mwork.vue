<template>
  <div class="page">
    <div class="tableTop">
      <div class="search">
        <span>物料编号:</span>
        <el-select class="selectSearch" v-model="materialSearch" clearable filterable size="small" placeholder="请选择">
          <el-option v-for="item in mock_all.list" :key="item.material_id" :label="item.material_id"
            :value="item.material_id">
          </el-option>
        </el-select>
        <span>工序编号:</span>
        <el-select class="selectSearch" v-model="workSearch" clearable filterable size="small" placeholder="请选择">
          <el-option v-for="item in mock_all.list" :key="item.work_id" :label="item.repair_id" :value="item.work_id">
          </el-option>
        </el-select>
        <span>工序开始:</span>
        <div class="selecData">
          <el-date-picker v-model="begindateSearch.start" placeholder="开始日期" default-time="08:30:00" type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
          <el-date-picker v-model="enddateSearch.end" type="datetime" placeholder="结束日期" default-time="18:00:00">
          </el-date-picker>
        </div>

        <span>工序结束:</span>
        <div class="selecData">
          <el-date-picker v-model="enddateSearch.start" placeholder="开始日期" default-time="08:30:00" type="datetime"
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
    <el-dialog :title="formtitle" :visible.sync="centerDialogVisible" width="40%">
      <el-form label-position="left" label-width="80px" :model="mock_all.formData" :rules="rules" ref="ruleForm">
        <el-form-item :label="mock_all.columns[1].label" prop="material_id">
          <el-select v-model="mock_all.formData.material_id" placeholder="请选择">
            <el-option class="dialog_select" v-for="item in materials_store" :key="item.id"
              :value="item.material_id+' '+item.material_name">
              <span>{{'ID:'+item.material_id}}</span>
              <span>{{'材料名:'+item.material_name}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="mock_all.columns[2].label">
          <el-select v-model="mock_all.formData.work_id" placeholder="请选择">
            <el-option class="dialog_select" v-for="item in work_store" :key="item.id"
              :value="item.work_id+' '+item.work_name">
              <span>{{'ID:'+item.work_id}}</span>
              <span>{{'材料名:'+item.work_name}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="mock_all.columns[3].label">
          <el-date-picker v-model="mock_all.formData.material_work_begindate" type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="mock_all.columns[4].label">
          <el-date-picker v-model="mock_all.formData.material_work_enddate" type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="formOr('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HelloWorld',
  data() {
    return {
      multipleSelection: [],
      centerDialogVisible: false,
      formtitle: '',
      addorChange: true,//判断修改新增
      tableData: '',
      pageSize: 10,
      pageCurrent: 1,
      flagPaging: false,
      materialSearch: '',
      workSearch: '',
      begindateSearch: {
        start: '',
        end: ''
      },
      enddateSearch: {
        start: '',
        end: ''
      },
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
      mock_all: state => state.mwork.tableData,//{formData,list,columns}
      changeIndex: state => state.mwork.changeIndex,
      formadd: state => state.mwork.formadd,
      materials_store: state => state.materials.tableData.list,
      work_store: state => state.work.tableData.list,
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
      var filterData = this.mock_all.list.filter(item => !this.materialSearch || item.material_id.toLowerCase().includes(this.materialSearch.toLowerCase()))

      filterData = filterData.filter(item => !this.workSearch || item.work_id.toLowerCase().includes(this.workSearch.toLowerCase()))
      filterData = filterData.filter(item => {
        let startTime = Date.parse(this.begindateSearch.start);
        let endTime = Date.parse(this.begindateSearch.end);
        let listTime = Date.parse(item.material_work_begindate);
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
        let startTime = Date.parse(this.enddateSearch.start);
        let endTime = Date.parse(this.enddateSearch.end);
        let listTime = Date.parse(item.material_work_enddate);
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
          this.$store.commit('mwork/rowRemoveStore', this.multipleSelection)
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
      this.formtitle = '新增';
      let obj = this.mock_all.formData
      for (let k of Object.keys(obj)) {
        obj[k] = ''
      }
    },
    //修改
    pwdChange(index, row) {
      this.formtitle = '修改';
      this.$store.commit('mwork/setChangeIndex', (index + (this.pageCurrent - 1) * this.pageSize));
      this.addorChange = false;
      this.centerDialogVisible = true;
      this.mock_all.formData = { ...row };
    },
    //submit
    formOr(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // submit
          this.$store.commit('mwork/setformadd', { ...this.mock_all.formData })
          this.$store.commit('mwork/setNowTime')
          if (this.addorChange) {
            // this.mock_all.list.unshift(this.formadd)
            this.$store.commit('mwork/rowAddStore')
          } else {
            // this.mock_all.list.splice(this.changeIndex, 1, this.formadd)
            this.$store.commit('mwork/pwdChange')
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
.page .tableTop .search .selecData {
  margin: 0 10px;
}
.page .tableTop .search .selecData .el-input {
  width: 190px;
  margin: 0 2px;
}
</style>