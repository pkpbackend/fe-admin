// ** React Imports
import { Suspense } from "react";
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import UILoader from "../ui-loader";
import intersection from "lodash/intersection";

const PrivateRoute = ({ children, route }) => {
  const acl = useSelector((state) => state.auth.user?.Role?.accessMenu);
  if (route && route.access && route.access.length > 0) {
    const isForbidden = intersection(acl, route.access).length === 0;
    if (isForbidden) {
      return <Navigate to="/not-authorized" replace />;
    }
  }

  return (
    <Suspense fallback={<UILoader blocking fullScreen withLogo />}>
      {children}
    </Suspense>
  );
};

export default PrivateRoute;
