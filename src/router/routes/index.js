// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";

// ** Routes Imports

import NotifikasiRoutes from "./Notifikasi";
import PanduanRoutes from "./Panduan";
import PengaturanRoutes from "./Pengaturan";
import FaqRoutes from "./Faq";
import PengumumanRoutes from "./Pengumuman";
import ProvinsiRoutes from "./Provinsi";
import KabupatenRoutes from "./Kabupaten";
import KecamatanRoutes from "./Kecamatan";
import DesaRoutes from "./Desa";
import KomponenPengajuanRoutes from "./KomponenPengajuan";
import DiskusiRoutes from "./Diskusi";
import SurveyRoutes from "./Survey";
import DokumenRoutes from "./Dokumen";

import UserManagementRoutes from "./UserManagement";
import DeveloperManagementRoutes from "./DeveloperManagement";
import RoleManagementRoutes from "./RoleManagement";
import RekapRoutes from "./Rekap";
import RekapitulasiRoutes from "./Rekapitulasi";
import SettingRoutes from "./Setting";

// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Utils
import { isObjEmpty } from "@utils/Utils";
import PrivateRoute from "@components/routes/PrivateRoute";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Sistem Informasi Bantuan Perumahan";

// ** Default Route
const DefaultRoute = "/informasi";

// const Home = lazy(() => import("../../views/Home"))
const Information = lazy(() => import("../../views/informasi"));
const Error = lazy(() => import("../../views/Error"));
const NotAuthorized = lazy(() => import("../../views/NotAuthorized"));

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/informasi",
    element: <Information />,
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/not-authorized",
    element: <NotAuthorized />,
    meta: {
      layout: "blank",
    },
  },
  ...DiskusiRoutes,
  ...SurveyRoutes,
  // rekap
  ...RekapRoutes,
  ...RekapitulasiRoutes,
  // management
  ...UserManagementRoutes,
  ...RoleManagementRoutes,
  ...DeveloperManagementRoutes,
  ...KomponenPengajuanRoutes,
  ...SettingRoutes,
  // admin only
  ...PengumumanRoutes,
  // super admin only
  ...ProvinsiRoutes,
  ...KabupatenRoutes,
  ...KecamatanRoutes,
  ...DesaRoutes,
  ...DokumenRoutes,
  ...PanduanRoutes,
  ...PengaturanRoutes,
  ...FaqRoutes,
  // notification
  ...NotifikasiRoutes,
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PrivateRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
