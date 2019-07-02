<template>
  <div class="page">
    <div class="rowAdd">
      <el-button
        type="primary"
        @click="centerDialogVisible = true"
      >新增</el-button>
      <el-button
        type="danger"
        @click="rowRemove()"
      >删除选中</el-button>
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        @click="rowSelec(tableData)"
      >
      </el-table-column>

      <!--  主体 -->
      <el-table-column
        v-for="col in cols"
        :key="col.id"
        :prop="col.prop"
        :label="col.label"
      >
      </el-table-column>

      <!-- //移除 -->
      <el-table-column
        fixed="right"
        label="操作"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="rowEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="rowDel(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    >
    </el-pagination>
    <!-- 新增 -->
    <el-dialog
      title="新增"
      :visible.sync="centerDialogVisible"
      width="40%"
    >
      <el-form
        label-position="left"
        label-width="80px"
        :model="formCreate"
      >
        <el-form-item
          class="fromitem"
          :label="item.label"
          v-for="(item,index) in cols"
          :key="item.id "
        >
          <el-input v-model="formCreate[
Object.keys(formCreate)[index]]"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="rowAdd"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑 -->
    <!-- <el-dialog
      title="编辑"
      :visible.sync="editDialogVisible"
      width="40%"
    >
      <el-form
        label-position="left"
        label-width="80px"
        :model="newData"
      >
        <el-form-item
          class="fromitem"
          :label="item.label"
          v-for="(item,index) in cols"
          :key="item.id "
        >
          <el-input v-model="newData[
Object.keys(newData)[index]]"></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="SubEdit"
        >确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10
      },
      tableData: [],
      cols: [],//表头
      centerDialogVisible: false,
      editDialogVisible: false,

      formCreate: {
        clint_id: '',
        customers_id: '',
        customers_name: '',
        customers_tel: '',
        customers_address: '',
        customers_fax: '',
        clint_creator: '',
        clint_createtime: '',
        clint_updator: '',
        clint_updatetime: ''
      }//新增
    }
  },
  computed: {

  },
  methods: {
    // 选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //批量删除
    rowRemove() {
      const a = this.tableData;
      const b = this.multipleSelection;
      this.tableData = a.filter(function (item) {
        return b.indexOf(item) < 0;
      })
    },
    //新增
    rowAdd() {
      console.log(this.formCreate)
      this.tableData.push(this.formCreate)
      this.centerDialogVisible = false

    },
    //编辑
    rowEdit(index, row) {
      console.log(index, row)
      this.editDialogVisible = true;
      // this.editForm = Object.assign({}, row);


    },
    SubEdit() {

        //更新的时候就把弹出来的表单中的数据写到要修改的表格中
        // var postData = {
        //   name: this.editForm.name
        // }

        this.editDialogVisible = false;

    },
    //移除
    rowDel(index) {
      // console.log(index, this.tableData);
      this.tableData.splice(index, 1);
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  created() {
    // 表头
    axios.get('/customers/cols').then((res) => {
      this.cols = res.data
    }).catch((err) => {
      console.log(err)
    });
    // 表格
    axios.get('/customers/tabledate').then((res) => {
      this.tableData = res.data

    }).catch((err) => {
      console.log(err)
    });
  }
}
</script>


<style lang="scss" scoped>
.rowAdd {
  float: right;
  margin-right: 50px;
}
</style>