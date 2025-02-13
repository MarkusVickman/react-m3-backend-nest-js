import { DataSource } from 'typeorm';
import { Disc } from './entities/disc.entity';

//skapar Disc repository med hjälp av import modulen DataSource från typeorm
//Exporterar en datasource med hjälp av classen/schemat Disc
export const discProviders = [
  {
    provide: 'DISC_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Disc),
    inject: ['DATA_SOURCE'],
  },
];