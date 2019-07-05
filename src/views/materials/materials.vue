<template>
  <div class="page">
    <div class="rowAdd">
      <el-button type="primary" @click="rowAdd">新增</el-button>
      <el-button type="danger" @click="rowRemove()">删除选中</el-button>
    </div>

    <el-table ref="multipleTable" :data="mock_all.list" tooltip-effect="dark" border style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" @click="rowSelec(mock_all.list)">
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
          <el-button size="mini" type="danger" @click="rowDel(scope.$index, scope.row)">
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
    <el-dialog :title="fromtitle" :visible.sync="centerDialogVisible" width="40%">
      <el-form label-position="left" label-width="80px">
        <el-form-item :label="mock_api.columns[0].label">
          <el-input v-model="mock_all.FromData.clint_id"></el-input>
        </el-form-item>
        <el-form-item :label="mock_api.columns[1].label">
          <el-input v-model="mock_all.FromData.material_id"></el-input>
        </el-form-item>
        <el-form-item :label="mock_api.columns[2].label">
          <el-input v-model="mock_all.FromData.material_type"></el-input>
        </el-form-item>
        <el-form-item :label="mock_api.columns[3].label">
          <el-input v-model="mock_all.FromData.material_name"></el-input>
        </el-form-item>
        <el-form-item :label="mock_api.columns[4].label">
          <!-- <el-input v-model="mock_all.FromData.format_id"></el-input> -->
          <el-select v-model="mock_all.FromData.format_id" placeholder="请选择">
            <el-option class="dialog_select" v-for="item in format_store" :key="item.id" :value="item.format_id">
              <span>{{'ID:'+item.format_id}}</span>
              <span>{{'计划名:'+item.format_name}}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="mock_api.columns[5].label">
          <el-input v-model="mock_all.FromData.material_unit"></el-input>
        </el-form-item>
        <el-form-item :label="mock_api.columns[6].label">
          <!-- <el-input v-model="mock_all.FromData.supplier_id"></el-input> -->
          <el-select v-model="mock_all.FromData.supplier_id" placeholder="请选择">
            <el-option class="dialog_select" v-for="item in supplier_store" :key="item.id" :value="item.supplier_id">
              <span>{{'ID:'+item.supplier_id}}</span>
              <span>{{'计划名:'+item.supplier_name}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="mock_api.columns[7].label">
          <el-input v-model="mock_all.FromData.material_erpid"></el-input>
        </el-form-item>
        <el-form-item :label="mock_api.columns[8].label">
          <el-input v-model="mock_all.FromData.material_indate"></el-input>
        </el-form-item>
        <el-form-item :label="mock_api.columns[9].label">
          <el-input v-model="mock_all.FromData.material_storeid"></el-input>
        </el-form-item>
        <el-form-item :label="mock_api.columns[10].label">
          <el-input v-model="mock_all.FromData.material_operaterid"></el-input>
        </el-form-item>
        <el-form-item :label="mock_api.columns[11].label">
          <el-input v-model="mock_all.FromData.material_operaterdate"></el-input>
        </el-form-item>
        <el-form-item :label="mock_api.columns[12].label">
          <el-input v-model="mock_all.FromData.parent_id"></el-input>
        </el-form-item>

        <el-form-item :label="mock_api.columns[13].label">
          <el-input v-model="mock_all.FromData.clint_creator"></el-input>
        </el-form-item>
        <el-form-item :label="mock_api.columns[14].label">
          <el-input v-model="mock_all.FromData.clint_createtime"></el-input>
        </el-form-item>
        <el-form-item :label="mock_api.columns[15].label">
          <el-input v-model="mock_all.FromData.clint_updator"></el-input>
        </el-form-item>
        <el-form-item :label="mock_api.columns[16].label">
          <el-input v-model="mock_all.FromData.clint_updatetime"></el-input>
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
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data() {
    return {
      // mock_all: "",//{fromData,list}转store
      mock_api: '',//{columns}
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
      mock_all: state => state.materials.all,
      changeIndex: state => state.materials.mock_all,
      Fromadd: state => state.materials.mock_all,
      format_store: state => state.format.all.list,
      supplier_store:state => state.supplier.all.list,
    }),
  },
  methods: {
    // 选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //批量删除
    rowRemove() {
      const a = this.mock_all.list;
      const b = this.multipleSelection;
      this.mock_all.list = a.filter(function (item) {
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
      this.$store.commit('materials/setChangeIndex', index)
      this.addorChange = false;
      this.centerDialogVisible = true;
      this.mock_all.FromData = { ...row };
    },
    //弹窗确认
    fromOr() {
      //拷贝from的值
      this.$store.commit('materials/setFromadd', '')
      this.$store.commit('materials/setFromadd', { ...this.mock_all.FromData })
      if (this.addorChange) {
        // this.mock_all.list.unshift(this.Fromadd)
        this.$store.commit('materials/rowAddStore')
      } else {
        // this.mock_all.list.splice(this.changeIndex, 1, this.Fromadd)
        this.$store.commit('materials/pwdChange')
      }
      this.centerDialogVisible = false
    },

    //移除
    rowDel(index) {
      // console.log(index, this.mock_all.list);
      this.mock_all.list.splice(index, 1);
    },
    //from format_id
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    fromHandleSelect(item) {
      console.log(item);
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`每页 ${val} 条`);
    },
  },
  created() {
    console.log(this.mock_all)
    // 数据
    // axios.get('/api/alllist').then((res) => {
    //   this.mock_all = res.data
    //   console.log(res.data.list)
    // }).catch((err) => {
    //   console.log(err)
    // });
    // 数据
    axios.get('/api/materials').then((res) => {
      this.mock_api = res.data
    }).catch((err) => {
      console.log(err)
    });
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
.dialog_select{
  display: flex;
  justify-content: space-between;
}

</style>