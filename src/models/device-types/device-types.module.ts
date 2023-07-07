import { Module } from '@nestjs/common';
import { DeviceTypesService } from './device-types.service';
import { DeviceTypesController } from './device-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceTypes } from './device-types.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeviceTypes]),
  ],
  controllers: [DeviceTypesController],
  providers: [DeviceTypesService]
})
export class DeviceTypesModule { }
