import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { Column } from 'typeorm';
export class CreateMenuDto {
  @Type(() => Number) // string → number 변환
  @IsInt()
  storeId: number;
  category: string;
  name: string;
  desc: string;
  @Column({ type: 'decimal', precision: 10, scale: 0, default: 0 })
  price: number;
  imgUrl: string;
}
