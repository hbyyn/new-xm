<template>
  <div class="page">
    <div class="tableTop">
      <div class="search">
        <span>返修编号:</span>
        <el-select class="selectSearch" v-model="idSearch" clearable filterable size="small" placeholder="请选择">
          <el-option v-for="(item,index) in mock_all.list" :key="index" :label="item.repair_id+' '+item.repair_name"
            :value="item.repair_id">
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
            编辑
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
    <el-dialog :title="formtitle" :visible.sync="centerDialogVisible" width="60%">
      <el-form label-position="right" label-width="120px" :model="mock_all.formData" :rules="rules" ref="ruleForm">
        <el-form-item :label="mock_all.columns[0].label" prop="repair_id">
          <el-input v-model="mock_all.formData.repair_id" :readonly="readonlyFlat"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[1].label">
          <el-input v-model="mock_all.formData.repair_name"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[2].label">
          <el-input v-model="mock_all.formData.repair_desc"></el-input>
        </el-form-item>
        <!--富文本编辑器组件-->

        <el-form-item label="说明详细">
          <el-row style="height:200px;">
            <quill-editor class="ql-editor" style="height:140px;padding:0;overflow-y:unset"
              v-model="mock_all.formData.form_content" ref="myQuillEditor" :options="editorOption"></quill-editor>
          </el-row>
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-form-item label="附件">
              <el-upload class="upload-demo" ref="upload" :data="fileType"
                action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
                :on-remove="handleRemove" :file-list="mock_all.formData.form_fileList" :auto-upload="false" :limit='5'>
                <div style="width:100%;">
                  <i class="el-icon-upload"
                    style="float:left;width:32px;height:22px;padding-top:5px;font-size:22px;"></i>
                  <div slot="tip" style="float:left;margin-top:0px;" class="el-upload__tip">5555</div>
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

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
import { quillEditor } from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'


//工具栏配置
const toolbarOptions = [
  ['clean', { 'header': [1, 2, 3, 4, 5, 6, false] }, 'bold', 'italic', 'underline', 'code-block', { 'list': 'ordered' }, { 'list': 'bullet' }, 'image', { 'color': [] }, { 'background': [] }]
];
export default {
  components: {
    quillEditor
  },
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
      idSearch: '',
      nameSearch: '',
      flagPaging: false,//

      fileType: {
        targetEnum: "Enclosure"
      },
      editorOption: {
        placeholder: "请输入反馈问题的内容",
        modules: {
          toolbar: {
            container: toolbarOptions,  // 工具栏
          }
        }
      },

      rules: {
        repair_id: [
          { required: true, message: '请输入编号', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {

    ...mapState({
      // 获得菜单列表数据
      mock_all: state => state.repair.tableData,//{formData,list,columns}
      changeIndex: state => state.repair.changeIndex,
      formadd: state => state.repair.formadd,
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
    //上传文件
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
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
      var filterData = this.mock_all.list.filter(item => !this.idSearch || item.repair_id.toLowerCase().includes(this.idSearch.toLowerCase()))
      filterData = filterData.filter(item => !this.descSearch || item.repair_desc.toLowerCase().includes(this.descSearch.toLowerCase()))

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
          this.$store.commit('repair/rowRemoveStore', this.multipleSelection)
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
      this.$store.commit('repair/setChangeIndex', (index + (this.pageCurrent - 1) * this.pageSize))
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
          this.$store.commit('repair/setformadd', { ...this.mock_all.formData })
          this.$store.commit('repair/setNowTime')
          if (this.addorChange) {
            this.$store.commit('repair/rowAddStore')
            this.$message({
              type: 'success',
              showClose: true, duration: 2000, message: '新增成功!'
            })
          } else {
            this.$store.commit('repair/pwdChange')
            this.$message({
              type: 'success',
              showClose: true, duration: 2000, message: '修改成功!'
            })
          }
          this.$refs.upload.submit();
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
</style>