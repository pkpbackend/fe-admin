import React from 'react';
import _ from 'lodash';

import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import ApiCall from '@api/ApiCallGlobal';
import { getValueByKey } from '@utils/ObjectHelpers';

const onPostRole = formData => {
  return new Promise((resolve, reject) => {
    ApiCall.storeRole(formData)
      .then(res => {
        resolve(res.data.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const onUpdateRole = (id, formData) => {
  return new Promise((resolve, reject) => {
    ApiCall.updateRole(id, formData)
      .then(res => {
        resolve(res.data.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const onDeleteRole = id => {
  return new Promise((resolve, reject) => {
    ApiCall.deleteRole(id)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const onFetchRole = params => {
  return new Promise((resolve, reject) => {
    ApiCall.getRole(params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const onFetchScopeRegionRole = params => {
  return new Promise((resolve, reject) => {
    ApiCall.getScopeRegionRole(params)
      .then(res => {
        let rayRes = res.data.data;
        let rayOmit = [];
        rayRes = rayRes.filter(item => rayOmit.indexOf(item.name) === -1);
        return resolve(rayRes);
      })
      .catch(err => reject(err));
  });
};

const onFetchDirektorat = () => {
  return new Promise((resolve, reject) => {
    ApiCall.getDirektorat()
      .then(res => {
        resolve(res.data.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const defaultFormData = {
  superAdmin: 0,
  ditRusus: {
    access: 0,
    listUsulan: {
      view: 0,
      create: 0,
      update: 0,
      delete: 0,
    },
    detailUsulan: {
      view: 0,
      create: 0,
      update: 0,
      delete: 0,
    },
    vermin: {
      view: 0,
      create: 0,
      update: 0,
      delete: 0,
    },
    vertek: {
      view: 0,
      create: 0,
      update: 0,
      delete: 0,
    },
  },
  ditRusun: {
    access: 0,
    listUsulan: {
      view: 0,
      create: 0,
      update: 0,
      delete: 0,
    },
    detailUsulan: {
      view: 0,
      create: 0,
      update: 0,
      delete: 0,
    },
    vermin: {
      view: 0,
      create: 0,
      update: 0,
      delete: 0,
    },
    vertek: {
      view: 0,
      create: 0,
      update: 0,
      delete: 0,
    },
  },
  ditRuk: {
    access: 0,
    listUsulan: {
      view: 0,
      create: 0,
      update: 0,
      delete: 0,
    },
    detailUsulan: {
      view: 0,
      create: 0,
      update: 0,
      delete: 0,
    },
    vermin: {
      view: 0,
      create: 0,
      update: 0,
      delete: 0,
    },
    vertek: {
      view: 0,
      create: 0,
      update: 0,
      delete: 0,
    },
  },
  ditSwadaya: {
    access: 0,
    listUsulan: {
      view: 0,
      create: 0,
      update: 0,
      delete: 0,
    },
    detailUsulan: {
      view: 0,
      create: 0,
      update: 0,
      delete: 0,
    },
    vermin: {
      view: 0,
      create: 0,
      update: 0,
      delete: 0,
    },
    vertek: {
      view: 0,
      create: 0,
      update: 0,
      delete: 0,
    },
  },
  userManagement: {
    access: 0,
    listUser: {
      view: 0,
      create: 0,
      update: 0,
      delete: 0,
    },
  },
  roleManagement: {
    access: 0,
    listRole: {
      view: 0,
      create: 0,
      update: 0,
      delete: 0,
    },
    detailRole: {
      view: 0,
      create: 0,
      update: 0,
      delete: 0,
    },
  },
  developerManagement: {
    access: 0,
    listDeveloper: {
      view: 0,
      create: 0,
      update: 0,
      delete: 0,
    },
  },
  komponenPengajuan: {
    access: 0,
    listKomponenPengajuan: {
      view: 0,
      create: 0,
      update: 0,
      delete: 0,
    },
  },
  rekapitulasiUsulan: {
    access: 0,
    listRekapitulasiUsulan: {
      view: 0,
      create: 0,
      update: 0,
      delete: 0,
    },
  },
  settings: {
    access: 0,
    listSetting: {
      ParameterRuk: 0,
      ParameterSwadaya: 0,
      ParameterRusun: 0,
      ParameterRusus: 0,
      ApiRusus: 0,
    },
  },
};

/* dataMaster: {
        access: 0,
        komponenPengajuan: {
            access: 0,
            listKomponenPengajuan: {
                view: 0,
                create: 0,
                update: 0,
                delete: 0
            },
            detailKomponenPengajuan: {
                view: 0,
                create: 0,
                update: 0,
                delete: 0
            }
        }
    }, */

const defaultCommonData = {
  nama: '',
  ScopeRegionRoleId: '',
  DirektoratId: '',
  level: '',
  scopeCrud: '',
  pengusul: 1,
};

const columnsTable = (objParam = null) => {
  return [
    {
      Header: '#',
      filterable: false,
      width: 25,
      Cell: props => {
        let { pageSize, page, index } = props;
        return <p className="text-center">{index + 1 + page * pageSize}</p>;
      },
    },
    {
      Header: 'Role',
      accessor: 'nama',
    },
    {
      Header: 'Direktorat',
      accessor: 'Direktorat.name',
    },
    {
      Header: 'Cangkupan Usulan',
      accessor: 'ScopeRegionRole.name',
    },
    {
      Header: 'Actions',
      filterable: false,
      width: 90,
      Cell: props => {
        let { original } = props;

        return (
          <div>
            <Link to={`/role-management/detail?id=${props.original.id}`}>
              <Button className="btn-darkblue" size="sm">
                <i className="fa fa-info" /> Detail
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];
};

const parentCheck = function(
  e,
  attr,
  attrAccess = false,
  arrPrivilege = false,
  attrSelect = false,
  arrMenu = false,
) {
  let { formData } = this.state;
  let { checked } = e.target;

  let arrAttr = [];
  if (attrAccess) {
    arrAttr = attrAccess;
  }
  formData[attr].access = checked === true ? 1 : 0;

  for (let i = 0; i < arrAttr.length; i++) {
    const element = arrAttr[i];
    let arrElementAttr = [];
    if (arrPrivilege) {
      arrElementAttr = arrPrivilege;
    }
    if (arrMenu) {
      let menuKeys = Object.keys(arrMenu);
      for (let j = 0; j < menuKeys.length; j++) {
        const elMenu = menuKeys[j];
        if (attrSelect) {
          formData[attr][element][elMenu][attrSelect] = checked ? 1 : 0;
        }
        for (let k = 0; k < arrElementAttr.length; k++) {
          const elAttr = arrElementAttr[k];
          formData[attr][element][elMenu][elAttr] = 0;
        }
      }
    } else {
      if (attrSelect) {
        formData[attr][element][attrSelect] = checked ? 1 : 0;
      }
      for (let j = 0; j < arrElementAttr.length; j++) {
        const elAttr = arrElementAttr[j];
        formData[attr][element][elAttr] = 0;
      }
    }
  }

  if (checked === false) {
    formData.superAdmin = 0;
  }

  this.setState({
    formData,
  });
};

const superAdminCheck = function(e) {
  let { formData } = this.state;
  const { checked } = e.target;
  const parentKeys = Object.keys(formData);

  for (let i = 0; i < parentKeys.length; i++) {
    const parent = parentKeys[i];
    if (parent === 'superAdmin') {
      formData[parent] = checked ? 1 : 0;
    } else {
      const childrenKeys = Object.keys(formData[parent]);
      for (let j = 0; j < childrenKeys.length; j++) {
        const children = childrenKeys[j];
        if (children === 'access') {
          formData[parent][children] = checked ? 1 : 0;
        } else {
          const grandChildKeys = Object.keys(formData[parent][children]);
          for (let k = 0; k < grandChildKeys.length; k++) {
            const grandChild = grandChildKeys[k];
            const grandChild2ndKeys = Object.keys(formData[parent][children][grandChild]);
            if (grandChild2ndKeys.length > 0) {
              for (let l = 0; l < grandChild2ndKeys.length; l++) {
                const grandChild2nd = grandChild2ndKeys[l];
                formData[parent][children][grandChild][grandChild2nd] = checked ? 1 : 0;
              }
            } else {
              formData[parent][children][grandChild] = checked ? 1 : 0;
            }
          }
        }
      }
    }
  }

  this.setState({
    formData,
  });
};
let timeoutHandle = null;

const handleCheck = function(e, parentAttr, attrChild, attrGrandChild = false) {
  let { formData } = this.state;
  let { checked, name } = e.target;

  if (attrGrandChild) {
    formData[parentAttr][attrChild][attrGrandChild][name] = checked ? 1 : 0;
  } else {
    formData[parentAttr][attrChild][name] = checked ? 1 : 0;
  }

  if (checked === false) {
    formData.superAdmin = 0;
  } else {
    const parentKeys = Object.keys(formData);
    let arrCheck = [];

    for (let i = 0; i < parentKeys.length; i++) {
      const parent = parentKeys[i];
      if (parent === 'superAdmin') {
        arrCheck.push(formData[parent] === 1);
      } else {
        const childrenKeys = Object.keys(formData[parent]);
        for (let j = 0; j < childrenKeys.length; j++) {
          const children = childrenKeys[j];
          if (children === 'access') {
            arrCheck.push(formData[parent][children] === 1);
          } else {
            const grandChildKeys = Object.keys(formData[parent][children]);
            for (let k = 0; k < grandChildKeys.length; k++) {
              const grandChild = grandChildKeys[k];
              const grandChild2ndKeys = Object.keys(formData[parent][children][grandChild]);
              if (grandChild2ndKeys.length > 0) {
                for (let l = 0; l < grandChild2ndKeys.length; l++) {
                  const grandChild2nd = grandChild2ndKeys[l];
                  arrCheck.push(formData[parent][children][grandChild][grandChild2nd] === 1);
                }
              } else {
                arrCheck.push(formData[parent][children][grandChild] === 1);
              }
            }
          }
        }
      }
    }
    let lengthTrue = arrCheck.filter(item => item === true);
    if (Number(arrCheck.length) - 1 === Number(lengthTrue.length)) {
      formData.superAdmin = 1;
    }
  }

  this.setState({
    formData,
  });
};

const handleChange = function(e) {
  let { name, value, type, checked } = e.target;
  let { commonData } = this.state;

  if (name && name.split('.').length === 2) {
    name = name.split('.');

    commonData[name[0]] = {
      ...commonData[name[0]],
      [name[1]]: checked,
    };
  } else {
    if (type === 'radio') {
      value = Number(value);
    }
    if (timeoutHandle) {
      clearTimeout(timeoutHandle);
    }

    if (name == 'dashboard' || name == 'defaultLogin') {
      commonData[name] = checked ? 1 : 0;
    } else {
      commonData[name] = value;
    }
  }

  this.setState({
    commonData,
  });
};

const toggle = function(attr, cb = false) {
  let { toggle: getToggle } = this.state;
  this.setState(
    {
      toggle: {
        ...getToggle,
        [attr]: !getToggle[attr],
      },
    },
    () => {
      if (typeof cb === 'function') {
        cb();
      }
    },
  );
};

const clearForm = function(attr) {
  let { detailRole } = this.state;
  let id = null;
  let nama = null;
  let privilege = null;

  if (detailRole) {
    id = detailRole.id;
    nama = detailRole.nama;
    privilege = detailRole.privilege;
    if (privilege) {
      privilege = JSON.parse(privilege);
    }
  }

  if (id) {
    const funcSyncDataPrivilege = syncDataPrivilege.bind(this);
    funcSyncDataPrivilege(privilege, {
      id,
      nama,
    });
  } else {
    this.setState({
      errorCommonData: [],
      formData: {
        ..._.cloneDeep(defaultFormData),
      },
      commonData: {
        ..._.cloneDeep(defaultCommonData),
      },
    });
  }
};

const syncDataPrivilege = function(privilege, common, cb = false) {
  let { formData, commonData } = this.state;
  let privilegeKeys = Object.keys(formData);
  for (let i = 0; i < privilegeKeys.length; i++) {
    const elParent = privilegeKeys[i];
    const getParentPriv = getValueByKey(privilege, elParent, false);

    if (elParent !== 'superAdmin') {
      let childKeys = Object.keys(formData[elParent]);
      for (let j = 0; j < childKeys.length; j++) {
        const elChild = childKeys[j];
        const grandChildKeys = Object.keys(formData[elParent][elChild]);
        const getChilPriv = getValueByKey(privilege, `${elParent}.${elChild}`, false);
        if (elChild === 'access') {
          formData[elParent][elChild] = getChilPriv || 0;
        } else {
          for (let k = 0; k < grandChildKeys.length; k++) {
            const elGrandChild = grandChildKeys[k];
            if (getParentPriv !== false) {
              const getGrandPriv = getValueByKey(
                privilege,
                `${elParent}.${elChild}.${elGrandChild}`,
                false,
              );
              formData[elParent][elChild][elGrandChild] = getGrandPriv || 0;
            } else {
              formData[elParent][elChild][elGrandChild] = 0;
            }
          }
        }
      }
    } else {
      formData[elParent] = getParentPriv ? privilege[elParent] : 0;
    }
  }

  this.setState(
    {
      formData,
      commonData: {
        ...commonData,
        ...common,
      },
    },
    () => {
      if (typeof cb === 'function') {
        cb();
      }
    },
  );
};

const optCommonData = [
  {
    element: 'nama',
    rules: 'required',
    message: {
      required: 'Nama tidak bole kosong',
    },
  },
  {
    element: 'ScopeRegionRoleId',
    rules: 'required',
    message: {
      required: 'Cangkupan usulan tidak boleh kosong',
    },
  },
];

export {
  defaultFormData,
  defaultCommonData,
  onPostRole,
  columnsTable,
  onFetchRole,
  parentCheck,
  superAdminCheck,
  handleCheck,
  handleChange,
  toggle,
  clearForm,
  syncDataPrivilege,
  onUpdateRole,
  onDeleteRole,
  onFetchScopeRegionRole,
  optCommonData,
  onFetchDirektorat,
};
