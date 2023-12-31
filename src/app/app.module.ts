import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';

import { DeviceTypesModule } from '../device-types/device-types.module';
import { DeviceTypes } from '../device-types/entities/device-types.entity';
import { HttpExceptionFilter } from '../config/http-exception.filter';
import { LoggerMiddleware } from '../config/logger.middleware';
import { Devices } from '../devices/entities/devices.entity';
import { DevicesModule } from '../devices/devices.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from 'src/config/type-orm.config';

@Module({
  imports: [
    DevicesModule,
    DeviceTypesModule,
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService  } ),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
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
