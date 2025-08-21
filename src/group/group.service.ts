import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entities/group.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { Option } from 'src/option/entities/option.entity';
@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private groupRepo: Repository<Group>,
    @InjectRepository(Menu) private menuRepo: Repository<Menu>,
    @InjectRepository(Option) private optionRepo: Repository<Option>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = this.groupRepo.create({
      ...createGroupDto,
    });

    return this.groupRepo.save(group);
  }

  async findAll() {
    return this.groupRepo.find();
  }

  async findOne(id: number) {
    return this.groupRepo.find({
      where: { id: id },
    });
  }

  // 미작업
  async update(id: number, updateGroupDto) {
    return this.groupRepo.find({
      where: { id: id },
    });
  }

  async remove(id: number) {
    return this.groupRepo.delete(id);
  }

  async addOption(groupId: number, optionId: number) {
    const group = await this.groupRepo.findOne({
      where: { id: groupId },
      relations: ['option'],
    });
    if (!group) throw new Error('Group not found');

    const option = await this.optionRepo.findOneBy({ id: optionId });
    if (!option) throw new Error('Option not found');

    group.options.push(option);
    return this.groupRepo.save(group);
  }
}
