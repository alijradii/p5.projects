/** @type { import('pm2').StartOptions } */
module.exports = {
  apps: [
    {
      name: 'p5js',
      script: 'bun',
      args: ['run', 'start'],
      cwd: __dirname,
      interpreter: 'none',
      env: { NODE_ENV: 'production' },
      instances: 1,
      autorestart: true,
      watch: false,
    },
  ],
};
