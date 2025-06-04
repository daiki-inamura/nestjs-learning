import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Taskdata } from 'src/entities/taskdata.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Taskdata)
        private readonly taskdataRepository: Repository<Taskdata>
    ) {}

    getTask() :string {
        return 'タスクAPIへようこそ';
    }

    // サンプルタスクを取得
    async getAll(): Promise<Taskdata[]> {
        return await this.taskdataRepository.find()
    }


    // 新しいタスクをDBへ保存
    async create(createTaskDto: CreateTaskDto): Promise<Taskdata> {
        const newTask = this.taskdataRepository.create(createTaskDto);
        return this.taskdataRepository.save(newTask);
    }

    /**
     * PUT /tasks/:id 更新処理
     * @Param id 更新対象のTask ID
     * @param data 更新内容（UpdateTaskDto）
     * @returns 更新後の Task
     */
    async update(id: number, data: UpdateTaskDto): Promise<Taskdata> {

        // 該当レコードを取得し、存在しなければ404を投げる
        const task = await this.taskdataRepository.findOne({where: { id }});
        if (!task) {
            throw new NotFoundException(`Task with id=${id} not found`);
        }

        // 受け取ったDTOの内容だけを既存エンティティにマージ（上書き）する
        this.taskdataRepository.merge(task, data);

        // マージ済みエンティティを保存し、更新をDBに反映
        return this.taskdataRepository.save(task);
    }

}
