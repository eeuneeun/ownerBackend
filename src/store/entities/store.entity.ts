import { Menu } from 'src/menu/entities/menu.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  postNum: string;

  @Column()
  tel: string;

  @Column()
  businessNum: string;

  @Column()
  desc: string;

  @Column()
  imgUrl: string;

  // ✅ 여러 Store가 1명의 User(주인)를 가질 수 있음
  @ManyToOne(() => User, (user) => user.stores, { onDelete: 'CASCADE' })
  owner: User;

  // ✅ 1:N 관계
  @OneToMany(() => Menu, (menu) => menu.store, { cascade: true })
  menus: Menu[];
}
