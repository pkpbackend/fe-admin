// ** React Imports
import { lazy } from "react";

const List = lazy(() => import("@views/diskusi/features/list"));
const Detail = lazy(() => import("@views/diskusi/features/detail"));

const diskusiRoutes = [
  {
    element: <List />,
    path: "/diskusi/admin/list",
    access: ["diskusi_admin"],
  },
  {
    element: <Detail />,
    path: "/diskusi/admin/list/:id",
    access: ["diskusi_admin"],
  },
  {
    element: <List />,
    path: "/diskusi/publik/list",
    access: ["diskusi_publik"],
  },
  {
    element: <Detail />,
    path: "/diskusi/publik/list/:id",
    access: ["diskusi_publik"],
  },
];

export default diskusiRoutes;
