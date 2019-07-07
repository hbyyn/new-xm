<template>
  <div class="page">
    <div class="rowAdd">
      <el-button type="primary" @click="rowAdd">新增</el-button>
      <el-button type="danger" @click="rowRemove()">删除选中</el-button>
    </div>

    <el-table ref="multipleTable" :data="store_all.list" tooltip-effect="dark" border style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" @click="rowSelec(store_all.list)">
      </el-table-column>

      <!--  主体 -->
      <el-table-column v-for="col in store_all.columns" :key="col.id" :prop="col.prop" :label="col.label">
      </el-table-column>

      <!-- //操作 -->
      <el-table-column fixed="right" width="140" label="操作" show-overflow-tooltip class-name="chang_del">
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
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]"
      :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="store_all.total">
    </el-pagination>
    <!-- 新增 -->
    <el-dialog :title="fromtitle" :visible.sync="centerDialogVisible" width="40%">
      <el-form label-position="left" label-width="80px">
        <el-form-item :label="store_all.columns[0].label">
          <el-input v-model="store_all.FromData.clint_id"></el-input>
        </el-form-item>
        <el-form-item :label="store_all.columns[1].label">
          <el-select v-model="store_all.FromData.material_id" placeholder="请选择">
            <el-option class="dialog_select" v-for="item in materials_store" :key="item.id" :value="item.material_id">
              <span>{{'ID:'+item.material_id}}</span>
              <span>{{'材料名:'+item.material_name}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="store_all.columns[2].label">
          <!-- <el-input v-model="store_all.FromData.work_id"></el-input> -->
          <el-select v-model="store_all.FromData.work_id" placeholder="请选择">
            <el-option class="dialog_select" v-for="item in work_store" :key="item.id" :value="item.work_id">
              <span>{{'ID:'+item.work_id}}</span>
              <span>{{'材料名:'+item.work_name}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="store_all.columns[3].label">
          <el-input v-model="store_all.FromData.material_work_begindate"></el-input>
        </el-form-item>
        <el-form-item :label="store_all.columns[4].label">
          <el-input v-model="store_all.FromData.material_work_enddate"></el-input>
        </el-form-item>

        <el-form-item :label="store_all.columns[5].label">
          <el-input v-model="store_all.FromData.clint_creator"></el-input>
        </el-form-item>
        <el-form-item :label="store_all.columns[6].label">
          <el-input v-model="store_all.FromData.clint_createtime"></el-input>
        </el-form-item>
        <el-form-item :label="store_all.columns[7].label">
          <el-input v-model="store_all.FromData.clint_updator"></el-input>
        </el-form-item>
        <el-form-item :label="store_all.columns[8].label">
          <el-input v-model="store_all.FromData.clint_updatetime"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="fromOr">确 定</el-button>
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
      centerDialogVisible: false,
      fromtitle: '',
      addorChange: true,//判断修改新增
      // changeIndex: '',转store
      // Fromadd: '',//from数据中中转转store
    }
  },
  computed: {
    ...mapState({
      // 获得菜单列表数据
      store_all: state => state.mwork.tableData,//{fromData,list,columns}
      changeIndex: state => state.mwork.changeIndex,
      Fromadd: state => state.mwork.Fromadd,
      materials_store: state => state.materials.tableData.list,
      work_store:state => state.work.tableData.list,
    }),

  },
  methods: {
    // 选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //批量删除
    rowRemove() {
      const a = this.store_all.list;
      const b = this.multipleSelection;
      this.store_all.list = a.filter(function (item) {
        return b.indexOf(item) < 0;
      })
    },
    //新增
    rowAdd() {
      this.centerDialogVisible = true;
      this.addorChange = true;
      this.fromtitle = '新增';
    },
    //修改
    pwdChange(index, row) {
      this.fromtitle = '修改';
      this.$store.commit('mwork/setChangeIndex', index)
      this.addorChange = false;
      this.centerDialogVisible = true;
      this.store_all.FromData = { ...row };
    },
    //弹窗确认
    fromOr() {
      //拷贝from的值
      this.$store.commit('mwork/setFromadd', '')
      this.$store.commit('mwork/setFromadd', { ...this.store_all.FromData })
      if (this.addorChange) {
        // this.store_all.list.unshift(this.Fromadd)
        this.$store.commit('mwork/rowAddStore')
      } else {
        // this.store_all.list.splice(this.changeIndex, 1, this.Fromadd)
        this.$store.commit('mwork/pwdChange')
      }
      this.centerDialogVisible = false
    },

    //移除
    rowDel(index) {
      // console.log(index, this.store_all.list);
      this.store_all.list.splice(index, 1);
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },


}
</script>

<style lang="scss" scoped>
.rowAdd {
  float: right;
  margin-right: 50px;
}
.chang_del {
  flex: 1;
}
</style>