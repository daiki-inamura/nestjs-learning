import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Userdata {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column()
    age: number;

}