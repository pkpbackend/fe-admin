// ** React Imports
import { lazy } from "react";

const SettingMainFeature = lazy(() => import("@views/setting/features/main"));

const settingRoutes = [
  {
    element: <SettingMainFeature />,
    path: "/setting",
    access: ["management_setting_ru"],
  },
];

export default settingRoutes;
