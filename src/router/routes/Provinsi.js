// ** React Imports
import { lazy } from "react";

const List = lazy(() =>
  import("@views/MasterData/Wilayah/provinsi/features/list")
);

const provinsiRoutes = [
  {
    element: <List />,
    path: "/wilayah/provinsi",
    access: ["superadmin_wilayah_crud"],
  },
];

export default provinsiRoutes;
