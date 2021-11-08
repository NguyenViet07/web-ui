import { lazy } from "react";

// ** Default Route
const DefaultRoute = "/";

// ** Merge Routes
const Routes = [
  {
    path: "/",
    title: "Trang chủ",
    component: lazy(() => import("../../views/Home")),
  },
  {
    path: "/test",
    title: "test",
    component: lazy(() => import("../../views/Test")),
  },
  {
    path: "/login",
    component: lazy(() => import("../../views/Login")),
  },
  {
    path: "/create",
    component: lazy(() => import("../../views/CreateUser")),
  },

  {
    path: "/song/:id",
    component: lazy(() => import("../../views/Song")),
  },

  {
    path: "/admin",
    component: lazy(() => import("../../views/admin/Admin")),
  },

  {
    path: "/profile",
    component: lazy(() => import("../../views/profile/Index")),
  },
  {
    path: "/info",
    component: lazy(() => import("../../views/profile/Info")),
  },
  {
    path: "/home-info",
    component: lazy(() => import("../../views/profile/HomeInfo")),
  },
  {
    path: "/page-list-song",
    component: lazy(() => import("../../views/PageListSong")),
  },
  {
    path: "/page-single-song",
    component: lazy(() => import("../../views/PageSingleSong")),
  },
];

export { DefaultRoute, Routes };
