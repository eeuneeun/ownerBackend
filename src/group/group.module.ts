import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { Group } from './entities/group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from 'src/option/entities/option.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { GroupOption } from './entities/groupOption.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Option, Menu, GroupOption])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
