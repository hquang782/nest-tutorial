import {  Controller,  Get,  Post,  Body,  Param,  Delete,  UseFilters,  Put, UsePipes} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateDeviceValidationPipe } from 'src/config/validation.pipe';
import { HttpExceptionFilter } from 'src/config/http-exception.filter';
import { DeviceUpdate } from './dto/UpdateDevice.dto';
import { DeviceCreate } from './dto/CreateDevice.dto';
import { DevicesService } from './devices.service';
import { Devices } from './entity/devices.entity';


@ApiTags('Device')
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  @ApiResponse({
    type: DeviceCreate,
    status: 201,
  })
  @UsePipes(new CreateDeviceValidationPipe())
  async create(@Body() deviceData: DeviceCreate) {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return await this.devicesService.create(deviceData);
  }

  @Get()
  async findAll() {
    return await this.devicesService.findAll(['device_types']);
  }

  @Get(':id') //pipes
  async findOne(@Param('id') id: string) {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return await this.devicesService.findOne(id, ['device_types']);
  }

  @Put(':id')
  @UsePipes(new CreateDeviceValidationPipe())
  async update(@Param('id') id: string, @Body() deviceData: DeviceUpdate) {
    return await this.devicesService.update(id, deviceData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.devicesService.remove(id);
  }
}
