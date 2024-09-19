const express = require("express");
const YAML = require('yamljs');
const path = require('path'); 
const swaggerUi = require('swagger-ui-express');
const cors = require("cors");
const { dbConnection } = require("../database/configDB");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.app.use(express.json({ limit: "50mb", extended: true }));
    this.app.use(express.urlencoded({ limit: "50mb", extended: true }));

    //modificar el path de ser necesario
    this.path = {
      users: "/api/users",
      auth: "/api/auth",
    };

    this.conectarDB();

    this.middlewares();

    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {

    this.app.use(
      cors()
    );

    this.app.use(express.json());

    this.app.use(express.static("public"));

    const swaggerDocument = YAML.load(path.join(__dirname, '../', 'swagger.yaml'));
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    
  }

  routes() {
    this.app.use(this.path.auth, require("../routes/authRoutes"));
    this.app.use(this.path.users, require("../routes/userRoutes"));
  }

  listen() {
    this.app.listen(this.port);
  }
}

module.exports = Server;
