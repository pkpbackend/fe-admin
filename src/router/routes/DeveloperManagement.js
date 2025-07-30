// ** React Imports
import { lazy } from "react";

const List = lazy(() => import("@views/developer-management/features/list"));

const DeveloperManagementRoutes = [
  {
    element: <List />,
    path: "/developer-management/list",
    access: ["management_pengembang_crud"],
  },
];

export default DeveloperManagementRoutes;
