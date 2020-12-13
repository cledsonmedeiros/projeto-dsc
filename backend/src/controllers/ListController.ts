import auth from "../middlewares/auth";
import { List } from "../models/List";
import { User } from "../models/User";
import { AbstractController } from "./AbstractController";

export class ListController extends AbstractController {

  protected prefix: string = "/list"

  registerRoutes() {
    this.forRoute('/').post(auth, this.create())

    this.forRoute('/:id').get(auth, this.show())

    this.forRoute('/:id').put(auth, this.update())

    this.forRoute('/:id').delete(auth, this.delete())

    this.forRoute('/myLists').post(auth, this.getByUser())
  }

  index() {
    return async (req: any, res: any, next: any) => {
      try {
        const lists = await List.find({});
        return res.json(lists);
      } catch (error) {
        return res.status(500).json({ msg: 'Erro interno no servidor', error })
      }
    }
  }

  create() {
    return async (req: any, res: any, next: any) => {
      try {
        const list: List = new List();
        Object.assign(list, req.body)
        await list.save();
        return res.json(list);
      } catch (error) {
        return res.status(500).json({ msg: 'Erro interno no servidor', error })
      }
    }
  }

  show() {
    return async (req: any, res: any, next: any) => {
      try {
        const list: List = await List.findOne({ id: req.params.id }) as List;

        if (!list) {
          return res.status(404).json({ msg: 'Lista não encontrada' })
        }

        return res.json(list);
      } catch (error) {
        return res.status(500).json({ msg: 'Erro interno no servidor', error })
      }
    }
  }

  update() {
    return async (req: any, res: any, next: any) => {
      try {
        const list: List = await List.findOne({ id: req.params.id }) as List;
        Object.assign(list, req.body)
        await list.save();
        return res.json(list);
      } catch (error) {
        return res.status(500).json({ msg: 'Erro interno no servidor', error })
      }
    }
  }

  delete() {
    return async (req: any, res: any, next: any) => {
      try {
        const list: List = await List.findOne({ id: req.params.id }) as List;
        if (!list) {
          return res.status(404).json({ msg: 'Lista não encontrada' })
        }
        await list.remove();
        return res.status(200).json({ msg: 'Lista removida com sucesso' });
      } catch (error) {
        return res.status(500).json({ msg: 'Erro interno no servidor', error })
      }
    }
  }

  getByUser() {
    return async (req: any, res: any, next: any) => {
      try {
        const user: User = await User.findOne({ id: req.userId }) as User;
        if (!user) {
          return res.status(404).json({ msg: 'Usuário não encontrado' })
        }

        const lists: Array<List> | undefined = await List.createQueryBuilder(
          "list"
        )
          .orderBy("list.createdAt", "ASC")
          .where("list.user = :user", { user: user.id })
          .getMany();


        return res.status(200).json(lists);
      } catch (error) {
        return res.status(500).json({ msg: 'Erro interno no servidor', error })
      }
    }
  }
}
