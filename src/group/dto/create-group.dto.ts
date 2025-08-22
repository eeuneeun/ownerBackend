import { Type } from 'class-transformer';
import { IsArray, IsInt, ValidateNested } from 'class-validator';

export class CreateGroupDto {
  name: string;
  desc: string;
}

class OptionDto {
  @IsInt()
  id: number;
}

export class AddOptionsDto {
  @IsInt()
  groupId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Number)
  options: number[];
}
