import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, Length, IsNotEmpty, IsOptional } from 'class-validator';

//Class som sätter egenskaper för att uppdatera. I det här fallet för den att lösenord är valfritt
export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsOptional()
    @IsString()
    @Length(6, 200)
    @IsNotEmpty()
    password: string;

}
