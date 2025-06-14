import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { TaskService } from './task.service';
import { Taskdata } from 'src/entities/taskdata.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService){}

    @Get('/hello')
    getTask():string {
        return this.taskService.getTask();
    }

    // サンプルタスク取得
    @Get()
    root(): Promise<Taskdata[]> {
        return this.taskService.getAll()
    }

    // サンプルタスク保存
    // @Post()
    // async add(@Body() data: Partial<Taskdata>) :Promise<Taskdata> {
    //     return this.taskService.create(data)
    // }

    // 新規タスクの作成
    @Post()
    async create(@Body() createTaskDto: CreateTaskDto): Promise<Taskdata> {
        return this.taskService.create(createTaskDto);
    }

  /**
   * PUT /tasks/:id — 更新
   * リクエスト例:
   * PUT http://localhost:3000/tasks/1
   * Body: { "title": "新しいタイトル", "priority": 3 }
   */

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    ): Promise<Taskdata> {
        // DTO バリデーションは自動で行われる
        return this.taskService.update(+id, updateTaskDto);
    }
}
