import { IsString, Length, IsNotEmpty, IsEmail } from 'class-validator';

//En Dto för att kontrollera/validerar inmatningar med post och i en partial class för put
//Denna är viktig för att data som lagras är av correkt typ eller längd enligt specifikationen nedan
//Denna klass använde Class-validator och vilkoren används även för att hjälpa min felhantering.
export class CreateUserDto {

    @IsEmail()
    @Length(6, 200)
    @IsNotEmpty()
    email: string;

    @IsString()
    @Length(4, 200)
    @IsNotEmpty()
    name: string;

    @IsString()
    @Length(6, 200)
    @IsNotEmpty()
    password: string;
}
