import { User } from "../models/User";
import { AbstractController } from "./AbstractController";
import * as jwt from "jsonwebtoken";
import auth from "../middlewares/auth";
const authConfig = require("../config/jwt");

const JWT_SECRET = process.env.JWT_SECRET || "secret"

export class SessionController extends AbstractController {

  protected prefix: string = "/session"

  registerRoutes() {
    this.forRoute('/').post(this.create())

    this.forRoute('/').get(auth, this.show())

    this.forRoute('/').delete(auth, this.delete())
  }

  create() {
    return async (req: any, res: any, next: any) => {
      try {
        const user: User = await User.findOne({ username: req.body.username }) as User;
        if (!user) {
          return res.status(400).json({ msg: "Usuário não encontrado" })
        }

        const checkPassword = user.passwordCheck(req.body.password);

        if (!checkPassword) {
          return res.status(400).json({ msg: "Credenciais inválidas" })
        }

        return res.status(200).json({
          data: user,
          token: jwt.sign(
            { userId: user.id, userUsername: user.username },
            JWT_SECRET,
            { expiresIn: authConfig.expiresIn }
          ),
        });
      } catch (error) {
        console.log(error);

        return res.status(500).json({ msg: 'Erro interno no servidor', error: String(error) });
      }
    }
  }

  show() {
    return async (req: any, res: any, next: any) => {
      try {
        const user: User = await User.findOne({ id: req.userId }) as User;

        if (!user) {
          return res.status(404).json({ msg: 'Usuário não encontrado' })
        }

        return res.json(user);
      } catch (error) {
        return res.status(500).json({ msg: 'Erro interno no servidor', error })
      }
    }
  }

  delete() {
    return async (req: any, res: any, next: any) => {
      try {
        return res.status(200).json();
      } catch (error) {
        return res.status(500).json({ msg: 'Erro interno no servidor', error })
      }
    }
  }
}
