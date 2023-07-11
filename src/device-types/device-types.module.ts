import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeviceTypesService } from './device-types.service';
import { DeviceTypesController } from './device-types.controller';
import { DeviceTypes } from './entity/device-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DeviceTypes])],
  controllers: [DeviceTypesController],
  providers: [DeviceTypesService],
})
export class DeviceTypesModule {}
