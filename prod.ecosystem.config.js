module.exports = {
  apps: [
    {
      name: 'prod-fe-admin',
      script: 'npm',
      args: 'start',
      autorestart: true,
      watch: false,
    },
  ],
};