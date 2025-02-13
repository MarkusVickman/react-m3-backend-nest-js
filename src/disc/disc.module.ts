import { Module } from '@nestjs/common';
import { DiscService } from './disc.service';
import { DiscController } from './disc.controller';
import { discProviders } from './disc.providers';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/user/user.providers';

//Sammanställer och exporterar min crud user med endpoint /user till en modul 
//som används i app.module-filen för att köra när appen startar
@Module({
  imports: [DatabaseModule],
  controllers: [DiscController],
  providers: [...discProviders, ...userProviders, DiscService],
})
export class DiscModule {}
