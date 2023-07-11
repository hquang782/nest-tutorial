import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { DeviceTypes } from './entities/device-types.entity';
import { DeviceTypeCreate } from './dto/CreateDeviceType.dto';
import { DeviceTypeUpdate } from './dto/UpdateDeviceType.dto';

@Injectable()
export class DeviceTypesService {
  constructor(
    @InjectRepository(DeviceTypes)
    private deviceTypeRepository: Repository<DeviceTypes>
  ) { }

  async findAll(relations: string[] = []) {
    const options: FindManyOptions<DeviceTypes> = {
      relations: relations,
    };
    return {
      data: await this.deviceTypeRepository.find(options),
      message: 'This action returns all device type',
    };
  }

  async findOne(id: string, relations: string[] = []) {
    const options: FindManyOptions<DeviceTypes> = {
      where: { id },
      relations: relations
    };
    const device_types = await this.deviceTypeRepository.find(options);
    if (!device_types) {
      throw new Error('Device type not found!');
    }
    return { message: `This action returns a ${id} device type`, data: device_types }
  }

  async create(deviceTypeCreate: DeviceTypeCreate) {
    const newDeviceType = this.deviceTypeRepository.create(deviceTypeCreate)
    return await this.deviceTypeRepository.save(newDeviceType);
  }

  async update(id: string, deviceType: DeviceTypeUpdate) {
    const UpdateDeviceType = await this.deviceTypeRepository.findOne({ where: { id } });
    if (!UpdateDeviceType) {
      throw new NotFoundException('Device type not found');
    }
    UpdateDeviceType.name = deviceType.name;
    UpdateDeviceType.type_number = deviceType.type_number;
    UpdateDeviceType.description = deviceType.description
    UpdateDeviceType.manufacturer_name = deviceType.manufacturer_name
    UpdateDeviceType.model_name = deviceType.model_name
    UpdateDeviceType.image_uri = deviceType.image_uri
    UpdateDeviceType.chip_id = deviceType.chip_id

    return this.deviceTypeRepository.save(deviceType);
  }
  async remove(id: string) {
    const deviceType = await this.deviceTypeRepository.findOne({ where: { id }, relations: ['devices'] });
    if (!deviceType) {
      throw new NotFoundException('Device not found');
    }
    if (deviceType.devices) {
      // throw new Error('Devices property is undefined');
      return "Please delete devices of this device type before remove this!"
    }
    deviceType.id = id;
    return await this.deviceTypeRepository.remove(deviceType);
  }
}

