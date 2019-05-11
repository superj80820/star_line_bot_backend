/* config.js */

// require and configure dotenv, will load vars in .env in process.env
require('dotenv').config();

const config = {
  version: '1.0.0',
  env: 'development',
  port: process.env.PORT
};

export default config;
