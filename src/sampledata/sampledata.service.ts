import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { Sampledata } from 'src/entities/sampledata.entity';

@Injectable()
export class SampledataService {
    constructor(
        @InjectRepository(Sampledata)
        private readonly sampledataRepository: Repository<Sampledata>
    ) {}

    async getAll():Promise<Sampledata[]> {
        return await this.sampledataRepository.find()
    }

    async addSampledata(obj) : Promise<InsertResult> {
        return this.sampledataRepository.insert(obj)
    }

  async getById(id: number): Promise<Sampledata> {
    const record = await this.sampledataRepository.findOneBy({ id });
    if (!record) {
      throw new NotFoundException(`Sampledata with id=${id} not found`);
    }
    return record;
  }

    async update(data:Sampledata):Promise<Sampledata> {
        const entity = await this.getById(data.id)
        entity.memo = data.memo
        entity.mail = data.mail
        entity.url = data.url
        return await this.sampledataRepository.save(entity)
    }
}
