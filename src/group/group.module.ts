import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { OwnerGroup } from './entities/group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerOption } from 'src/option/entities/option.entity';
import { OwnerMenu } from 'src/menu/entities/menu.entity';
import { OwnerGroupOption } from './entities/groupOption.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OwnerGroup,
      OwnerOption,
      OwnerMenu,
      OwnerGroupOption,
    ]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
