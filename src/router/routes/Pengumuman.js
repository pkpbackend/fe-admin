// ** React Importsranran
import { lazy } from "react";

const List = lazy(() => import("@views/pengumuman/features/list"));

const PengumumanRoutes = [
  {
    element: <List />,
    path: "/pengumuman/list",
    access: ["admin_pengumuman_crud"],
  },
];

export default PengumumanRoutes;
