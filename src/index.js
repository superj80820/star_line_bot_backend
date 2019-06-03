const config = require('./config/config');
const app = require('./config/express');

if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    console.log(`Hi develop! Server started on  port http://127.0.0.1:${config.port} (${config.env})`);
  });
}
module.exports = app;