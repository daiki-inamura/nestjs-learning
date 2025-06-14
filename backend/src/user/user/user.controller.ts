import { Controller, Get, Post, Put, Body, Delete, Param,UsePipes, ValidationPipe  } from '@nestjs/common';
import { UserService } from './user.service'; 
import { Userdata } from 'src/entities/userdata.entity';
import { DeleteResult, InsertResult } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class UserController {
    constructor(private readonly userService: UserService) {}

    // 全ユーザー取得
    @Get()
    root(): Promise<Userdata[]> {
        return this.userService.getAll()
    }

    // 新規ユーザー追加
    @Post()
    async add(@Body() data: Partial<Userdata>) :Promise<Userdata> {
        return this.userService.create(data)
    }

    // 指定IDの削除
    @Delete(':id')
    async remove(@Param('id') id:string): Promise<{message: string}> {
        const numericId=parseInt(id, 10);
        await this.userService.remove(numericId);
        return { message: `User with id=${numericId} has been deleted`};
    }

    // ユーザー情報更新
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body()　updaeUserDto: UpdateUserDto,
    ): Promise<Userdata> {
        return this.userService.update(+id, updaeUserDto);
    }
    


}
