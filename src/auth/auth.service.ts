
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

//Klass med metoder för att kontakta databasen och returnera svar. Inloggning kontrolleras med userService
//Felkoderna skapas delvis automatiskt av import modulen NotFoundException.
@Injectable()
export class AuthService {
  constructor(private userService: UserService,
    private jwtService: JwtService
  ) { }

  //Metod för att logga in med email och lösenord. Svaret blir en jwt-token som används för att visa vem användaren är och att den är inloggad.
  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(email);

    //testar om lösenordet matchar
    const isMatch = await bcrypt.compare(pass, user.password);

    //om fel lösenord skickas ett felmeddelande
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    //skapar en payload till jwt token som returneras till användaren.
    const payload = { email: user.email, name: user.name, isAdmin: user.isAdmin };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}