import { PartialType } from '@nestjs/mapped-types';
import { CreateDiscDto } from './create-disc.dto';
import { IsString, IsInt, IsOptional, Length, IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateDiscDto extends PartialType(CreateDiscDto) {

}
