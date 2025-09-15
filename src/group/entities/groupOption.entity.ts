import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OwnerGroup } from './group.entity';
import { OwnerOption } from 'src/option/entities/option.entity';

@Entity()
export class OwnerGroupOption {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OwnerGroup, (group) => group.groupOptions)
  group: OwnerGroup;

  @ManyToOne(() => OwnerOption, (option) => option.groupOptions)
  option: OwnerOption;

  @Column({ default: 1 })
  quantity: number; // 옵션 중복 시 수량 관리 가능
}
