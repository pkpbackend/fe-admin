// ** React Imports
import { lazy } from "react";

const List = lazy(() => import("@views/dokumen/features/list"));
const Detail = lazy(() => import("@views/dokumen/features/detail"));

const dokumenRoutes = [
  {
    element: <List />,
    path: "/dokumen/list",
    access: ["superadmin_dokumen_crud"],
  },
  {
    element: <Detail />,
    path: "/dokumen/list/detail/:id",
    access: ["superadmin_dokumen_crud"],
  },
];

export default dokumenRoutes;
