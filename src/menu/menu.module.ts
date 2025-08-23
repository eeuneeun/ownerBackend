import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Group } from 'src/group/entities/group.entity';
import { MenuGroup } from 'src/group/entities/menuGroup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, Group, MenuGroup])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
