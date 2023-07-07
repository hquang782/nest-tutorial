import { Injectable } from '@nestjs/common';
// import { Device } from './interfaces/device.interface';
import { UUID } from 'crypto';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Devices, DeviceCreate, DeviceUpdate } from './devices.entity';
@Injectable()
export class DevicesService {

    constructor(@InjectRepository(Devices) private deviceRepository: Repository<Devices>) {

    }

    async create(device: DeviceCreate) {
        await this.deviceRepository.save(device);
        return {message: 'Add Success', data: device};
    }

    async findAll(
        relations: string[] = []
    ) {
        // const option: FindManyOptions<Devices> = {
        //     relations: relations,
        // }
        console.log(relations);
        return await this.deviceRepository.find({relations: ['device_types']})
    }

    async findOne(id: string, relations: string[]=[]) {
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
        await this.deviceRepository.update(id, device);
        return {data: device,message:`Updated a ${id} device`};
    }

    async remove(id: string) {
        await this.deviceRepository.delete(id);
        return `Removed a ${id} device`;
    }
}
