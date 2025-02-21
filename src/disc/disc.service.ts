import { Injectable, Inject, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateDiscDto } from './dto/create-disc.dto';
import { UpdateDiscDto } from './dto/update-disc.dto';
import { Disc } from './entities/disc.entity';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { CurrentUser } from '../common/current-user.decorator'; // Importera den anpassade dekoratören

//Klass med metoder för att kontakta databasen och returnera svar.
//Felkoder och kontroller av inmatade fälld görs här genom .dto.ts-classerna. Felkoderna skapas delvis automatiskt av import modulen NotFoundException.
@Injectable()
export class DiscService {

  constructor(
    @Inject('DISC_REPOSITORY')
    private discRepository: Repository<Disc>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) { }

  // Metod för att skapa ett nytt discinlägg
  async create(discDto: CreateDiscDto, @CurrentUser() user): Promise<Disc> {
    // Hämta användaren baserat på e-postadress
    //const user = await this.userRepository.findOne({ where: { email: discDto.email } });

    const email = user.email; // Hämta e-postadressen från JWT-payload

    if (!email) {
      throw new NotFoundException(`User with email ${user.email} not found`);
    }

    // Skapa och spara den nya Disc-posten
    const disc = this.discRepository.create({
      heading: discDto.heading,
      about: discDto.about,
      email: user.email,
    });

    const response = await this.discRepository.save(disc);

    if (!response) {
      throw new NotFoundException('POST: Create new post failed..');
    }

    return response;
  }

  //Metod för att hämta alla discar
  async findAll(): Promise<Disc[]> {

  // Hämta object från databasen och inkludera användarnamn
  const response = await this.discRepository.createQueryBuilder('disc')
    .leftJoinAndSelect('disc.user', 'user', 'user.email = disc.email') // Specificera join-villkor
    .select(['disc.id as id', 'disc.heading as heading', 'disc.date as date', 'disc.about as about', 'disc.email as email', 'user.name as name']) // Välj nödvändiga fält
    .getRawMany();

    //Hämtar object från databasen
    //let response = await this.discRepository.find();
    //Vid fel skickas ett felmeddelande som svar istället
    if (!response) { throw new NotFoundException('GET: Find all failed.'); }
    return response;
  }

  //Metod för att hitta och returnera en disc med dess id
  async findUserSpecific(@CurrentUser() user): Promise<Disc[]> {
    console.log(user.email)
    // Hämta objekt från databasen
    const response = await this.discRepository.find({ where: { email: user.email } });

    // Vid fel skickas ett felmeddelande som svar istället
    if (!response || response.length === 0) {
      throw new NotFoundException('GET: Find user-specific posts failed.');
    }
    return response;
  }

  //Metod för att hitta och returnera en disc med dess id
  async findOne(id: number): Promise<Disc> {
    //Hämtar object från databasen
    let response = await this.discRepository.findOne({ where: { id } });
    //Vid fel skickas ett felmeddelande som svar istället
    if (!response) { throw new NotFoundException('GET: Find one failed.'); }
    return response;
  }

  //Metod för att hitta och uppdatera en disc med dess id
  async update(id: number, message: UpdateDiscDto, @CurrentUser() user): Promise<Disc> {
    //Uppdaterar ett objekt 
    const response = await this.discRepository.findOne({ where: { id } });

    if (response.email !== user.email && user.isAdmin === false) {
      throw new ForbiddenException('Permission denied! wrong email');
    }

    //Vid fel skickas ett felmeddelande som svar istället
    if (!response) { throw new NotFoundException('PUT: Update failed.'); }
    return await this.discRepository.save(Object.assign(response, message));
  }

  //Metod för att hitta och ta bort en disc med dess id
  async remove(id: number, @CurrentUser() user): Promise<string> {

    // Hämta användaren baserat på e-postadress
    const disc = await this.discRepository.findOne({ where: { id } });

    if(disc.email !== user.email && user.isAdmin === false) {
      throw new ForbiddenException('Permission denied! wrong email');
    }

    // skickar felmeddelande om objekt inte finns
    if (!await this.discRepository.findOne({ where: { id } })) {
      throw new NotFoundException('DELETE: delete failed.');
    }
    //Tar bort valt id
    this.discRepository.delete(id);
    return `Delete ${id} completed`;
  }
}
