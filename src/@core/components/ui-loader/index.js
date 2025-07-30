// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import Proptypes from "prop-types";
import classnames from "classnames";

// ** Reactstrap Imports
import { Spinner } from "reactstrap";

// ** Styles
import "./ui-loader.scss";
import logo from "@src/assets/images/logo/logo.png";

const UILoader = (props) => {
  const {
    children,
    blocking,
    loader,
    fullScreen,
    className,
    tag,
    overlayColor,
    withLogo,
  } = props;

  const Tag = tag;

  return (
    <Tag
      className={classnames("ui-loader", {
        [className]: className,
        show: blocking,
        "full-screen": fullScreen,
      })}
    >
      {children}
      {blocking ? (
        <Fragment>
          <div
            className="overlay" /*eslint-disable */
            {...(blocking && overlayColor
              ? { style: { backgroundColor: overlayColor } }
              : {})}
            /*eslint-enable */
          ></div>

          <div className="loader">
            {withLogo ? (
              <div
                style={{
                  marginBottom: "2rem",
                }}
              >
                <img
                  className="fallback-logo"
                  src={logo}
                  alt="logo"
                  width="200"
                />
              </div>
            ) : null}
            {loader}
          </div>
        </Fragment>
      ) : null}
    </Tag>
  );
};

export default UILoader;

UILoader.defaultProps = {
  tag: "div",
  blocking: false,
  loader: <Spinner color="light" />,
};

UILoader.propTypes = {
  tag: Proptypes.string,
  loader: Proptypes.any,
  className: Proptypes.string,
  overlayColor: Proptypes.string,
  blocking: Proptypes.bool.isRequired,
};
