import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { AddGroupToMenuDto, UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { Group } from 'src/group/entities/group.entity';
import { MenuGroup } from 'src/group/entities/menuGroup.entity';
import { group } from 'console';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepo: Repository<Menu>,

    @InjectRepository(Group)
    private readonly groupRepo: Repository<Group>,

    @InjectRepository(MenuGroup)
    private readonly menuGroupRepo: Repository<MenuGroup>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const menu = await this.menuRepo.create({
      ...createMenuDto,
      store: { id: Number(createMenuDto.storeId) },
    });
    return this.menuRepo.save(menu);
  }

  async addGroupToMenu(addGroupToMenu: AddGroupToMenuDto) {
    // const menu = await this.menuRepo.findOne({
    //   where: { id: addGroupToMenu.menuId },
    // });
    // if (!menu) throw new NotFoundException('Menu not found');

    // const group = await this.groupRepo.findOne({
    //   where: { id: addGroupToMenu.groupId },
    // });
    // if (!group) throw new NotFoundException('Menu not found');

    const menuGroup = await this.menuGroupRepo.create({
      menu: { id: addGroupToMenu.menuId },
      group: { id: addGroupToMenu.groupId },
      priority: 0,
      isRequired: false,
    });

    return await this.menuGroupRepo.save(menuGroup);
  }

  async findAll(storeId: number): Promise<Menu[]> {
    const result = await this.menuRepo.find({
      where: { store: { id: storeId } },
      relations: ['menuGroups', 'menuGroups.group'],
    });
    return result;
  }

  async findOne(id: number, storeId: number): Promise<Menu | null> {
    const result = await this.menuRepo.findOne({
      where: { id: id, store: { id: storeId } },
      relations: [
        'menuGroups',
        'menuGroups.group',
        'menuGroups.group.groupOptions',
        'menuGroups.group.groupOptions.option',
      ],
    });
    return result;
  }

  async update(
    id: number,
    updateMenuDto: UpdateMenuDto,
  ): Promise<{ message: string }> {
    const result = await this.menuRepo.update(id, updateMenuDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Menu with id ${id} not found`);
    }
    return { message: `Menu ${id} updated` };
  }

  async remove(id: number): Promise<any> {
    const result = await this.menuRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Menu with id ${id} not found`);
    }
    return { message: `Menu ${id} updated` };
  }

  async deleteGroupFromMenu(id: number, groupId: number): Promise<any> {
    const result = await this.menuGroupRepo.delete({
      menu: { id: id },
      group: { id: groupId },
    });
  }
}
