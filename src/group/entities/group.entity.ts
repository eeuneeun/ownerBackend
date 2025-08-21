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

  // ✅ 다대다 관계
  @ManyToMany(() => Option, (option) => option.groups, { cascade: true })
  @JoinTable({
    name: 'group_options', // 중간 테이블 이름
    joinColumn: { name: 'group_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'option_id', referencedColumnName: 'id' },
  })
  options: Option[];
}
