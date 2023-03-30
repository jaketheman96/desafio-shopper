require('dotenv').config();
const App = require('./App');

const server = new App();
server.startServer();

module.exports = server;