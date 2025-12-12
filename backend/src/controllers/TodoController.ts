import { TodoService } from "../services/TodoService";
import { Request, Response } from "express";

export class TodoController {
    private todoService: TodoService;

    constructor() {
        this.todoService = new TodoService();
    }

    // 一覧取得(成功時は200,失敗時は500)
    getAll = async(req: Request, res: Response): Promise<void> => {
        try {
            const search = req.query.search as string | undefined;
            if (search){
                const todos = await this.todoService.getAllTodos(search);
                res.status(200).json(todos);
                return;
            } else {
                const todos = await this.todoService.getAllTodos();
                res.status(200).json(todos);
            }
            // この行は不要なので削除しました
        } catch (error) {
            res.status(500).json({
                message: 'Todoの一覧取得に失敗しました',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    // 詳細表示
    getById = async(req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const todo = await this.todoService.getTodoById(id);
            res.status(200).json(todo);
        } catch (error) {
            // Todoが見つからない場合は404、それ以外は500
            if(error instanceof Error && error.message === "Todo not found") {
                res.status(404).json({ message: 'Todoが見つかりません' });
            } else {
                res.status(500).json({
                    message: 'Todoの取得に失敗しました',
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    }

    // 新規作成
    create = async(req: Request, res: Response): Promise<void> => {
        try {
            // 新規作成が成功した場合201を返す
            const todo = await this.todoService.createTodo(req.body);
            res.status(201).json(todo);
        } catch (error) {
            // エラーが出て、タイトルが必須ですの場合は400、それ以外は500
            if(error instanceof Error && error.message === "タイトルは必須です") {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({
                    message: 'Todoの作成に失敗しました',
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    }

    // 更新
    update = async(req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const todo = await this.todoService.updateTodo(id, req.body);
            res.status(200).json(todo);
        } catch (error) {
            // Todoが見つからない場合は404、タイトルが必須ですの場合は400、それ以外は500
            if(error instanceof Error) {
                if(error.message === "Todo not found") {
                    res.status(404).json({ message: 'Todoが見つかりません' });
                    return;
                }
                if(error.message === "タイトルは必須です") {
                    res.status(400).json({ message: error.message });
                    return;
                }
            }
            res.status(500).json({
                message: 'Todoの更新に失敗しました',
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    // 削除
    delete = async(req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            await this.todoService.deleteTodo(id);
            res.status(200).json({ message: 'Todoを削除しました' });
        } catch (error) {
            // Todoが見つからない場合は404、それ以外は500
            if(error instanceof Error && error.message === "Todo not found") {
                res.status(404).json({ message: 'Todoが見つかりません' });
            } else {
                res.status(500).json({
                    message: 'Todoの削除に失敗しました',
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }
    }
}