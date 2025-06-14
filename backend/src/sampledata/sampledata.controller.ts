import { Controller, Get, Post, Body } from '@nestjs/common';
import { SampledataService } from './sampledata.service';
import { Sampledata } from 'src/entities/sampledata.entity';
import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';

@Controller('sampledata')
export class SampledataController {
    constructor(private readonly sampledataService: SampledataService) {}

    @Get('/')
    root():Promise<Sampledata[]> {
        return this.sampledataService.getAll()
    }

    @Post('/add')
    async add(@Body() data: Sampledata) : Promise<InsertResult> {
        return this.sampledataService.addSampledata(data)
    }

    @Post('/id')
    async byId(@Body() data: any):Promise<Sampledata> {
        return this.sampledataService.getById(data.id)
    }

    @Post('/edit')
    async edit(@Body() data:Sampledata):Promise<Sampledata> {
        return this.sampledataService.update(data)
    }

    @Post('/delete')
    async delete(@Body() data: any):Promise<DeleteResult> {
        return this.sampledataService.delete(data)
    }

    @Post('/find')
    async find(@Body() data: any):Promise<Sampledata[]> {
        return this.sampledataService.find(data)
    }
}
