import { MinLength, IsOptional, IsUrl, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class LabelDto {
  id: string;
  name: string;
  color: string;
}

export class CreateTaskDto {
  @MinLength(5)
  name: string;

  columnId: string;

  @MinLength(50)
  definition: string;

  @IsOptional()
  @IsUrl()
  links: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LabelDto)
  labels: LabelDto[];
}
