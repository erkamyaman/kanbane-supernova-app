/* eslint-disable @typescript-eslint/no-unsafe-call */
import { MinLength } from 'class-validator';

export class CreateColumnDto {
    id: string;

    @MinLength(3)
    title: string;

    icon?: string;

    iconColor?: string;
}
