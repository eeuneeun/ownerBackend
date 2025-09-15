import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { OwnerMenu } from 'src/menu/entities/menu.entity';
import { OwnerOption } from 'src/option/entities/option.entity';
import { OwnerMenuGroup } from './menuGroup.entity';
import { OwnerGroupOption } from './groupOption.entity';
@Entity()
export class OwnerGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // 그룹 이름 (예: 사이즈, 소스 선택)

  @Column()
  desc: string;

  // ✅ N:N 중간 테이블
  @OneToMany(() => OwnerMenuGroup, (menuGroup) => menuGroup.group)
  menuGroups: OwnerMenuGroup[];

  // 기존: @ManyToMany(() => OwnerOption, ...)
  // 변경 후: 중간 엔티티와 연결
  @OneToMany(() => OwnerGroupOption, (groupOption) => groupOption.group)
  groupOptions: OwnerGroupOption[];
}
