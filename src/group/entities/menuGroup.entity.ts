import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OwnerMenu } from 'src/menu/entities/menu.entity';
import { OwnerGroup } from './group.entity';

@Entity()
export class OwnerMenuGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OwnerMenu, (menu) => menu.menuGroups, {
    onDelete: 'CASCADE',
  })
  menu: OwnerMenu;

  @ManyToOne(() => OwnerGroup, (group) => group.menuGroups, {
    onDelete: 'CASCADE',
  })
  group: OwnerGroup;

  // 추가 속성
  @Column({ default: 0 })
  priority: number;

  @Column({ default: false })
  isRequired: boolean;
}
