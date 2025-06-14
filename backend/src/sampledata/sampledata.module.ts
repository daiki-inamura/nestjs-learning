import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SampledataService } from './sampledata.service'
import { SampledataController } from './sampledata.controller'
import { Sampledata } from '../entities/sampledata.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Sampledata])],
    providers: [SampledataService],
    controllers: [SampledataController]
})

export class SampledataModule {}
