import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DiscModule } from './disc/disc.module';
import { AuthModule } from './auth/auth.module';

//Huvudmodul som importerar övriga moduler. ConfigModule används för åtkomst av .env
@Module({
  imports: [ConfigModule.forRoot(), UserModule, DiscModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
