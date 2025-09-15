import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OwnerOption } from './entities/option.entity';
import { OwnerGroup } from 'src/group/entities/group.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(OwnerOption) private optionRepo: Repository<OwnerOption>,
    @InjectRepository(OwnerGroup) private groupRepo: Repository<OwnerGroup>,
  ) {}

  async create(createOptionDto) {
    const option = this.optionRepo.create({ ...createOptionDto });
    return this.optionRepo.save(option);
  }

  async findAll(): Promise<OwnerOption[]> {
    const result = await this.optionRepo.find();
    return result;
  }

  async remove(id: number) {
    return this.optionRepo.delete(id);
  }
}
