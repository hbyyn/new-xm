const route = {
  path: "/home",
  component: () => import("../views/home/root"),
  redirect:'home/home',
  children: [
    {
      path: "home",
      component: () => import("../views/home/home")
    }
  ]
};


export default route;
