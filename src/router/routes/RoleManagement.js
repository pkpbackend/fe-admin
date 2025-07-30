// ** React Imports
import { lazy } from "react";

const List = lazy(() => import("@views/role-management/features/list"));
const Create = lazy(() => import("@views/role-management/features/create"));
const Detail = lazy(() => import("@views/role-management/features/detail"));
const Edit = lazy(() => import("@views/role-management/features/edit"));

const RoleManagementRoutes = [
  {
    element: <List />,
    path: "/role-management/list",
    access: ["management_role_crud"],
  },
  {
    element: <Create />,
    path: "/role-management/list/add",
    access: ["management_role_crud"],
  },
  {
    element: <Detail />,
    path: "/role-management/list/detail/:id",
    access: ["management_role_crud"],
  },
  {
    element: <Edit />,
    path: "/role-management/list/edit/:id",
    access: ["management_role_crud"],
  },
];

export default RoleManagementRoutes;
