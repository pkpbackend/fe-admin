// ** React Imports
import { lazy } from "react";

const List = lazy(() => import("@views/survey/features/list"));
const Detail = lazy(() => import("@views/survey/features/detail"));

const surveyRoutes = [
  {
    element: <List />,
    path: "/survey/list",
    access: ["survey_view"],
  },
  {
    element: <Detail />,
    path: "/survey/list/detail/:id",
    access: ["survey_view"],
  },
];

export default surveyRoutes;
