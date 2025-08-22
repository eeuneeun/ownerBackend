import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './group.entity';
import { Option } from 'src/option/entities/option.entity';

@Entity()
export class GroupOption {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Group, (group) => group.groupOptions)
  group: Group;

  @ManyToOne(() => Option, (option) => option.groupOptions)
  option: Option;

  @Column({ default: 1 })
  quantity: number; // 옵션 중복 시 수량 관리 가능
}
