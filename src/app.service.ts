import { Injectable } from '@nestjs/common';

//class som innehåller svar för routes i app.controller
@Injectable()
export class AppService {
  getHello(): string {
    return '<h1>Välkommen till Discgolf-grossistens API. Testa endpoint /disc med Get istället för att läsa ut vårat lager av discar.<h1>';
  }
}
