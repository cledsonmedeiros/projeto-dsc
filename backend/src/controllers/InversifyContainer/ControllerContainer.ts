import { Container } from "inversify";
import { IController } from "../IController";
import { IndexController } from "../IndexController";
import { UserController } from "../UserController";
import ControllerTypes from "./ControllerTypes";

const ControllerContainer = new Container();

ControllerContainer.bind<IController>(ControllerTypes.Controller).to(IndexController);
ControllerContainer.bind<IController>(ControllerTypes.Controller).to(UserController);

export default ControllerContainer
