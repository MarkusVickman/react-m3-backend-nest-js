import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { DiscService } from './disc.service';
import { CreateDiscDto } from './dto/create-disc.dto';
import { UpdateDiscDto } from './dto/update-disc.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';


//Controller för CRUD för rounten /disc
@Controller('blog')
export class DiscController {
  constructor(private readonly discService: DiscService) { }

  //Alla postanrop till /disc/create initierar create-metoden i disc.service. Body parametrar skickas med som argument enligt CreateDiscDto-classen

  @UseGuards(AuthGuard)
  @Post('create')
  create(@Body() createDiscDto: CreateDiscDto) {
    return this.discService.create(createDiscDto);
  }

  //Alla getanrop till /disc initierar findAll-metoden i disc.service.
  @Get()
  findAll() {
    return this.discService.findAll();
  }

  //Alla getanrop till /disc/id initierar findOne-metoden i disc.service. Id skickas med som "adressrads"-parameter skickas med som argument
  @UseGuards(AuthGuard)
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.discService.findOne(+id);
  }

  //Alla putanrop till /disc/update/id initierar update-metoden i disc.service. Body parametrar skickas med som argument enligt UpdateDiscDto-classen. Id skickas med som "adressrads"-parameter skickas med som argument
  @UseGuards(AuthGuard)
  @Put('update/:id')
  update(@Param('id') id: string, @Body() createDiscDto: UpdateDiscDto) {
    return this.discService.update(+id, createDiscDto);
  }

  //Alla deleteanrop till /disc/delete/id initierar delete-metoden i disc.service. Id skickas med som "adressrads"-parameter skickas med som argument
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.discService.remove(+id);
  }
}
