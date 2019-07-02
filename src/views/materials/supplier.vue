<template>
  <div class="page">

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
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {

      tableData: [{
        clint_id: 'a555',
        supplier_id: 'b546',
        supplier_name: '李四',
        supplier_tel: '12345678912',
        supplier_address: '火星',
        supplier_fax: '4345646',
        clint_creator: 'jj-56',
        clint_createtime: '2016/05/03/14:06:55',
        clint_updator: 'jj-57',
        clint_updatetime: '2016/05/03/14:16:55'
      },
      {
        clint_id: 'a555',
        supplier_id: 'b546',
        supplier_name: '李四',
        supplier_tel: '12345678912',
        supplier_address: '火星',
        supplier_fax: '4345646',
        clint_creator: 'jj-56',
        clint_createtime: '2016/05/03/14:06:55',
        clint_updator: 'jj-57',
        clint_updatetime: '2016/05/03/14:16:55'
      },
      ],
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