const route = {
  path: "/setting",
  component: () => import("../views/setting/root"),
  redirect:"/setting/setting",
  children: [
    {
      path: "setting",
      component: () => import("../views/setting/setting")
    },
    {
      path: "role",
      component: () => import("../views/setting/role")
    }
  ]
};

export default route;