import { User } from "../models/User";
import { AbstractController } from "./AbstractController";
// import test from "../middlewares/test";

export class UserController extends AbstractController {

  protected prefix: string = "/user"

  registerRoutes() {
    this.forRoute('/').get(this.index())

    // this.setMiddleware(test)

    this.forRoute('/').post(this.create())

    this.forRoute('/:id').get(this.show())

    this.forRoute('/:id').put(this.update())

    this.forRoute('/:id').delete(this.delete())
  }

  index() {
    return async (req: any, res: any, next: any) => {
      const users = await User.find({});
      return res.json(users);
    }
  }

  create() {
    return async (req: any, res: any, next: any) => {
      const user: User = new User();
      Object.assign(user, req.body)
      user.passwordHash();
      await user.save();
      return res.json(user);
    }
  }

  show() {
    return async (req: any, res: any, next: any) => {
      const user: User = await User.findOne({ id: req.params.id }) as User;

      if (!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado' })
      }

      return res.json(user);
    }
  }

  update() {
    return async (req: any, res: any, next: any) => {
      const user: User = await User.findOne({ id: req.params.id }) as User;
      Object.assign(user, req.body)
      await user.save();
      return res.json(user);
    }
  }

  delete() {
    return async (req: any, res: any, next: any) => {
      const user: User = await User.findOne({ id: req.params.id }) as User;
      if (!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado' })
      }
      await user.remove();
      return res.status(200).json({ msg: 'Usuário removido com sucesso' });
    }
  }
}
