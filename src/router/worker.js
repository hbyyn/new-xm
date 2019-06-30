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
      path: "worker",
      component: () => import("../views/worker/worker")
    },
    {
      path: "materials",
      component: () => import("../views/materials/materials")
    }
  ]
};

export default route;
