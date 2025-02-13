
import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

//Modul som importerar databasanslutningen och exporterar classen som en modul
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule { }
