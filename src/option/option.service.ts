import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './entities/option.entity';
import { Group } from 'src/group/entities/group.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option) private optionRepo: Repository<Option>,
    @InjectRepository(Group) private groupRepo: Repository<Group>,
  ) {}

  async create(createOptionDto) {
    const option = this.optionRepo.create({ ...createOptionDto });
    return this.optionRepo.save(option);
  }

  async findAll(): Promise<Option[]> {
    const result = await this.optionRepo.find();
    return result;
  }

  async remove(id: number) {
    return this.optionRepo.delete(id);
  }
}
