import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { AddOptionsDto, CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entities/group.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { Option } from 'src/option/entities/option.entity';
import { GroupOption } from './entities/groupOption.entity';
@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private groupRepo: Repository<Group>,
    @InjectRepository(Menu) private menuRepo: Repository<Menu>,
    @InjectRepository(Option) private optionRepo: Repository<Option>,
    @InjectRepository(GroupOption)
    private groupOptionRepo: Repository<GroupOption>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = this.groupRepo.create({
      ...createGroupDto,
    });

    return this.groupRepo.save(group);
  }

  async findAll() {
    return this.groupRepo.find({
      relations: ['groupOptions', 'groupOptions.option'],
    });
  }

  async findOne(id: number) {
    return this.groupRepo.findOne({
      where: { id: id },
      relations: ['groupOptions', 'groupOptions.option'],
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
    // const group = await this.groupRepo.findOne({
    //   where: { id: groupId },
    //   relations: ['option'],
    // });
    // if (!group) throw new Error('Group not found');
    // const option = await this.optionRepo.findOneBy({ id: optionId });
    // if (!option) throw new Error('Option not found');
    // // group.option.push(option);
    // return this.groupRepo.save(group);
  }

  /** 그룹에 여러 옵션 추가 (중복 허용) */
  async addOptions(dto: AddOptionsDto) {
    const group = await this.groupRepo.findOne({
      where: { id: dto.groupId },
      relations: ['groupOptions'],
    });
    if (!group) throw new NotFoundException('Group not found');

    for (const optionId of dto.options) {
      const option = await this.optionRepo.findOne({ where: { id: optionId } });
      if (!option) throw new NotFoundException(`Option ${optionId} not found`);

      // 이미 GroupOption 존재 시 quantity 증가
      let groupOption = await this.groupOptionRepo.findOne({
        where: { group: { id: group.id }, option: { id: option.id } },
        relations: ['group', 'option'],
      });

      if (groupOption) {
        groupOption.quantity += 1;
      } else {
        groupOption = this.groupOptionRepo.create({
          group,
          option,
          quantity: 1,
        });
      }

      await this.groupOptionRepo.save(groupOption);
    }
  }
}
