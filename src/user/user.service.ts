import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
const saltRounds = 10;

//Klass med metoder för att kontakta databasen och returnera svar.
//Felkoder och kontroller av inmatade fälld görs här genom .dto.ts-classerna. Felkoderna skapas delvis automatiskt av import modulen NotFoundException.
@Injectable()
export class UserService {

  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) { }

  //metod för att skapa ny användare. Lösenordet hashas med bcrypt och användaren sparas sedan om email inte redan finns.
  async create(user: CreateUserDto): Promise<boolean> {

    user.password = await bcrypt.hash(user.password, saltRounds);
    let email = user.email;
    let check = await this.userRepository.findOne({ where: { email } });

    //Om kontot redan finns return false
    if (check) {
      return false;
    } else {
      //Skapar ett objekt med alla variabler och sparar in objeket i databasen
      const response = this.userRepository.save(this.userRepository.create(user));
      //Vid fel skickas ett felmeddelande som svar istället
      if (!response) { throw new NotFoundException('POST: Create new user failed..'); }
      return true;
    }
  }

  //Metod för att hämta alla användare och ruturnera dem.
  async findAll(): Promise<User[]> {
    //Hämtar object från databasen
    let response = await this.userRepository.find();
    //Vid fel skickas ett felmeddelande som svar istället
    if (!response) { throw new NotFoundException('GET: Find all failed.'); }
    return response;
  }

  //Metod för att hitta en användare med dess mail
  async findOne(email: string): Promise<User> {

    let response = await this.userRepository.findOne({ where: { email } });

    //Vid fel skickas ett felmeddelande som svar istället
    if (!response) { throw new NotFoundException('GET: Find one failed.'); }
    return response;
  }

  //Metod för att hitta en användare med dess mail och uppdatera denna
  async update(email: string, user: UpdateUserDto): Promise<User> {

    //om lösenordet skickas med hashas det innan det sparas
    if (user.password) {
      user.password = await bcrypt.hash(user.password, saltRounds);
    }

    //Uppdaterar ett objekt 
    const response = await this.userRepository.findOne({ where: { email } });
    //Vid fel skickas ett felmeddelande som svar istället
    if (!response) { throw new NotFoundException('PUT: Update failed.'); }
    return await this.userRepository.save(Object.assign(response, user));
  }

  //Metod för att hitta och ta bort en användare med dess mail
  async remove(email: string): Promise<string> {
    // skickar felmeddelande om användare inte finns
    if (!await this.userRepository.findOne({ where: { email } })) {
      throw new NotFoundException('DELETE: delete failed.');
    }
    //Tar bort valt id
    this.userRepository.delete(email);
    return `Delete ${email} completed`;
  }
}