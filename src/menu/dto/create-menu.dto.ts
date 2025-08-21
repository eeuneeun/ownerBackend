import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateMenuDto {
  @Type(() => Number) // string → number 변환
  @IsInt()
  storeId: number;
  category: string;
  name: string;
  desc: string;
  price: number;
  imgUrl: string;
}
