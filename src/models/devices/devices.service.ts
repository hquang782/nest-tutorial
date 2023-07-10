import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { Devices } from './entity/devices.entity';
import { DeviceCreate } from './dto/CreateDevice.dto'
import { DeviceUpdate } from './dto/UpdateDevice.dto'

@Injectable()
export class DevicesService {

    constructor(@InjectRepository(Devices) private deviceRepository: Repository<Devices>) {

    }

    async create(deviceCreate: DeviceCreate) {
        const newDevice = this.deviceRepository.create(deviceCreate);
        return await this.deviceRepository.save(newDevice);
        // return { message: 'Add Success', data: device };
    }

    async findAll(
        relations: string[] = []
    ) {
        // const option: FindManyOptions<Devices> = {   
        //     relations: relations,
        // }
        // console.log(relations);
        return await this.deviceRepository.find({ relations: ['device_types'] })
    }

    async findOne(id: string, relations: string[] = []) {
        const options: FindOneOptions<Devices> = {
            where: { id }, // Tìm thiết bị dựa trên id
            relations: relations,
        };
        const device = await this.deviceRepository.findOne(options);
        if (!device) {
            throw new Error('Device not found');
        }
        return { data: device, message: `This action returns a ${id} device` };
    }

    async update(id: string, device: DeviceUpdate) {
        const UpdateDevice = await this.deviceRepository.findOne({ where: { id } });
        if (!UpdateDevice) {
            throw new NotFoundException('Device not found');
        }
        UpdateDevice.name = device.name;
        UpdateDevice.mac_address = device.mac_address;
        UpdateDevice.device_type_id = device.device_type_id;
        return await this.deviceRepository.save(UpdateDevice);
    }

    async remove(id: string) {
        const device = await this.deviceRepository.findOne({ where: { id } });
        if (!device) {
            throw new NotFoundException('Device not found');
        }
        device.id = id;
        console.log(device.id);
        return await this.deviceRepository.remove(device);
    }
}
