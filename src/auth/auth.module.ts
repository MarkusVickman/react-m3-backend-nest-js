import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

//Sammanställer och exporterar min crud user med endpoint /auth till en modul 
//som används i app.module-filen för att köra när appen startar
// ConfigModule används för åtkomst av .env och jwtmodulen registreras med "säkerhetskod" och expire-inställningar
@Module({
  imports: [
    ConfigModule.forRoot(), UserModule, JwtModule.register({
      global: true,
      secret: process.env.JWT_CONSTANTS,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }