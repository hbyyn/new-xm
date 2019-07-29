const route = {
  path: "/worker",
  component: () => import("../views/worker/root"),
  redirect: "/worker/mwork",
  children: [
    {
      path: "mwork",
      component: () => import("../views/worker/mwork")
    },
    {
      path: "work",
      component: () => import("../views/worker/work")
    },
    {
      path: "materials",
      component: () => import("../views/materials/materials")
    },
    {
      path: "workcharts",
      component: () => import("../views/worker/workcharts")
    },
  ]
};

export default route;
