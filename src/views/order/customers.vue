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
      :data="master_user.list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        @click="rowSelec(master_user.list)"
      >
      </el-table-column>

      <!--  主体 -->
      <el-table-column
        v-for="col in master_user.columns"
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
                <!-- <el-button
            size="mini"   type="primary" @click="pwdChange(scope.row,scope.$index,true)">
                    修改
                </el-button> -->
                <el-button size="mini" v-if="!scope.row.isSet"  type="danger" @click="rowDel(scope.$index, scope.row)">
                    删除
                </el-button>

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
      :total="100"
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
          v-for="(item,index) in master_user.columns"
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
      master_user:{},
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
        clint_updatetime: '',

      },//新增

    }
  },
  computed: {

  },
  methods: {
    //读取表格数据
    readMasterUser() {
        var generateId = {
            _count: 1,
            get(){return ((+new Date()) + "_" + (this._count++))}
        };
        //根据实际情况，自己改下啊
        this.master_user.list.map(i => {
            i.clint_id = generateId.get();//模拟后台插入成功后有了id
            i.isSet=false;//给后台返回数据添加`isSet`标识
            return i;
        });
    },
    // 选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //批量删除
    rowRemove() {
      const a = this.master_user.list;
      const b = this.multipleSelection;
      this.master_user.list = a.filter(function (item) {
        return b.indexOf(item) < 0;
      })
    },
    //新增确认
    rowAdd() {
      console.log(this.formCreate)
      this.master_user.list.push(this.formCreate)

      this.centerDialogVisible = false

    },
    //修改
    pwdChange(row, index, cg) {
      console.log(row, index, cg)
        // //点击修改 判断是否已经保存所有操作
        // for (let i of this.master_user.list) {
        //     if (i.isSet && i.clint_id != row.clint_id) {
        //         this.$message.warning("请先保存当前编辑项");
        //         return false;
        //     }
        // }
        //  //是否是取消操作
        // if (!cg) {
        //     if (!this.master_user.sel) {this.master_user.list.splice(index, 1);
        //      return row.isSet = !row.isSet;}
        // }
        // //提交数据
        // if (row.isSet) {
        //     //项目是模拟请求操作  自己修改下
        //     (function () {
        //         let data = JSON.parse(JSON.stringify(this.master_user.sel));
        //         for (let k in data) row[k] = data[k];
        //         this.$message({
        //             type: 'success',
        //             message: "保存成功!"
        //         });
        //         //然后这边重新读取表格数据
        //         this.readMasterUser();
        //         row.isSet = false;
        //     })();
        // } else {
        //     this.master_user.sel = JSON.parse(JSON.stringify(row));
        //     row.isSet = true;
        // }
    },
    // SubEdit() {

    // },
    //移除
    rowDel(index) {
      // console.log(index, this.master_user.list);
      this.master_user.list.splice(index, 1);
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
    axios.get('/customers/api').then((res) => {
      this.master_user=res.data
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