const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    return config;
  },

  env: {
    customKey: 'my-value',
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  },
});
