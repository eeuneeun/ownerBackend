import { Store } from 'src/store/entities/store.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  email: string;

  // ✅ N:N 중간 테이블
  @OneToMany(() => Store, (stores) => stores.owner, { cascade: true })
  stores: Store[];
}
