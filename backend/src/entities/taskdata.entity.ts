import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Taskdata {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    title: string;

    @Column({length: 255})
    description: string;
}