// ** React Imports
import { lazy } from "react";

const List = lazy(() => import("@views/user-management/features/list"));

const UserManagementRoutes = [
  {
    element: <List />,
    path: "/user-management/list",
    access: ["management_user_crud"],
  },
];

export default UserManagementRoutes;
