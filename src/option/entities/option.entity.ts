import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { Group } from 'src/group/entities/group.entity';
@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // 옵션 이름 (예: Large, 치즈 추가, 매운맛)

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number; // 추가 금액

  @Column({ nullable: true })
  desc: string;

  @Column({ nullable: true })
  imgUrl: string;

  @ManyToMany(() => Group, (group) => group.options, { onDelete: 'CASCADE' })
  groups: Group;
}
