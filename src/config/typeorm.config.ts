import { TypeOrmModuleOptions} from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions  = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'R@d@d32493',
    database: 'taskmanagement',
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: true, // for production set to false to prevent unauthorized syncing of entities

};
