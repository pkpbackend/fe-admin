import _ from "lodash";

const rolePrivilegeData = () => {
  const defaultPattern = ["ditRusus", "ditRusun", "ditRuk", "ditSwadaya"];
  let arrDirektorat = [
    {
      attr: "ditRusus",
      title: "Direktorat Rumah Khusus",
    },
    {
      attr: "ditRusun",
      title: "Direktorat Rumah Susun",
    },
    {
      attr: "ditRuk",
      title: "Direktorat RUK",
    },
    {
      attr: "ditSwadaya",
      title: "Direktorat Swadaya",
    },
    {
      attr: "userManagement",
      title: "User Management",
      arrAccess: [
        {
          attr: "listUser",
          title: "List User",
          arrPrivilege: ["view", "create", "update", "delete"],
        },
      ],
    },
    {
      attr: "roleManagement",
      title: "Role Management",
      arrAccess: [
        {
          attr: "listRole",
          title: "List Role",
          arrPrivilege: ["view", "create", "update", "delete"],
        },
        {
          attr: "detailRole",
          title: "Detail Role",
          arrPrivilege: ["view", "create", "update", "delete"],
        },
      ],
    },
    {
      attr: "developerManagement",
      title: "Pengembangan Perumahan",
      arrAccess: [
        {
          attr: "listDeveloper",
          title: "List Developer",
          arrPrivilege: ["view", "create", "update", "delete"],
        },
      ],
    },
    {
      attr: "rekapitulasiUsulan",
      title: "Rekapitulasi Usulan",
      arrAccess: [
        {
          attr: "listRekapitulasiUsulan",
          title: "List Rekapitulasi Usulan",
          arrPrivilege: ["view", "create", "update", "delete"],
        },
      ],
    },
    {
      attr: "komponenPengajuan",
      title: "Komponen Pengajuan",
      arrAccess: [
        {
          attr: "listKomponenPengajuan",
          title: "List Komponen",
          arrPrivilege: ["view", "create", "update", "delete"],
        },
      ],
    },
    {
      attr: "settings",
      title: "Settings",
      type: "settings",
      arrAccess: [
        {
          attr: "listSetting",
          title: "List Setting",
          arrPrivilege: [
            "ParameterRuk",
            "ParameterRusus",
            "ParameterRusun",
            "ParameterSwadaya",
            "ApiRusus",
          ],
        },
      ],
    },
  ].map((item) => {
    let getItem = _.cloneDeep(item);
    if (defaultPattern.indexOf(item.attr) !== -1) {
      getItem.arrAccess = [
        {
          attr: "listUsulan",
          title: "List Usulan",
          arrPrivilege: ["view", "create", "update", "delete"],
        },
        {
          attr: "detailUsulan",
          title: "Detail Usulan",
          arrPrivilege: ["view", "create", "update", "delete"],
        },
        {
          attr: "vermin",
          title: "Vermin",
          arrPrivilege: ["view", "create", "update", "delete"],
        },
        {
          attr: "vertek",
          title: "Vertek",
          arrPrivilege: ["view", "create", "update", "delete"],
        },
      ];
    }
    return getItem;
  });

  return arrDirektorat;
};

export default rolePrivilegeData;
