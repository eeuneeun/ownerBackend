import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Group } from 'src/group/entities/group.entity';
import { GroupOption } from 'src/group/entities/groupOption.entity';
@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // 옵션 이름 (예: Large, 치즈 추가, 매운맛)

  @Column({ type: 'decimal', precision: 10, scale: 0, default: 0 })
  price: number; // 추가 금액

  @Column({ nullable: true })
  desc: string;

  @Column({ nullable: true })
  imgUrl: string;

  // 기존: @ManyToMany(() => Option, ...)
  // 변경 후: 중간 엔티티와 연결
  @OneToMany(() => GroupOption, (groupOption) => groupOption.option)
  groupOptions: GroupOption[];
}
