import { ApiProperty } from "@nestjs/swagger";

export class DeviceCreate {
    @ApiProperty()
    name: string;

    @ApiProperty()
    mac_address: string;

    @ApiProperty()
    device_type_id: string;
}