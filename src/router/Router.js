// import React, { Suspense, lazy } from "react";
// import { Route, Switch } from "react-router-dom";
// import LayoutDefault from "../layouts/LayoutDefault";
// import { Routes } from "./routes";
//
// const LayoutRoutesAndPaths = () => {
//   const LayoutRoutes = [];
//   if (Routes) {
//     Routes.filter((route) => {
//       LayoutRoutes.push(route);
//     });
//   }
//   return { LayoutRoutes };
// };
//
// // ** Init Error Component
// // const Error = lazy(() => import('../views/Error/404'))
//
// const FinalRoute = (props) => {
//   const route = props.route;
//   return <route.component {...props} path={"/" + route.path} />;
// };
//
// const Router = () => {
//   return (
//       <Switch>
//         {LayoutRoutes.map((route) => {
//           return (
//               <Route
//                   key={route.path}
//                   path={route.path}
//                   exact={true}
//                   render={(props) => {
//                     return (
//                         <Suspense fallback={null}>
//                           <FinalRoute
//                               route={route}
//                               path={"/" + route.path}
//                               {...props}
//                           />
//                         </Suspense>
//                     );
//                   }}
//               />
//           );
//         })}
//       </Switch>
//   );
// };
//
// export default Router;
