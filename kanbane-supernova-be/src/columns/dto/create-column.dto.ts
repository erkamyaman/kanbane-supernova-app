/* eslint-disable @typescript-eslint/no-unsafe-call */
import { MinLength } from 'class-validator';

export class CreateColumnDto {
    @MinLength(3)
    title: string;

    icon?: string;

    iconColor?: string;
}
