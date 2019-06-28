<template>
  <div>
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
        prop="name"
        label="用户"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="产品"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="dada"
        label="购买日期"
        width="120"
      >
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="返修原因"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="address"
        label="返修日期"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="维修用时"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="unit"
        label="单位"
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
        name: '王小虎',
        address: '检测仪',
        date: '2016-05-03',
        reason:'失灵',
        repairdate:'2017-06-04',
        repairtime:'3',
        unit:'天'
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