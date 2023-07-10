import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Devices } from './entity/devices.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Devices]),
  ],

  controllers: [DevicesController],
  providers: [DevicesService]
})
export class DevicesModule { }
