import type { EcosystemConfig } from 'pm2';

const config: EcosystemConfig = {
  apps: [
    {
      name: 'meter-api',
      script: 'dist/server.js', // Output after tsc build
      cwd: 'apps/server', // Your backend working dir
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: '3001',
      },
    },
  ],
};

export default config;
