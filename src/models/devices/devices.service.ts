import { Injectable } from '@nestjs/common';
// import { Device } from './interfaces/device.interface';
import { UUID } from 'crypto';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Devices, DeviceCreate, DeviceUpdate } from './devices.entity';
@Injectable()
export class DevicesService {

    constructor(@InjectRepository(Devices) private deviceRepository: Repository<Devices>) { }

    async create(device: DeviceCreate) {
        await this.deviceRepository.save(device);
        return 'Add a new device';
    }

    async findAll(
        relations: string[] = []
    ) {
        const options: FindManyOptions<Devices> = {
            relations: relations,
        }
        return await this.deviceRepository.find(options)
        // return `This action returns all devices`;
    }

    async findOne(id: string) {
        const options: FindOneOptions<Devices> = {
            where: { id }, // Tìm thiết bị dựa trên id
        };
        const device = await this.deviceRepository.findOne(options);
        if (!device) {
            throw new Error('Device not found');
        }
        return { data: device, message: `This action returns a ${id} device` };
    }

    async update(id: string, device: DeviceUpdate) {
        this.deviceRepository.update(id, device);
        return `Updates a ${id} device`;
    }

    async remove(id: string) {
        this.deviceRepository.delete(id);
        return `Removes a ${id} device`;
    }
}
