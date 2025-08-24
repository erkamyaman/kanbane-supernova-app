/* eslint-disable @typescript-eslint/no-unsafe-call */
import { MinLength, IsOptional, IsUrl } from 'class-validator';

export class CreateTaskDto {
  @MinLength(5)
  name: string;

  columnId: string;

  @MinLength(50)
  definition: string;

  @IsOptional()
  @IsUrl()
  link?: string;
}

