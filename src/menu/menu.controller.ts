import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { AddGroupToMenuDto, UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Post('/group')
  addGroupToMenu(@Body() addGroupToMenuDto: AddGroupToMenuDto) {
    return this.menuService.addGroupToMenu(addGroupToMenuDto);
  }

  @Get('/store/:storeId')
  findAll(@Param('storeId') storeId: number) {
    return this.menuService.findAll(storeId);
  }

  @Get('/category/:category')
  findCategoryAll(@Param('category') category: string) {
    return this.menuService.findAll(category);
  }

  @Get('/:id/store/:storeId')
  findOne(@Param('id') id: number, @Param('storeId') storeId: number) {
    return this.menuService.findOne(id, storeId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }

  @Delete(':id/group/:groupId')
  deleteGroupFromMenu(
    @Param('id') id: number,
    @Param('groupId') groupId: number,
  ) {
    return this.menuService.deleteGroupFromMenu(+id, +groupId);
  }
}
