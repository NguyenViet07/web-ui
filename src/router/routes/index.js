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
  }
];

export { DefaultRoute, Routes };
