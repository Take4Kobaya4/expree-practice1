import { TodoRepository } from "../repositories/TodoRepository";
import { TodoService } from "./TodoService";
import { Todo } from "../entity/todo";

jest.mock('../repositories/TodoRepository');

describe('TodoService', () => {
    let service: TodoService;
    let mockRepository: jest.Mocked<TodoRepository>;

    beforeEach(() => {
        mockRepository = new TodoRepository() as jest.Mocked<TodoRepository>;
        service = new TodoService();
        (service as any).todoRepository = mockRepository;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // todoの新規作成のテスト
    describe('createTodo', () => {
        // タイトルが空である時、　「タイトルは必須です」というエラーを投げる
        it('should throw an error if title is empty', async () => {
            await expect(service.createTodo({ title: '' })).rejects.toThrow('タイトルは必須です');
        });

        // タイトルがスペースだけである時、「タイトルは必須です」というエラーを投げる
        it('should throw error if title is only spaces', async() => {
            await expect(service.createTodo({ title: '  ' })).rejects.toThrow('タイトルは必須です');
        });

        it('should create todo with valid title', async()=> {
            const mockTodo = { id: '1', title: 'test', completed: false } as Todo;
            mockRepository.create = jest.fn().mockResolvedValue(mockTodo);

            const result = await service.createTodo({ title: 'test' });
            expect(result).toEqual(mockTodo);
            expect(mockRepository.create).toHaveBeenCalledWith({ title: 'test' });
        })
    });

    // todoの更新テスト
    describe('updateTodo', () => {
        // タイトルが空である時、「タイトルは必須です」というエラーを投げる
        it('should throw error if title is empty string', async() => {
            await expect(
                service.updateTodo(1, { title: '' })
            ).rejects.toThrow('タイトルは必須です');
        });

        // todoが見つからない時、「Todo not found」というエラーを投げる
        it('should throw error if todo not found', async() => {
            mockRepository.update = jest.fn().mockResolvedValue(null);

            await expect(
                service.updateTodo(1, { title: 'Updated' })
            ).rejects.toThrow('Todo not found');
        });

        // 更新できた場合、更新したtodoを返す
        it('should update todo successfully', async() => {
            const mockTodo = {
                id: '1',
                title: 'Updated',
                completed: false,
                content: '',
                createdAt: new Date(),
                updatedAt: new Date(),
            } as Todo;
            mockRepository.update = jest.fn().mockResolvedValue(mockTodo);

            const result = await service.updateTodo(1, { title: 'Updated' });
            expect(result).toEqual(mockTodo);
            expect(mockRepository.update).toHaveBeenCalledWith(1, { title: 'Updated' });
        });
    });

    describe('getTodoById', () => {
        // todoが見つからない時、「Todo not found」というエラーを投げる
        it('should throw error if todo not found', async() => {
            mockRepository.findById = jest.fn().mockResolvedValue(null);
            await expect(service.getTodoById(999)).rejects.toThrow('Todo not found');
        });

        // todo詳細の成功系
        it('should get todo successfully', async() => {
            const mockTodo = {
                id: '1',
                title: 'test',
                content: '',
                completed: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            } as Todo;
            mockRepository.findById = jest.fn().mockResolvedValue(mockTodo);
            const result = await service.getTodoById(1);
            expect(result).toEqual(mockTodo);
            expect(mockRepository.findById).toHaveBeenCalledWith(1);
        });
    });

    // todo削除テスト
    describe('deleteTodo', () => {
        // todoが見つからない時、「Todo not found」というエラーを投げる
        it('should throw error if todo not found', async() => {
            // The service expects delete to throw if not found, not resolve null,
            // based on the repository and service code.
            mockRepository.delete = jest.fn().mockImplementation(() => {
                throw new Error('Todo not found');
            });
            await expect(service.deleteTodo(999)).rejects.toThrow('Todo not found');
        });

        // todo削除の成功系
        it('should delete todo successfully', async() => {
            mockRepository.delete = jest.fn().mockResolvedValue(true);
            await service.deleteTodo(1);
            expect(mockRepository.delete).toHaveBeenCalledWith(1);
        });
    });
});