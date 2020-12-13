import "reflect-metadata";
import express from "express";
import logger from "morgan";
import { IController } from "./controllers/IController";
import ControllerContainer from "./controllers/InversifyContainer/ControllerContainer";
import ControllerTypes from "./controllers/InversifyContainer/ControllerTypes";
import { createConnection } from "typeorm";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

createConnection();

const controllers: IController[] = ControllerContainer.getAll<IController>(ControllerTypes.Controller);
controllers.forEach(controller => {
  controller.forApp(app).registerRoutes();
});

export default app;
