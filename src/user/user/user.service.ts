import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Userdata } from 'src/entities/userdata.entity';
import { DeleteResult, InsertResult, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Userdata)
        private readonly userdateRepository: Repository<Userdata>
    ) {}

    // 全ユーザー取得
    async getAll(): Promise<Userdata[]> {
        return await this.userdateRepository.find()
    }

    // 新規ユーザー追加
    async create(data: Partial<Userdata>): Promise<Userdata> {
        const newUser = this.userdateRepository.create(data)
        return await this.userdateRepository.save(newUser);
    }

    // 指定IDの削除
    async remove(id: number): Promise<void> {
        const result = await this.userdateRepository.delete(id);
        if(result.affected === 0) {
            throw new NotFoundException(`User with id=${id} not found.`)
        }
    }

    // 指定ユーザーを更新
    async update(id: number, date: UpdateUserDto): Promise<Userdata> {
        // 該当レコードを取得
        const user = await this.userdateRepository.findOne({where: {id}});
        if(!user) {
            throw new NotFoundException(`User with id=${id} not found`);
        }
        this.userdateRepository.merge(user, date);

        return this.userdateRepository.save(user);
    }
    
}
