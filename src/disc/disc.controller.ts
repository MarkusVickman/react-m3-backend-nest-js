import { Controller, Get, Post, Body, Put, Param, Delete, ClassSerializerInterceptor, Request, UseInterceptors } from '@nestjs/common';
import { DiscService } from './disc.service';
import { CreateDiscDto } from './dto/create-disc.dto';
import { UpdateDiscDto } from './dto/update-disc.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../common/current-user.decorator'; // Importera den anpassade dekoratören

//Controller för CRUD för rounten /disc
@Controller('blog')
export class DiscController {
  constructor(private readonly discService: DiscService) { }

  //Alla postanrop till /disc/create initierar create-metoden i disc.service. Body parametrar skickas med som argument enligt CreateDiscDto-classen

  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('create')
  create(@Body() createDiscDto: CreateDiscDto, @Request() req) {
    return this.discService.create(createDiscDto, req.user);
  }

  //Alla getanrop till /disc initierar findAll-metoden i disc.service.
  @Get()
  findAll() {
    return this.discService.findAll();
  }

  //Alla getanrop till /disc initierar findAll-metoden i disc.service.
  @Get('user')
  findUserSpecific(@Request() req) {
    return this.discService.findUserSpecific(req.user);
  }

  //Alla getanrop till /disc/id initierar findOne-metoden i disc.service. Id skickas med som "adressrads"-parameter skickas med som argument
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.discService.findOne(+id);
  }

  //Alla putanrop till /disc/update/id initierar update-metoden i disc.service. Body parametrar skickas med som argument enligt UpdateDiscDto-classen. Id skickas med som "adressrads"-parameter skickas med som argument
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put('update/:id')
  update(@Param('id') id: string, @Body() createDiscDto: UpdateDiscDto, @Request() req) {
    return this.discService.update(+id, createDiscDto, req.user);
  }

  //Alla deleteanrop till /disc/delete/id initierar delete-metoden i disc.service. Id skickas med som "adressrads"-parameter skickas med som argument
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('delete/:id')
  remove(@Param('id') id: string, @Request() req) {
    return this.discService.remove(+id, req.user);
  }
}
