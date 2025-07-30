const redirect = [
  { from: '/', to: '/login' },
  { type: 'superAdmin', to: '/informasi' },
  { type: 'ditRusus', to: '/informasi' },
  { type: 'ditRusun', to: '/informasi' },
  { type: 'ditRuk', to: '/informasi' },
  { type: 'ditSwadaya', to: '/informasi' },
  { type: 'userManagement', to: '/user-management' },
  { type: 'roleManagement', to: '/role-management' },
  // {type: 'rekapitulasiUsulan', to: '/rekapitulasi-usulan'},
  { type: 'settings', to: '/settings' },
];

export default redirect;
