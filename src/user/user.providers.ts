
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

//skapar User repository med hjälp av import modulen DataSource från typeorm
//Exporterar en datasource med hjälp av classen/schemat User 
export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];