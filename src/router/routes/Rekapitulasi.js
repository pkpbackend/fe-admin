// ** React Imports
import { lazy } from "react";

const RekapitulasiMatrixRuk = lazy(() =>
  import("@views/rekapitulasi/rekapitulasi-matrik-ruk/features/list/Index")
);
const RekapitulasiPerProvinsi = lazy(() =>
  import(
    "@views/rekapitulasi/rekapitulasi-usulan-per-provinsi/features/list/Index"
  )
);
const RekapitulasiPerKabupaten = lazy(() =>
  import(
    "@views/rekapitulasi/rekapitulasi-usulan-per-kabupaten/features/list/Index"
  )
);

const RekapitulasiRoutes = [
  {
    element: <RekapitulasiMatrixRuk />,
    path: "/rekapitulasi/matrix-ruk",
    access: ["rekap_rekapitulasi_matrix"],
  },
  {
    element: <RekapitulasiPerProvinsi />,
    path: "/rekapitulasi/usulan-provinsi",
    access: ["rekap_rekapitulasi_matrix"],
  },
  {
    element: <RekapitulasiPerKabupaten />,
    path: "/rekapitulasi/usulan-kabupaten",
    access: ["rekap_rekapitulasi_matrix"],
  },
];

export default RekapitulasiRoutes;
