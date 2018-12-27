import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import config from "./config";
import routes from "./routes";

class App {

  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.mongodbSetup();

    //-----------------Route------------------//
    routes(this.app);
    //---------------End route----------------//
  }

  private config(): void {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.set("view engine", "ejs");
    this.app.set("views", "./src/views");
  }

  private mongodbSetup() {
    mongoose.connect(config.get("env.mongodbUrl"));
  }

}

export default new App().app;