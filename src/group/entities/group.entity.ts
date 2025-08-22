import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Menu } from 'src/menu/entities/menu.entity';
import { Option } from 'src/option/entities/option.entity';
import { MenuGroup } from './menuGroup.entity';
import { GroupOption } from './groupOption.entity';
@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // 그룹 이름 (예: 사이즈, 소스 선택)

  @Column()
  desc: string;

  // ✅ N:N 중간 테이블
  @OneToMany(() => MenuGroup, (menuGroup) => menuGroup.group)
  menuGroups: MenuGroup[];

  // 기존: @ManyToMany(() => Option, ...)
  // 변경 후: 중간 엔티티와 연결
  @OneToMany(() => GroupOption, (groupOption) => groupOption.group)
  groupOptions: GroupOption[];
}
