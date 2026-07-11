module.exports = {
  apps: [
    {
      name: 'bella_front',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      env: {
        NODE_ENV: 'production',
        node_args: 'env-file .env.production',
      },
    },
  ],
}
