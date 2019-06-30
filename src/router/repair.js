const route = {
  path: "/repair",
  component: () => import("../views/repair/root"),
  redirect: "/repair/mrepair",
  children: [
    {
      path: "mrepair",
      component: () => import("../views/repair/mrepair")
    },
    {
      path: "repair",
      component: () => import("../views/repair/repair")
    },
    {
      path: "materials",
      component: () => import("../views/materials/materials")
    }
  ]
};

export default route;
