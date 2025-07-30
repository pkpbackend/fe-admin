// ** React Imports
import { lazy } from "react";

const Notification = lazy(() => import("@views/notifikasi"));

const NotifikasiRoutes = [
  {
    element: <Notification />,
    path: "/notifikasi",
  },
];

export default NotifikasiRoutes;
