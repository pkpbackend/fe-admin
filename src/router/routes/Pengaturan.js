// ** React Importsranran
import { lazy } from "react";

const List = lazy(() => import("@views/pengaturan/features/list"));

const PengaturanRoutes = [
  {
    element: <List />,
    path: "/pengaturan/list",
    access: ["superadmin_pengaturan_crud"],
  },
];

export default PengaturanRoutes;
