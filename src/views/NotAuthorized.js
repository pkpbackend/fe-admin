// ** React Imports
import { Link } from "react-router-dom";

// ** Reactstrap Imports
import { Button } from "reactstrap";

// ** Styles
import themeConfig from "@src/configs/themeConfig";
import "@styles/base/pages/page-misc.scss";

const NotAuthorized = () => {
  const IconNotAuthorized = require(`@src/assets/images/pages/under-maintenance.svg`).default
  return (
    <div className="misc-wrapper">
      <Link to="/">
        <div style={{ width: '100%' }}>
          <object
            type="image/svg+xml"
            data={IconNotAuthorized}
            style={{ width: "100%", height: "100%", marginLeft: -10 }}
          >
            Not Authorized
          </object>
        </div>
      </Link>
      <div className="misc-inner p-2 p-sm-3">
        <div className="w-100 text-center">
          <h2 className="mb-1">You are not authorized!</h2>
          <p className="mb-2">Silahkan kembali ke halaman Beranda</p>
          <Button
            tag={Link}
            color="primary"
            className="btn-sm-block mb-1"
            to={"/"}
          >
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    </div>
  );
};
export default NotAuthorized;
