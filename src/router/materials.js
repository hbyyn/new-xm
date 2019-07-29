const route = {
  path: '/materials',
  component: ()=>import('../views/materials/root'),
  redirect:'materials/materials',
  children: [
    {
      path: 'materials',
      component: ()=>import('../views/materials/materials')
    },
    {
      path: 'format',
      component: ()=>import('../views/materials/format')
    },
    {

      path: 'supplier',
      component: ()=>import('../views/materials/supplier')
    },
    {

      path: 'product',
      component: ()=>import('../views/materials/product')
    },
    {
      path: 'productcharts',
      component: ()=>import('../views/materials/productcharts')

    }
  ]


}

export default route;