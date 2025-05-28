// src/app.module.ts
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SampledataModule } from './sampledata/sampledata.module';
import { HelloModule } from './hello/hello.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite', 
      database: join(__dirname, '..', 'data', 'db.sqlite'), 
      entities: [__dirname + '/**/*.entity{.ts,.js}'], 
      synchronize: true, 
    }),
    SampledataModule,
    HelloModule,
    TaskModule,
  ],
})
export class AppModule {}
