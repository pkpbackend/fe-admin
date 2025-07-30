// ** React Imports
import { lazy } from "react";

const List = lazy(() => import("@views/panduan/features/list"));

const panduanRoutes = [
  {
    element: <List />,
    path: "/panduan/list",
    access: ["superadmin_panduan_crud"],
  },
];

export default panduanRoutes;
