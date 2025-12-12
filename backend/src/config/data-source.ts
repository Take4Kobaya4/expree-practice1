import "reflect-metadata"
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'todo_app',
    synchronize: false,
    logging: process.env.NODE_ENV === 'development',
    entities: ['src/entity/**/*.ts'], // entityファイルのパス
    migrations: ['src/migration/**/*.ts'], // マイグレーションファイルのパス
});

