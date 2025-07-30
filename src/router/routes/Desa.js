// ** React Imports
import { lazy } from "react";

const List = lazy(() => import("@views/MasterData/Wilayah/desa/features/list"));

const desaRoutes = [
  {
    element: <List />,
    path: "/wilayah/desa",
    access: ["superadmin_wilayah_crud"],
  },
];

export default desaRoutes;
