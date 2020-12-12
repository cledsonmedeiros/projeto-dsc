import { User } from "../models/User";
import { AbstractController } from "./AbstractController";

export class UserController extends AbstractController {

  protected prefix: string = "/user"

  registerRoutes() {
    this.forRoute('/').get(this.index())

    this.forRoute('/').post(this.create())

    this.forRoute('/:id').get(this.show())

    this.forRoute('/:id').put(this.update())

    this.forRoute('/:id').delete(this.delete())
  }

  index() {
    return async (req: any, res: any, next: any) => {
      try {
        const users = await User.find({});
        return res.json(users);
      } catch (error) {
        return res.status(500).json({ msg: 'Erro interno no servidor', error })
      }
    }
  }

  create() {
    return async (req: any, res: any, next: any) => {
      try {
        const user: User = new User();
        Object.assign(user, req.body)
        user.passwordHash();
        await user.save();
        return res.json(user);
      } catch (error) {
        return res.status(500).json({ msg: 'Erro interno no servidor', error })
      }
    }
  }

  show() {
    return async (req: any, res: any, next: any) => {
      try {
        const user: User = await User.findOne({ id: req.params.id }) as User;

        if (!user) {
          return res.status(404).json({ msg: 'Usuário não encontrado' })
        }

        return res.json(user);
      } catch (error) {
        return res.status(500).json({ msg: 'Erro interno no servidor', error })
      }
    }
  }

  update() {
    return async (req: any, res: any, next: any) => {
      try {
        const user: User = await User.findOne({ id: req.params.id }) as User;
        Object.assign(user, req.body)
        if (req.body.password) {
          user.passwordHash();
        }
        await user.save();
        return res.json(user);
      } catch (error) {
        return res.status(500).json({ msg: 'Erro interno no servidor', error })
      }
    }
  }

  delete() {
    return async (req: any, res: any, next: any) => {
      try {
        const user: User = await User.findOne({ id: req.params.id }) as User;
        if (!user) {
          return res.status(404).json({ msg: 'Usuário não encontrado' })
        }
        await user.remove();
        return res.status(200).json({ msg: 'Usuário removido com sucesso' });
      } catch (error) {
        return res.status(500).json({ msg: 'Erro interno no servidor', error })
      }
    }
  }
}
