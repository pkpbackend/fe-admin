import { lazy } from "react";

const List = lazy(() => import("@views/komponenPengajuan/features/list"));

const KomponenPengajuanRoutes = [
  {
    element: <List />,
    path: "/komponen-pengajuan/list",
    access: ["management_data_master_ru"],
  },
];

export default KomponenPengajuanRoutes;
