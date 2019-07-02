<template>
  <div class="page">
    <el-button
      class="addrow"
      type="success"
      @click="addRow(tableData)"
    >新增</el-button>
    <el-button
      type="success"
      @click="removeUsers(tableData)"
    >删除选中</el-button>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%"
      @cell-dblclick="tableDbEdit"
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

      <!-- //操作 -->
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
          <el-button
            @click="handleClick(scope.row)"
            type="text"
            size="small"
          >查看</el-button>
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

    <!-- 新增弹窗 -->


  </div>
</template>

<script>
export default {

  data() {
    return {

      tableData: [{
        clint_id: 'a545',
        material_id: 'b546',
        material_type: '金',
        material_name: '电池',
        format_id: 'c222',
        material_unit: '5',
        supplier_id: 'd45545',
        material_erpid: 'e12315',
        material_indate: '2019-05-04',//进货日期
        material_storeid: 's26645',
        material_operaterid: 'o165613',//操作员
        material_operaterdate: '2019-05-07',
        parent_id: 'p664654',
        clint_creator: 'jj-56',
        clint_createtime: '2016/05/03/14:06:55',
        clint_updator: 'jj-57',
        clint_updatetime: '2016/05/03/14:16:55'
      },
      {

        clint_id: 'a555',
        material_id: 'b546',
        material_type: '金2',
        material_name: '电池',
        format_id: 'c222',
        material_unit: '5',
        supplier_id: 'd45545',
        material_erpid: 'e12315',
        material_indate: '2019-05-05',//进货日期
        material_storeid: 's26645',
        material_operaterid: 'o165613',//操作员
        material_operaterdate: '2019-05-07',
        parent_id: 'p664654',
        clint_creator: 'jj-56',
        clint_createtime: '2016/05/03/14:06:55',
        clint_updator: 'jj-57',
        clint_updatetime: '2016/05/03/14:16:55'
      }
      ],
      cols: [
        { id: 1, prop: 'clint_id', label: "公司编号" },
        { id: 2, prop: 'material_id', label: "物料编号" },
        { id: 3, prop: 'material_type', label: "物料类型" },
        { id: 4, prop: 'material_name', label: "物料名称" },
        { id: 13, prop: 'clint_creator', label: "规格编号" },
        { id: 5, prop: 'material_unit', label: "物料单位" },
        { id: 6, prop: 'supplier_id', label: "供应商编号" },
        { id: 7, prop: 'material_erpid', label: "ERP-编号" },
        { id: 8, prop: 'material_indate', label: "EPR入库日期" },
        { id: 9, prop: 'material_storeid', label: "EPR入库编号" },
        { id: 10, prop: 'material_operaterid', label: "材料操作员编号" },
        { id: 11, prop: 'material_operaterdate', label: "材料操作日期" },
        { id: 12, prop: 'format_id', label: "父级编号" },
        { id: 14, prop: 'clint_creator', label: "创建人" },
        { id: 15, prop: 'clint_createtime', label: "创建时间" },
        { id: 16, prop: 'clint_updator', label: "修改人" },
        { id: 17, prop: 'clint_updatetime', label: "修改时间" }
      ],
      multipleSelection: []
    }
  },

  methods: {
    //新增
    addRow(tableData) {
      tableData.push(this.tableData[0])
    },
    //删除多个用户

    //移除
    deleteRow(index, rows) {
      console.log(index);
      rows.splice(index, 1);
    },
    //改
    tableDbEdit(row, column, cell, event) {
      event.target.innerHTML = "";
      let cellInput = document.createElement("input");
      cellInput.value = "";
      cellInput.setAttribute("type", "text");
      cellInput.style.width = "60%";
      cell.appendChild(cellInput);
      cellInput.onblur = function () {
        cell.removeChild(cellInput);
        event.target.innerHTML = cellInput.value;
      };
    },
    //查看
    handleClick(row) {
      console.log(row);
    },
    // 选择
    handleSelectionChange(val) {
      this.multipleSelection = val;

    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //创建

  }

}
</script>
<style scoped>
.addrow {
  float: right;
  margin-right: 50px;
}
</style>
