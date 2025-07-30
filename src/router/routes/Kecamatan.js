// ** React Imports
import { lazy } from "react";

const List = lazy(() =>
  import("@views/MasterData/Wilayah/kecamatan/features/list")
);

const kecamatanRoutes = [
  {
    element: <List />,
    path: "/wilayah/kecamatan",
    access: ["superadmin_wilayah_crud"],
  },
];

export default kecamatanRoutes;
