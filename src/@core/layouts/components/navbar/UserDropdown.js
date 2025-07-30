// ** React Imports
import { Fragment } from "react";
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";
import NotificationComment from "@components/notification/NotificationComment";
import Notification from "@components/notification/Notification";

// ** Third Party Components
import { User, Power } from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/apatar.png";

// user -> data user dari redux
const UserDropdown = ({ user }) => {
  return (
    <Fragment>
      <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
        <Notification />
      </UncontrolledDropdown>
      <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
        <NotificationComment />
      </UncontrolledDropdown>
      <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
        <DropdownToggle
          href="/"
          tag="a"
          className="nav-link dropdown-user-link"
          onClick={(e) => e.preventDefault()}
        >
          <div className="user-nav d-sm-flex d-none">
            <span className="user-name fw-bold">{user?.nama}</span>
            <span className="user-status" style={{ marginTop: 5 }}>
              {user?.Role?.nama}
            </span>
          </div>
          <Avatar
            img={defaultAvatar}
            imgHeight="40"
            imgWidth="40"
            status="online"
          />
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem
            tag={Link}
            to="/"
            onClick={(e) => {
              e.preventDefault();
              window.open("/member/kelola-profil-user");
            }}
          >
            <User size={14} className="me-75" />
            <span className="align-middle">Profile</span>
          </DropdownItem>
          <DropdownItem
            tag={Link}
            to="/login"
            onClick={(e) => {
              e.preventDefault();
              window.location = "/logout";
            }}
          >
            <Power size={14} className="me-75" />
            <span className="align-middle">Logout</span>
          </DropdownItem>
          {/* <DropdownItem divider /> */}
        </DropdownMenu>
      </UncontrolledDropdown>
    </Fragment>
  );
};

export default UserDropdown;
