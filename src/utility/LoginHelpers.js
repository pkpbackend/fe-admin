import jwt from "jsonwebtoken";
import moment from "moment";
import _ from "lodash";
import redirect from "@utils/auth/redirect";
import { getValueByKey, stringRoute } from "@utils/ObjectHelpers";
import { defaultFormData } from "@views/variablesRoleManagement";

const wrongLogin = () => {
  // logout
  localStorage.removeItem("accessTokenInternal");
  window.location = stringRoute({
    redirect: "/login#/login",
  });
};

const redirectUser = (privilege, to = false) => {
  if (typeof privilege === "object") {
    let keyPrivilege = Object.keys(privilege);
    let direction = null;
    if (to === false) {
      direction = redirect.filter((item) => item.type === keyPrivilege[0]);
      // window.location = `/#${direction[0].to}`
      // history.push(direction[0].to)
    } else {
      direction = redirect.filter(
        (item) => item.type === keyPrivilege[keyPrivilege.indexOf(to)]
      );
      // window.location = `/#${direction[0].to}`
      // history.push(direction[0].to)
    }
    // return window.location.reload()
    return direction[0].to;
  }
  return wrongLogin();
};

const getUser = () => {
  let token = localStorage.getItem("accessTokenInternal");
  let dataUser = null;
  let privilege = null;
  if (token) {
    dataUser = jwt.decode(token);
    if (!dataUser) {
      return wrongLogin();
    }
    let { exp } = dataUser;

    let expiredNumber = Number(exp) * 1000;
    let nowNumber = Number(moment().format("X")?.toString()) * 1000;
    if (nowNumber > expiredNumber) {
      return wrongLogin();
    }
  } else {
    return wrongLogin();
  }
  let { user } = dataUser;
  let { Role } = user;
  if (!Role) {
    return wrongLogin();
  }

  if (!Role.privilege) {
    return wrongLogin();
  }

  let scopeCrud =
    typeof Role.scopeCrud === "string"
      ? JSON.parse(Role.scopeCrud)
      : Role.scopeCrud;

  privilege =
    typeof Role.privilege === "string"
      ? JSON.parse(Role.privilege)
      : Role.privilege;

  dataUser.privilege = syncPrivilege(privilege);
  dataUser.scopeCrud = scopeCrud;
  return dataUser;
};

const syncPrivilege = function (privilege) {
  let getPrivilege = _.cloneDeep(defaultFormData);
  let privilegeKeys = Object.keys(getPrivilege);
  for (let i = 0; i < privilegeKeys.length; i++) {
    const elParent = privilegeKeys[i];
    const getParentPriv = getValueByKey(privilege, elParent, false);

    if (elParent !== "superAdmin") {
      let childKeys = Object.keys(getPrivilege[elParent]);
      for (let j = 0; j < childKeys.length; j++) {
        const elChild = childKeys[j];
        const grandChildKeys = Object.keys(getPrivilege[elParent][elChild]);
        const getChilPriv = getValueByKey(
          privilege,
          `${elParent}.${elChild}`,
          false
        );
        if (elChild === "access") {
          getPrivilege[elParent][elChild] = getChilPriv || 0;
        } else {
          for (let k = 0; k < grandChildKeys.length; k++) {
            const elGrandChild = grandChildKeys[k];
            if (getParentPriv !== false) {
              const getGrandPriv = getValueByKey(
                privilege,
                `${elParent}.${elChild}.${elGrandChild}`,
                false
              );
              getPrivilege[elParent][elChild][elGrandChild] = getGrandPriv || 0;
            } else {
              getPrivilege[elParent][elChild][elGrandChild] = 0;
            }
          }
        }
      }
    } else {
      getPrivilege[elParent] = getParentPriv ? privilege[elParent] : 0;
    }
  }

  return getPrivilege;
};

export { redirectUser, wrongLogin, getUser, syncPrivilege };
