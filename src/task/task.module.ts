import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Taskdata } from 'src/entities/taskdata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Taskdata])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
