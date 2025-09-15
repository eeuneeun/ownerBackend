import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerOption } from './entities/option.entity';
import { OwnerGroup } from 'src/group/entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OwnerOption, OwnerGroup])],

  controllers: [OptionController],
  providers: [OptionService],
})
export class OptionModule {}
