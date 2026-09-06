module.exports = {
  apps: [
    {
      name: process.env.PM2_APP_NAME || 'bella_front',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      node_args: '--env-file=.env.production',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
