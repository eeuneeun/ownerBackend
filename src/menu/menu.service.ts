import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private MenuRepo: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const menu = await this.MenuRepo.create({
      ...createMenuDto,
      store: { id: Number(createMenuDto.storeId) },
    });
    return this.MenuRepo.save(menu);
  }

  async findAll(storeId: number): Promise<Menu[]> {
    const result = await this.MenuRepo.find({
      where: { store: { id: storeId } },
    });
    return result;
  }

  async findOne(id: number): Promise<Menu | null> {
    const result = await this.MenuRepo.findOne({ where: { id: id } });
    return result;
  }

  async update(
    id: number,
    updateMenuDto: UpdateMenuDto,
  ): Promise<{ message: string }> {
    const result = await this.MenuRepo.update(id, updateMenuDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Menu with id ${id} not found`);
    }
    return { message: `Menu ${id} updated` };
  }

  async remove(id: number): Promise<any> {
    const result = await this.MenuRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Menu with id ${id} not found`);
    }
    return { message: `Menu ${id} updated` };
  }
}
