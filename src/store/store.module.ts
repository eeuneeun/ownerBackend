import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { OwnerStore } from './entities/store.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerUser } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OwnerStore, OwnerUser])],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
