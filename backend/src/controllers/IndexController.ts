import { AbstractController } from "./AbstractController";

export class IndexController extends AbstractController {

  protected prefix: string = "/"

  registerRoutes() {
    this.forRoute('/').get(this.index())
  }

  index(){
    return (req: any, res: any, next: any) => {
      return res.json({ msg: `TODO API` });
    }
  }
}
