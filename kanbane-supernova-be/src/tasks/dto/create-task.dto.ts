/* eslint-disable @typescript-eslint/no-unsafe-call */
import { MinLength, IsOptional, IsUrl } from 'class-validator';

export class CreateTaskDto {
  @MinLength(5)
  title: string;

  @MinLength(100)
  definition: string;

  @IsOptional()
  @IsUrl()
  link?: string;
}

// { id: 'p-001', name: 'Black Watch', columnId: '1' },
