<template>
  <div class="page">

    <el-table ref="multipleTable" :data="mock_all.list" tooltip-effect="dark" style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <!--  主体 -->
      <el-table-column v-for="col in cols" :key="col.id" :prop="col.prop" :label="col.label">
      </el-table-column>

      <!-- //操作 -->
      <el-table-column fixed="right" width="140" label="操作" show-overflow-tooltip class-name="chang_del">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="pwdChange(scope.$index,scope.row)">
            修改
          </el-button>
          <el-button size="mini" v-if="!scope.row.isSet" type="danger" @click="rowDel(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]"
      :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="mock_all.list.length">
    </el-pagination>
    <!-- 新增 -->
    <el-dialog title="新增" :visible.sync="centerDialogVisible" width="40%">
      <el-form label-position="left" label-width="80px" :model="mock_api.FromData">
        <el-form-item class="fromitem" :label="item.label" v-for="(item,index) in mock_api.columns" :key="item.id ">
          <el-input v-model="mock_api.FromData[
Object.keys(mock_api.FromData)[index]]"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="fromCancel">取 消</el-button>
        <el-button type="primary" @click="fromOr">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {

      mock_all: '',
      centerDialogVisible: false,
      addorChange: true,//判断修改新增
      changeIndex: '',
      Fromadd: '',//from数据中中转
      cols: [
        { id: 1, prop: 'clint_id', label: "公司编号" },
        { id: 2, prop: 'supplier_id', label: "供应商编号" },
        { id: 3, prop: 'supplier_name', label: "供应商名称" },
        { id: 4, prop: 'supplier_tel', label: "供应商电话" },
        { id: 5, prop: 'supplier_address', label: "供应商地址" },
        { id: 6, prop: 'supplier_fax', label: "供应商传真" },
        { id: 14, prop: 'clint_creator', label: "创建人" },
        { id: 15, prop: 'clint_createtime', label: "创建时间" },
        { id: 16, prop: 'clint_updator', label: "修改人" },
        { id: 17, prop: 'clint_updatetime', label: "修改时间" }
      ],
    }
  },
  created() {
    axios.get('/api/alllist').then((res) => {
      this.mock_all = res.data
    }).catch((err) => {
      console.log(err)
    });
  },
  methods: {
    // 选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //移除
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>