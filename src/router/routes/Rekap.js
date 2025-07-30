// ** React Imports
import { lazy } from "react";

const Rekap = lazy(() => import("@views/rekap/features/list"));

const RekapRoutes = [
  {
    element: <Rekap />,
    path: "/rekap",
    access: ["rekap_rekapitulasi"],
  },
];

export default RekapRoutes;
