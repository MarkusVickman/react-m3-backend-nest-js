
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, ClassSerializerInterceptor, UseInterceptors  } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

//Controller för CRUD för rounten /auth
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  //rout för att logga in användare 
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  //Route som returnerar information om vem som är inloggad
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}