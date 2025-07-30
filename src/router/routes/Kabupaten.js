// ** React Imports
import { lazy } from "react";

const List = lazy(() =>
  import("@views/MasterData/Wilayah/kabupaten/features/list")
);

const kabupatenRoutes = [
  {
    element: <List />,
    path: "/wilayah/kabkota",
    access: ["superadmin_wilayah_crud"],
  },
];

export default kabupatenRoutes;
