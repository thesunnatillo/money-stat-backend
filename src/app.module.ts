import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '@config/database.config';
import { configScheme } from '@config/config.scheme';
import { DataSource } from 'typeorm';

import jwtConfig from './config/jwt.config';
import { UsersModule } from './modules/user/users.module';
import { AdminModule } from './modules/admin/admin.module';
import { AppDataSource } from './database/data.source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
      envFilePath: ['../.env'],
      validationSchema: configScheme,
    }),
    AdminModule,
    UsersModule,
  ],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {

        const logger = new Logger(AppModule.name)

        try {

          if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
          }

          logger.log('Data source has been initialized');

          return AppDataSource;
        } catch (error) {
          logger.error('Error during Data Source initialization', error);
          process.exit();
        }
      },
    },
  ],
})
export class AppModule {}
