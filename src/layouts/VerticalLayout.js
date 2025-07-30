// ** React Imports
import { Outlet } from "react-router-dom";

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from "@layouts/VerticalLayout";

// ** Menu Items Array
import navigation from "@src/navigation/vertical";
import { useSelector } from "react-redux";
import intersection from "lodash/intersection";

const makeMenu = (menu, accessMenu) => {
  if (typeof menu.id === "object") {
    if (intersection(accessMenu, menu.id).length > 0) {
      if (menu?.children && menu.children.length > 0) {
        let children = [];
        for (const subMenu of menu.children) {
          const childComponent = makeMenu(subMenu, accessMenu);
          if (childComponent) {
            children.push(childComponent);
          }
        }
        return { ...menu, children };
      }
      return menu;
    }
  } else {
    if (accessMenu?.includes(menu.id) || menu.id === "informasi_view") {
      return menu;
    }
  }
};
const CustomFooter = () => {
  return (
    <p className="clearfix mb-0">
      <span className="float-md-start d-block d-md-inline-block mt-25">
        COPYRIGHT © {new Date().getFullYear()}{" "}
        <a
          href="https://perumahan.pu.go.id"
          target="_blank"
          rel="noopener noreferrer"
        >
          DIREKTORAT JENDERAL PERUMAHAN
        </a>
      </span>
      <span className="float-md-end d-none d-md-block">v3.0.0</span>
    </p>
  );
};

const VerticalLayout = (props) => {
  const accessMenu = useSelector((state) => state.auth.user?.Role?.accessMenu);
  let menus = [];
  if (accessMenu?.length > 0) {
    for (const menu of navigation) {
      const menuComponent = makeMenu(menu, accessMenu);
      if (menuComponent) {
        menus.push(menuComponent);
      }
    }
  }

  return (
    <Layout menuData={menus} footer={<CustomFooter />} {...props}>
      <Outlet />
    </Layout>
  );
};

export default VerticalLayout;
