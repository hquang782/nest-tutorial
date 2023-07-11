import { ApiProperty } from '@nestjs/swagger';

export class DeviceUpdate {
  @ApiProperty()
  name: string;

  @ApiProperty()
  mac_address: string;

  @ApiProperty()
  device_type_id: string;
}
