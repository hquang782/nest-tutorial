import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DeviceTypes } from '../device-types/device-types.entity';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'devices' })
export class Devices {

  constructor() {
    this.id = uuidv4();
  }

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column({ length: 40 })
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  mac_address: number;


  @ApiProperty()
  device_type_id: string;

  @ManyToOne(() => DeviceTypes, (deviceType) => deviceType.devices, { nullable: false })
  @JoinColumn({ name: 'device_type_id' })
  device_types?: DeviceTypes

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  created: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updated: Date;
}

export class DeviceCreate {
  @ApiProperty()
  name: string;

  @ApiProperty()
  mac_address: number;

  @ApiProperty()
  device_type_id: string;

}

export class DeviceUpdate {
  @ApiProperty()
  name: string;

  @ApiProperty()
  mac_address: number;

  @ApiProperty()
  device_type_id: string;

}