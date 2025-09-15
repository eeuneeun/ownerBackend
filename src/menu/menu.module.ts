import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerMenu } from './entities/menu.entity';
import { OwnerGroup } from 'src/group/entities/group.entity';
import { OwnerMenuGroup } from 'src/group/entities/menuGroup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OwnerMenu, OwnerGroup, OwnerMenuGroup])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
