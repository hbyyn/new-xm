<template>
  <div class="page">
    <div class="rowAdd">
      <el-button type="primary" @click="rowAdd">新增</el-button>
      <el-button type="danger" @click="rowRemove()">删除选中</el-button>
    </div>

    <el-table ref="multipleTable" border :data="mock_api.list" tooltip-effect="dark" style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" @click="rowSelec(mock_api.list)">
      </el-table-column>

      <!--  主体 -->
      <el-table-column v-for="col in mock_api.columns" :key="col.id" :prop="col.prop" :label="col.label">
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
      :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="mock_api.total">
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
        <el-button  @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="fromOr">确 定</el-button>
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

      mock_api: {},//{columns,list,froData，}
      centerDialogVisible: false,
      addorChange:true,//判断修改新增
      changeIndex:'',
      Fromadd: '',//from数据中中转
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
      const a = this.mock_api.list;
      const b = this.multipleSelection;
      this.mock_api.list = a.filter(function (item) {
        return b.indexOf(item) < 0;
      })
    },
     //新增
     rowAdd(){
       this.centerDialogVisible = true;
       this.addorChange = true;
     },
     //修改
    pwdChange(index,row) {
      this.changeIndex = index;
      this.addorChange = false;
      this.centerDialogVisible = true;
      this.mock_api.FromData={...row};
    },
    //弹窗确认
    fromOr() {
      //拷贝from的值
      this.Fromadd = '';
      this.Fromadd = { ...this.mock_api.FromData };
      if(this.addorChange){
        this.mock_api.list.unshift(this.Fromadd)
      }else{
        this.mock_api.list.splice(this.changeIndex,1,this.Fromadd)
      }
      this.centerDialogVisible = false
    },


    //移除
    rowDel(index) {
      // console.log(index, this.mock_api.list);
      this.mock_api.list.splice(index, 1);
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
    axios.get('/api/customers').then((res) => {
      this.mock_api = res.data
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