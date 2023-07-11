import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DeviceTypesService } from './device-types.service';
import { DeviceTypeCreate } from './dto/CreateDeviceType.dto';
import { DeviceTypeUpdate } from './dto/UpdateDeviceType.dto';

@ApiTags('DeviceType')
@Controller('device-types')
export class DeviceTypesController {
  constructor(private readonly deviceTypesService: DeviceTypesService) { }

  @Get()
  async findAll() {
    return await this.deviceTypesService.findAll(['devices']);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.deviceTypesService.findOne(id, ['devices']);
  }

  @Post()
  async create(@Body() deviceTypeData: DeviceTypeCreate) {
    return this.deviceTypesService.create(deviceTypeData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() deviceTypeData: DeviceTypeUpdate) {
    return await this.deviceTypesService.update(id, deviceTypeData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.deviceTypesService.remove(id);
  }
}
