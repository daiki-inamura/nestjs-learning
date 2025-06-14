import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Sampledata {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 255 })
    memo: string

    @Column({ length: 10000, nullable:true })
    mail: string

    @Column({ length: 200, nullable: true })
    url: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date
}