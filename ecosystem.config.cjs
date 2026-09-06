module.exports = {
  apps: [
    {
      name: process.env.PM2_APP_NAME || 'bella_front',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      node_args: '--env-file=.env.production',
      env: {
        NODE_ENV: process.env.SITE_ENV ,
        PORT: process.env.PORT || 3000,
      },
    },
  ],
}
