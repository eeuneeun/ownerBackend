import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Group } from 'src/group/entities/group.entity';
import { MenuGroup } from 'src/group/entities/menuGroup.entity';
import { Store } from 'src/store/entities/store.entity';
@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  name: string; // 메뉴 이름

  @Column()
  desc: string; // 메뉴 설명

  @Column({ type: 'decimal', precision: 10, scale: 0, default: 0 })
  price: number; // 기본 가격

  @Column()
  imgUrl: string; // 메뉴 이미지 주소

  // ✅ 상점 : N:1 관계
  @ManyToOne(() => Store, (store) => store.menus, {
    onDelete: 'CASCADE', // store 삭제되면 menu도 삭제됨
  })
  @JoinColumn({ name: 'storeId' }) // FK 컬럼과 매핑
  store: Store;

  // ✅ 추가 옵션 그룹 : N:N 중간 테이블
  @OneToMany(() => MenuGroup, (menuGroup) => menuGroup.menu)
  menuGroups: MenuGroup[];
}
