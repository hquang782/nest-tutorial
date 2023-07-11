import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, AfterInsert, AfterUpdate, BeforeRemove,
} from 'typeorm';
import { DeviceTypes } from '../../device-types/entities/device-types.entity';
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
  mac_address: string;

  @Column()
  @ApiProperty()
  device_type_id: string;

  @ManyToOne(() => DeviceTypes, (deviceType) => deviceType.devices, {
    nullable: false,
  })
  @JoinColumn({ name: 'device_type_id' })
  device_types?: DeviceTypes;

  // @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  // @ApiProperty()
  // created: Date;

  // @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  // @ApiProperty()
  // updated: Date;
  @CreateDateColumn({ type: 'datetime', default: getCurrentTimestamp() })
  @ApiProperty()
  created: Date;

  @UpdateDateColumn({ type: 'datetime', default: getCurrentTimestamp() })
  @ApiProperty()
  updated: Date;

  @AfterInsert()
  afterInsert() {
    console.log('Insert device with id: ', this.id);
  }

  @AfterUpdate()
  afterUpdate() {
    console.log('Update device with id: ', this.id);
  }

  @BeforeRemove()
  beforeRemove() {
    console.log('Remove device with id: ', this.id);
  }
}

function getCurrentTimestamp(): string {
  return new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
}
