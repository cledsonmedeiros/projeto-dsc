import { Task } from "../models/Task";
import { AbstractController } from "./AbstractController";

export class TaskController extends AbstractController {

  protected prefix: string = "/task"

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
        const tasks = await Task.find({});
        return res.json(tasks);
      } catch (error) {
        return res.status(500).json({ msg: 'Erro interno no servidor', error })
      }
    }
  }

  create() {
    return async (req: any, res: any, next: any) => {
      try {
        const task: Task = new Task();
        Object.assign(task, req.body)
        await task.save();
        return res.json(task);
      } catch (error) {
        return res.status(500).json({ msg: 'Erro interno no servidor', error })
      }
    }
  }

  show() {
    return async (req: any, res: any, next: any) => {
      try {
        const task: Task = await Task.findOne({ id: req.params.id }) as Task;

        if (!task) {
          return res.status(404).json({ msg: 'Tarefa não encontrada' })
        }

        return res.json(task);
      } catch (error) {
        return res.status(500).json({ msg: 'Erro interno no servidor', error })
      }
    }
  }

  update() {
    return async (req: any, res: any, next: any) => {
      try {
        const task: Task = await Task.findOne({ id: req.params.id }) as Task;
        Object.assign(task, req.body)
        await task.save();
        return res.json(task);
      } catch (error) {
        return res.status(500).json({ msg: 'Erro interno no servidor', error })
      }
    }
  }

  delete() {
    return async (req: any, res: any, next: any) => {
      try {
        const task: Task = await Task.findOne({ id: req.params.id }) as Task;
        if (!task) {
          return res.status(404).json({ msg: 'Tarefa não encontrada' })
        }
        await task.remove();
        return res.status(200).json({ msg: 'Tarefa removida com sucesso' });
      } catch (error) {
        return res.status(500).json({ msg: 'Erro interno no servidor', error })
      }
    }
  }
}
