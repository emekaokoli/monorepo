module.exports = {
  apps: [
    {
      name: 'server',
      script: 'dist/src/index.js',
      cwd: __dirname,
      instances: "max",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production'
      },
      env_development: {
        NODE_ENV: 'development'
      }
    },
    {
      name: 'server-dev',
      script: 'src/server.ts',
      cwd: __dirname,
      interpreter: './node_modules/.bin/ts-node-dev',
      watch: ['src'],
      autorestart: true,
      env: {
        NODE_ENV: 'development'
      }
    }
  ]
};
