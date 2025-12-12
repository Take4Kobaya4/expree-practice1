import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('todo')

export class Todo {
    // Define columns and properties here
    @PrimaryGeneratedColumn('uuid')
    readonly id!: string;

    // Define other columns here
    @Column({ type: 'varchar', length: 50 })
    public title!: string;

    @Column({ type: 'text', nullable: true })
    public content!: string;

    @Column({ type: 'boolean', default: false })
    public completed!: boolean;

    @CreateDateColumn({ name: 'created_at'})
    readonly createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    readonly updatedAt!: Date;
}