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
    path: "/album-info/:id",
    component: lazy(() => import("../../views/AlbumInfo")),
  },
  {
    path: "/style-song/:id",
    component: lazy(() => import("../../views/StyleSongInfo")),
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
    path: "/page-list-song/:id",
    component: lazy(() => import("../../views/PageListSong")),
  },
  {
    path: "/page-playlist-song/:id",
    component: lazy(() => import("../../views/PagePlaylistSong")),
  },
  {
    path: "/page-single-song/:id",
    component: lazy(() => import("../../views/PageSingleSong")),
  },
];

export { DefaultRoute, Routes };
