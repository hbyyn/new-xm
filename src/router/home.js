const route = {
  path: "/home",
  component: () => import("../views/home/root"),
  redirect:"/home/root",
  children: [
    {
      path: "root",
      component: () => import("../views/home/root")
    }
  ]
};

export default route;
