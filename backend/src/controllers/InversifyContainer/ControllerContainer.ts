import { Container } from "inversify";
import { IController } from "../IController";
import { IndexController } from "../IndexController";
import { ListController } from "../ListController";
import { SessionController } from "../SessionController";
import { TaskController } from "../TaskController";
import { UserController } from "../UserController";
import ControllerTypes from "./ControllerTypes";

const ControllerContainer = new Container();

ControllerContainer.bind<IController>(ControllerTypes.Controller).to(IndexController);
ControllerContainer.bind<IController>(ControllerTypes.Controller).to(UserController);
ControllerContainer.bind<IController>(ControllerTypes.Controller).to(ListController);
ControllerContainer.bind<IController>(ControllerTypes.Controller).to(TaskController);
ControllerContainer.bind<IController>(ControllerTypes.Controller).to(SessionController);

export default ControllerContainer
