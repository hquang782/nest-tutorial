import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './logger.middleware';
import { HttpExceptionFilter } from './http-exception.filter';
import { DevicesModule } from './models/devices/devices.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Devices } from './models/devices/devices.entity';
import { DeviceTypes } from './models/device-types/device-types.entity';
import { DeviceTypesModule } from './models/device-types/device-types.module';

@Module({
  imports: [DevicesModule, DeviceTypesModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Devices, DeviceTypes],
      synchronize: true,
      timezone: '+07:00',
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
