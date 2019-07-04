import Mock from "mockjs";
let data = {
  list: [],
  total: 10 //list数据数量
};

for (let i = 0; i < data.total; i++) {
  data.list.push(
    Mock.mock({
      clint_id: /[a-z][0-9]{6}$/,
      material_id: /[a-z][0-9]{6}$/,
      material_type: /[A-Z][0-9]{2}$/,
      material_name: Mock.Random.cname(),
      format_id: /[a-z][0-9]{6}$/,
      material_unit: "个",
      supplier_id: /[A-Z][0-9]{6}$/,
      material_erpid: /[A-Z][0-9]{6}$/,
      material_indate: Mock.Random.date(),
      material_storeid: /[a-z][0-9]{3}$/,
      material_operaterid: /[a-z][0-9]{3}$/,
      material_operaterdate: Mock.Random.date(),
      parent_id: /[0-9]{3}$/,
      //规划
      format_name: /[A-Z]{6}$/,
      //供应商
      supplier_name: Mock.Random.cname(),
      supplier_tel: /[1][0-3][0-9]{9}$/,
      supplier_address: Mock.Random.city(true),
      supplier_fax: /[0-9]{6}$/,
      //产品表
      product_id: /[0-9]{6}$/,
      product_name: "酒检仪",
      product_color: Mock.Random.color(),
      product_desc: "水水水水水",

      clint_creator: /[a-z]{6}$/,
      clint_createtime: Mock.Random.date(),
      clint_updator: /[a-z]{6}$/,
      clint_updatetime: Mock.Random.date()
    })
  );
}
export default data;
