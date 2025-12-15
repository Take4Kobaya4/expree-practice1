import { Todo } from "entity/todo";
import { TodoRepository } from "../repositories/TodoRepository";

export interface CreateTodoDTO {
    title: string;
    content?: string;
    completed?: boolean;
}

export interface UpdateTodoDTO {
    title?: string;
    content?: string;
    completed?: boolean;
}

export class TodoService {
    private todoRepository: TodoRepository;

    constructor() {
        this.todoRepository = new TodoRepository();
    }

    // 一覧取得
    async getAllTodos(search?: string): Promise<Todo[]> {
            return await this.todoRepository.findAll(search);
    }

    // 詳細表示
    async getTodoById(id: number): Promise<Todo> {
            const todo = await this.todoRepository.findById(id);
            // 存在しない場合はエラーを投げる
            if(!todo) {
                throw new Error("Todo not found");
            }
            return todo;
    }

    async createTodo(dto: CreateTodoDTO): Promise<Todo> {
            // タイトルがからの時、タイトルは必須ですとエラーを投げる
            if(!dto.title || dto.title.trim() === "") {
                throw new Error("タイトルは必須です");
            }
            return await this.todoRepository.create(dto);
    }

    async updateTodo(id: number, dto: UpdateTodoDTO): Promise<Todo> {
            // タイトルがundefinedでない且つ空の場合、タイトルは必須ですとエラーを投げる
            if(dto.title !== undefined && dto.title.trim() === "") {
                throw new Error("タイトルは必須です");
            }
            const todo = await this.todoRepository.update(id, dto);
            // 更新できなかった場合はエラーを投げる
            if(!todo) {
                throw new Error("Todo not found");
            }
            return todo;
    }

    async deleteTodo(id: number): Promise<void> {
            const deleted = await this.todoRepository.delete(id);
    }
}