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

      <el-table-column
        prop="clint_id"
        label="客户机ID"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="customers_id"
        label="客户ID"
        show-overflow-tooltip
      >
        <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
      </el-table-column>

      <el-table-column
        prop="customers_name"
        label="客户姓名"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="customers_tel"
        label="客户电话"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="customers_address"
        label="客户地址"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="customers_fax"
        label="客户传真机"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="clint_creator"
        label="客户机创建"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="clint_createtime"
        label="创建时间"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="clint_updator"
        label="客户机更新"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="clint_updatetime"
        label="客户机更新时间"
        show-overflow-tooltip
      >
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        clint_id:'a55555',
        customers_id:'b564546',
        customers_name:'sadsadda',
        customers_tel:'12535664445',
        customers_address:'龙岗xx街道xx号',
        customers_fax:'54646464',
        clint_creator: 'jj-56',
        clint_createtime: '2016/05/03/14:06:55',
        clint_updator: 'jj-57',
        clint_updatetime: '2016/05/03/14:16:55'
      }],
      multipleSelection: []
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>