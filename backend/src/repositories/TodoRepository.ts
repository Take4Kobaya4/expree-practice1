import { AppDataSource } from "../config/data-source";
import { Todo } from "../entity/todo";
import { Like, Repository } from "typeorm";


export class TodoRepository {
    private repository: Repository<Todo>;

    constructor() {
        this.repository = AppDataSource.getRepository(Todo);
    }

    async findAll(search?: string): Promise<Todo[]> {
            // searchがある場合、タイトルか内容に部分一致するTodoを取得し、作成日の降順でソートする
            if(search) {
                return await this.repository.find({
                    where: [
                        { title:  Like(`%${search}%`) },
                        { content: Like(`%${search}%`) }
                    ],
                    order: {
                        createdAt: "DESC"
                    }
                });
            }
            // searchがない場合、全てのTodoを作成日の降順でソートして取得する
            return await this.repository.find({
                order: {
                    createdAt: "DESC"
                }
            });
    }

    // 詳細表示
    async findById(id: string): Promise<Todo | null> {
        return await this.repository.findOneBy({ id });
    }

    // 新規作成
    async create(todoData: Partial<Todo>): Promise<Todo> {
        const todo = this.repository.create(todoData);
        return await this.repository.save(todo);
    }

    // 更新
    async update(id: string, todoData: Partial<Todo>): Promise<Todo> {
        const todo = await this.findById(id);
        if(!todo) {
            throw new Error(`Todo with id ${id} not found.`);
        }
        Object.assign(todo, todoData);
        return await this.repository.save(todo);
    }

    // 削除
    async delete(id: string): Promise<void> {
        const result = await this.repository.delete(id);
    }
}