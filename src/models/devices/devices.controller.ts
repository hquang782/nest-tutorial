import { Controller, Get, Post, Body, Param, Delete, UseFilters, Put, ParseIntPipe, Response } from '@nestjs/common';
import { DevicesService } from './devices.service';

import { HttpExceptionFilter } from 'src/http-exception.filter';
import { DeviceCreate, DeviceUpdate, Devices } from './devices.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Device')
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) { }

  @Post()
  @UseFilters(new HttpExceptionFilter())
  @ApiResponse({
    type: Devices,
    status: 201
  })
  async create(@Body() deviceData: DeviceCreate) {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return await this.devicesService.create(deviceData);
  }

  @Get()
  async findAll() {
    return await this.devicesService.findAll(['device_types']);
  }

  @Get(':id')//pipes 
  async findOne(@Param('id') id: string) {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return await this.devicesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() deviceData: DeviceUpdate) {
    return await this.devicesService.update(id, deviceData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.devicesService.remove(id);
  }
}
