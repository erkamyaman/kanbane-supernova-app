import { MinLength, IsOptional } from 'class-validator';

export class CreateLabelDto {
    @MinLength(2)
    label: string;

    @MinLength(2)
    value: string;

    color: string;

    @IsOptional()
    icon?: string;
}
