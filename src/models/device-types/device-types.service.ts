import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { DeviceTypes } from './entity/device-types.entity';
import { DeviceTypeCreate } from './dto/CreateDeviceType.dto';
import { DeviceTypeUpdate } from './dto/UpdateDeviceType.dto';


@Injectable()
export class DeviceTypesService {

    constructor(@InjectRepository(DeviceTypes) private deviceTypeRepository: Repository<DeviceTypes>) { }

    async findAll(
        relations: string[] = [],
    ) {
        const options: FindManyOptions<DeviceTypes> = {
            relations: relations,
        }
        return {
            data: await this.deviceTypeRepository.find(options),
            message: 'This action returns all device type'
        };
    }
    async create(deviceType: DeviceTypeCreate) {
        return await this.deviceTypeRepository.save(deviceType);
    }

    async update(id: string, deviceType: DeviceTypeUpdate) {
        this.deviceTypeRepository.update(id, deviceType);
        return `Update a ${id} device type`;
    }
}
