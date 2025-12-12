import { AppDataSource } from "./config/data-source";
import express from 'express';
import * as dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

export const API_BASE_URL = '/api/todos';

app.use(express.json());

// ルーティング: /api/todos で一覧を表示できるようにする
app.use(API_BASE_URL, todoRoutes);

// ヘルスチェック
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

const startServer = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database connected");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
}
// サーバーを起動
startServer();
