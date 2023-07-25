import { Injectable } from '@nestjs/common'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { DeviceTypes } from 'src/device-types/entities/device-types.entity'
import { Devices } from 'src/devices/entities/devices.entity'


@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
        type: 'sqlite',
        database: 'database.sqlite',
        // entities: [process.cwd()+'src/**/entities/*.entity{.ts,.js}'],
        entities: [Devices, DeviceTypes],
        synchronize: true,
    }
  }
}
