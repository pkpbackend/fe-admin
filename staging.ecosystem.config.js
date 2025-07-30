module.exports = {
  apps: [
    {
      name: 'staging-fe-admin',
      script: 'npm',
      args: 'start',
      autorestart: true,
      watch: false,
    },
  ],
};