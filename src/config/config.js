/* config.js */

// require and configure dotenv, will load vars in .env in process.env
// require('dotenv').config();
require('dotenv').config({ path: '/app/src/config/../../.env' })
console.log(__dirname)
const config = {
  version: process.env.VERSION,
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  faceppKey: process.env.FACEPP_KEY,
  faceppSecret: process.env.FACEPP_SECRET,
  faceppFaceSet: process.env.FACEPP_FACESETS,
  IMGUR_CLIENT_ID: process.env.IMGUR_CLIENT_ID,
  IMGUR_CLIENT_SECRET: process.env.IMGUR_CLIENT_SECRET,
  IMGUR_CLIENT_ACCESS_TOKEN: process.env.IMGUR_CLIENT_ACCESS_TOKEN,
  IMGUR_CLIENT_REFRESH_TOKEN: process.env.IMGUR_CLIENT_REFRESH_TOKEN
};
module.exports = config;
