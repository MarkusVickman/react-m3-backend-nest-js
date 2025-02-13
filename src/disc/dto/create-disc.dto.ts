import { IsString, IsInt, IsOptional, Length, IsNotEmpty, IsEmail } from 'class-validator';

//En Dto för att kontrollera/validerar inmatningar med post och i en partial class för put
//Denna är viktig för att data som lagras är av correkt typ eller längd enligt specifikationen nedan
//Denna klass använde Class-validator och vilkoren används även för att hjälpa min felhantering.

export class CreateDiscDto {

    @IsString()
    @Length(1, 100)
    @IsNotEmpty()
    heading: string;

    @IsString()
    @Length(5, 10000)
    @IsNotEmpty()
    about: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;
}
