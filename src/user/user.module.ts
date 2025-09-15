import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { OwnerUser } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OwnerUser])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
