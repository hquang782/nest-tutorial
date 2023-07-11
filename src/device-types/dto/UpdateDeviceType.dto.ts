import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

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
