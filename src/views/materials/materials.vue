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
        prop="material_id"
        label="材料ID"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="material_type"
        label="材料类型"
        show-overflow-tooltip
      >

      </el-table-column>
      <el-table-column
        prop="material_name"
        label="材料名称"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="format_id"
        label="计划ID"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="material_unit"
        label="材料单位(克)"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="supplier_id"
        label="供应商ID"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="material_erpid"
        label="ERP-ID"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="material_indate"
        sortable
        label="进货日期"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="material_storeid"
        label="仓库ID"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="material_operaterid"
        label="材料操作员ID"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="material_operaterdate"
        label="材料操作日期"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="parent_id"
        label="父辈ID"
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
      <!-- //移除 -->
      <el-table-column
      fixed="right"
      label="操作"
      show-overflow-tooltip>
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="100"
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
      multipleSelection: []
    }
  },

  methods: {
    // 选择
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
    },
    //移除
    deleteRow(index, rows) {
        rows.splice(index, 1);
      }
  }
}
</script>
<style scoped>
.el-pagination{
  background-color: white;
}
</style>
