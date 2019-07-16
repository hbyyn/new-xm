<template>
  <div class="page">
    <div class="tableTop">
      <div class="search">
        <span>产品编号:</span>
        <el-autocomplete class="searchInputS" v-model="idSearch" :fetch-suggestions="queryStringId" placeholder="请输入内容"
          @keyup.enter.native="onFilter" clearable size="small"></el-autocomplete>
        <span>产品名称:</span>
        <el-autocomplete class="searchInputS" v-model="nameSearch" :fetch-suggestions="queryStringName" placeholder="请输入内容"
          @keyup.enter.native="onFilter" clearable size="small"></el-autocomplete>

        <el-button type="primary" size="small" round @click="onFilter">查找</el-button>

      </div>
      <div class="rowAdd">
        <el-button type="primary" size="small" @click="rowAdd">新增</el-button>
        <el-button type="danger" size="small" @click="rowRemove()">删除选中</el-button>
      </div>
    </div>

    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" @click="rowSelec(mock_all.list)">
      </el-table-column>

      <!--  主体 -->
      <el-table-column v-for="col in mock_all.columns"  :key="col.id" :prop="col.prop" :label="col.label">
      </el-table-column>

      <!-- //操作 -->
      <el-table-column fixed="right" width="140" label="操作" show-overflow-tooltip >
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
    <el-pagination :class="{active_paging:flagPaging}" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]"
      :current="pageCurrent" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="mock_all.list.length">
    </el-pagination>
    <!-- 新增 -->
    <el-dialog :title="fromtitle" :visible.sync="centerDialogVisible" width="40%">
      <el-form label-position="right" label-width="120px">
        <!-- <el-form-item :label="mock_all.columns[0].label">
          <el-input v-model="mock_all.FromData.client_id"></el-input>
        </el-form-item> -->
        <el-form-item :label="mock_all.columns[1].label" >
          <el-input v-model="mock_all.FromData.product_id" :readonly="readonlyFlat"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[2].label">
          <el-input v-model="mock_all.FromData.product_name"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[3].label">
          <el-color-picker v-model="mock_all.FromData.product_color"></el-color-picker>
        </el-form-item>
        <el-form-item :label="mock_all.columns[4].label">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="mock_all.FromData.product_desc"></el-input>
        </el-form-item>

        <!-- <el-form-item :label="mock_all.columns[5].label">
          <el-input v-model="mock_all.FromData.client_creator"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[6].label">
          <el-input v-model="mock_all.FromData.client_createtime"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[7].label">
          <el-input v-model="mock_all.FromData.client_updator"></el-input>
        </el-form-item>
        <el-form-item :label="mock_all.columns[8].label">
          <el-input v-model="mock_all.FromData.client_updatetime"></el-input>
        </el-form-item> -->
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
  data() {
    return {
      centerDialogVisible: false,
      fromtitle: '',
      addorChange: true,//判断修改新增
      readonlyFlat:false,
      tableData: '',
      pageSize: 10,
      pageCurrent: 1,
      nameSearch: '',
      idSearch:'',
      flagPaging:false,
    }
  },
  computed: {
    ...mapState({
      // 获得菜单列表数据
      mock_all: state => state.product.tableData,//{fromData,list,columns}
      changeIndex: state => state.product.changeIndex,
      Fromadd: state => state.product.Fromadd,
    }),
  },
  created() {
    this.tableShow(this.mock_all.list)
  },
  methods: {
     // 搜索弹框数据，去重
    restaurants(key){
      let restaurants = [];
        for (var i = 0; i < this.mock_all.list.length; i++) {
          restaurants.push({ value: '' });
          restaurants[i].value = this.mock_all.list[i][key]//修改点
        }
        // 去重
        let hash = {};
        restaurants = restaurants.reduce((preVal, curVal) => {
          hash[curVal.value] ? '' : hash[curVal.value] = true && preVal.push(curVal);
          return preVal
        }, [])
        return restaurants
    },
    //搜索1
    queryStringId(queryString, cb) {
      let restaurants = this.restaurants('product_id')
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    //搜索2
    queryStringName(queryString, cb) {
      let restaurants = this.restaurants('product_name')
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },

     //列表显示
    tableShow(data) {
      let _data=data.slice((this.pageCurrent - 1) * this.pageSize, this.pageCurrent * this.pageSize)
      this.tableData = _data
      // 分页条
      this.$nextTick(() => {
        if(document.documentElement.scrollHeight > document.documentElement.offsetHeight){
          this.flagPaging =true;
        }
        else{
          this.flagPaging =false;
        }
      })
    },
    //filter
    onFilter() {
      var filterData = this.mock_all.list.filter(item => !this.nameSearch || item.product_name.toLowerCase().includes(this.nameSearch.toLowerCase()))
      filterData = filterData.filter(item => !this.idSearch || item.product_id.toLowerCase().includes(this.idSearch.toLowerCase()))

      this.tableShow(filterData)
    },
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
      this.tableShow(this.mock_all.list)
    },
    //新增
    rowAdd() {
      this.centerDialogVisible = true;
      this.addorChange = true;
      this.readonlyFlat = false;
      this.fromtitle = '新增';
      let obj = this.mock_all.FromData
      for (let k of Object.keys(obj)) {
        obj[k] = ''
      }
    },
    //修改
    pwdChange(index, row) {
      this.fromtitle = '修改';
      this.$store.commit('product/setChangeIndex', (index + (this.pageCurrent - 1) * this.pageSize))
      this.addorChange = false;
      this.centerDialogVisible = true;
      this.readonlyFlat=true;
      this.mock_all.FromData = { ...row };
    },
    //弹窗确认
    fromOr() {
      //拷贝from的值
      this.$store.commit('product/setFromadd', { ...this.mock_all.FromData })
      this.$store.commit('product/setNowTime')
      if (this.addorChange) {
        this.$store.commit('product/rowAddStore')
      } else {
        this.$store.commit('product/pwdChange')
      }
      this.centerDialogVisible = false
      this.tableShow(this.mock_all.list)
    },

    //移除
    rowDel(index) {
      // console.log(index, this.mock_all.list);
      this.mock_all.list.splice(index, 1);
      this.tableShow(this.mock_all.list)
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.tableShow(this.mock_all.list)
      this.onFilter()

    },
    handleCurrentChange(val) {
      this.pageCurrent = val
      this.tableShow(this.mock_all.list)
      this.onFilter()

    }
  },

}
</script>

<style lang="scss" scoped>
.rowAdd {
  float: right;
  margin-right: 50px;
}
.page .tableTop .search .searchInputS{
  margin: 0 12px;
  width: 160px;
}


</style>