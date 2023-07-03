import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './interfaces/device.interface';
import { UUID } from 'crypto';

@Injectable()
export class DevicesService {
  private readonly devices: Device[]=[];
  create(createDeviceDto: CreateDeviceDto) {
    return 'This action adds a new device';
  }

  findAll() {
    return `This action returns all devices`;
  }

  findOne(id: string) {
    return `This action returns a ${id} device`;
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a ${id} device`;
  }

  remove(id: number) {
    return `This action removes a ${id} device`;
  }
}
