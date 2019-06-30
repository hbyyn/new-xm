const route = {
  path: "/order",
  component: () => import("../views/order/root"),
  redirect: "/order/orderproduct",
  children: [
    {
      path: "orderproduct",
      component: () => import("../views/order/orderproduct")
    },
    {
      path: "product",
      component: () => import("../views/materials/product")
    },
    {
      path: "order",
      component: () => import("../views/order/order")
    },
    {
      path: "customers",
      component: () => import("../views/order/customers")
    }
  ]
};

export default route;
