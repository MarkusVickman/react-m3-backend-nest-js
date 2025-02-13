import { Controller, Get, Post, Body, Put, Param, Delete, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

//Controller för CRUD för rounten /user
//@UseInterceptors(ClassSerializerInterceptor) används på routse för att inte returnera password. Styrs från user.entity filen
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  //Alla postanrop till /user/create initierar create-metoden i user.service. Body parametrar skickas med som argument enligt CreateUserDto-classen

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  //Alla getanrop till /user initierar findAll-metoden i user.service.
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  //Alla getanrop till /user/email initierar findOne-metoden i user.service. Email skickas med som "adressrads"-parameter skickas med som argument
  @Get('/:email')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('email') email: string) {
    return this.userService.findOne(email);
  }

  //Alla putanrop till /user/email initierar update-metoden i user.service. Body parametrar skickas med som argument enligt UpdateUserDto-classen. Email skickas med som "adressrads"-parameter skickas med som argument
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put('/:email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(email, updateUserDto);
  }

  //Alla deleteanrop till /user/email initierar remote-metoden i user.service. Email skickas med som "adressrads"-parameter skickas med som argument
  @UseGuards(AuthGuard)
  @Delete('/:email')
  remove(@Param('email') email: string) {
    return this.userService.remove(email);
  }
}
