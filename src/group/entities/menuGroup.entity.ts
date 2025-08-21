import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Menu } from 'src/menu/entities/menu.entity';
import { Group } from './group.entity';

@Entity()
export class MenuGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Menu, (menu) => menu.menuGroups, { onDelete: 'CASCADE' })
  menu: Menu;

  @ManyToOne(() => Group, (group) => group.menuGroups, { onDelete: 'CASCADE' })
  group: Group;

  // 추가 속성
  @Column({ default: 0 })
  priority: number;

  @Column({ default: false })
  isRequired: boolean;
}
