import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userdata } from 'src/entities/userdata.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Userdata])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
