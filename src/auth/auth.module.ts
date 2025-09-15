import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerUser } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OwnerUser])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
