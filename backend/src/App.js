require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { userRoutes } = require('./api/routes/user.route');
const { handleErrors } = require('./middlewares/errorHandler');

const PORT = process.env.PORT || 3001;

class App {
  constructor(app = express()) {
    this.app = app;
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use('/user', userRoutes);
    this.app.use(handleErrors);
  }

  startServer() {
    this.app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  }
}

module.exports = App;