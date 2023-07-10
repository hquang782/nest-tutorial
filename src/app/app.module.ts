import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';

import { DeviceTypesModule } from '../models/device-types/device-types.module';
import { DeviceTypes } from '../models/device-types/entity/device-types.entity';
import { DevicesModule } from '../models/devices/devices.module';
import { HttpExceptionFilter } from '../config/http-exception.filter';
import { Devices } from '../models/devices/entity/devices.entity';
import { LoggerMiddleware } from '../config/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DevicesModule, DeviceTypesModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Devices, DeviceTypes],
      synchronize: true,
    } as TypeOrmModuleOptions),
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('hello');
  }
}