import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { Devices } from './entity/devices.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Devices])],

  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
