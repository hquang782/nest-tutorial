import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Devices } from '../devices/devices.entity';


@Entity({ name: 'device_types' })
export class DeviceTypes {
    constructor() {
        this.id = uuidv4();
    }

    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @Column({ type: 'varchar', length: 128, nullable: false })
    @ApiProperty()
    name: string;

    @Column({ type: 'smallint', nullable: false })
    @ApiProperty()
    type_number: number;

    @Column({ type: 'text', nullable: false })
    @ApiProperty()
    description: string;

    @Column({ type: 'varchar', length: 128, nullable: true })
    @ApiProperty()
    manufacturer_name: string;

    @Column({ type: 'varchar', length: 128, nullable: true })
    @ApiProperty()
    model_name: string;

    @Column({ type: 'varchar', length: 128, nullable: true })
    @ApiProperty()
    image_uri: string;

    @Column({ type: 'uuid', nullable: false })
    @ApiProperty()
    chip_id: string;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    created: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    updated: Date;

    @OneToMany(() => Devices, device => device.device_types)
    @JoinColumn({ name: 'device_type_id' })
    devices?: Devices[]
}

export class DeviceTypeCreate {

    @Column({ type: 'varchar', length: 128, nullable: false })
    @ApiProperty()
    name: string;

    @Column({ type: 'smallint', nullable: false })
    @ApiProperty()
    type_number: number;

    @Column({ type: 'text', nullable: false })
    @ApiProperty()
    description: string;

    @Column({ type: 'varchar', length: 128, nullable: true })
    @ApiProperty()
    manufacturer_name: string;

    @Column({ type: 'varchar', length: 128, nullable: true })
    @ApiProperty()
    model_name: string;

    @Column({ type: 'varchar', length: 128, nullable: true })
    @ApiProperty()
    image_uri: string;

    @Column({ type: 'uuid', nullable: false })
    @ApiProperty()
    chip_id: string;
}

export class DeviceTypeUpdate {
    @Column({ type: 'varchar', length: 128, nullable: false })
    @ApiProperty()
    name: string;

    @Column({ type: 'smallint', nullable: false })
    @ApiProperty()
    type_number: number;

    @Column({ type: 'text', nullable: false })
    @ApiProperty()
    description: string;

    @Column({ type: 'varchar', length: 128, nullable: true })
    @ApiProperty()
    manufacturer_name: string;

    @Column({ type: 'varchar', length: 128, nullable: true })
    @ApiProperty()
    model_name: string;

    @Column({ type: 'varchar', length: 128, nullable: true })
    @ApiProperty()
    image_uri: string;

    @Column({ type: 'uuid', nullable: false })
    @ApiProperty()
    chip_id: string;
}
