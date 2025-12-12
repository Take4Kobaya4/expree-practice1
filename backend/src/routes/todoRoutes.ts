import { TodoController } from "../controllers/TodoController";
import { Router } from "express";

const router = Router();
const todoController = new TodoController();

// ルートの一覧（一覧・詳細・作成・更新・削除）
router.get('/', todoController.getAll);
router.get('/:id', todoController.getById);
router.post('/', todoController.create);
router.put('/:id', todoController.update);
router.delete('/:id', todoController.delete);

export default router;