import { Container } from "inversify";
import { IController } from "../IController";
import { IndexController } from "../IndexController";
import ControllerTypes from "./ControllerTypes";

const ControllerContainer = new Container();

ControllerContainer.bind<IController>(ControllerTypes.Controller).to(IndexController);

export default ControllerContainer
