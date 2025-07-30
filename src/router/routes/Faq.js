// ** React Imports
import { lazy } from "react";

const List = lazy(() => import("@views/Faq/features/list"));

const FaqRoutes = [
  {
    element: <List />,
    path: "/faq/list",
    access: ["superadmin_faq_crud"],
  },
];

export default FaqRoutes;
