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
    path: "/admin",
    component: lazy(() => import("../../views/admin")),
  },
  {
    path: "/admin/users",
    component: lazy(() => import("../../views/admin/users")),
  },
  {
    path: "/admin/playlists",
    component: lazy(() => import("../../views/admin/playList")),
  },
  {
    path: "/login",
    title: "login",
    component: lazy(() => import("../../views/Login")),
  },
  {
    path: "/create",
    title: "create",
    component: lazy(() => import("../../views/CreateUser")),
  },
];

export { DefaultRoute, Routes };
