import { OwnerStore } from 'src/store/entities/store.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class OwnerUser {
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
  @OneToMany(() => OwnerStore, (stores) => stores.owner, { cascade: true })
  stores: OwnerStore[];
}
