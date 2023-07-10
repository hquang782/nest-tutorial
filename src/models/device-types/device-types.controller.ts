import { Body, Controller, Get, Post } from '@nestjs/common';
import { DeviceTypesService } from './device-types.service';
import { ApiTags } from '@nestjs/swagger';
import { DeviceTypeCreate } from './dto/CreateDeviceType.dto';

@ApiTags('DeviceType')
@Controller('device-types')
export class DeviceTypesController {
  constructor(private readonly deviceTypesService: DeviceTypesService) { }

  @Get()
  async findAll() {
    return await this.deviceTypesService.findAll(
      ['devices']
    );
  }

  @Post()
  async create(@Body() deviceTypeData: DeviceTypeCreate) {
    return this.deviceTypesService.create(deviceTypeData);
  }
}
