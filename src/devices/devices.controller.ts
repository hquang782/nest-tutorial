import { Controller, Get, Post, Body, Param, Delete, UseFilters, Put } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) { }

  @Post()
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() createDeviceDto: CreateDeviceDto) {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // return this.devicesService.create(createDeviceDto);
    try {
      return new ResponseData<string>(this.devicesService.create(createDeviceDto), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
    } catch (Error) {
      return new ResponseData<string>(null, HttpStatus.ERROR, HttpMessage.ERROR)
    }
  }

  @Get()
  findAll(): ResponseData<string> {
    try {
      return new ResponseData<string>(this.devicesService.findAll(), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
    } catch (Error) {
      return new ResponseData<string>(null, HttpStatus.ERROR, HttpMessage.ERROR)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): ResponseData<string> {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // return this.devicesService.findOne(id);
    try {
      return new ResponseData<string>(this.devicesService.findOne(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
    } catch (Error) {
      return new ResponseData<string>(null, HttpStatus.ERROR, HttpMessage.ERROR)
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto): ResponseData<string> {
    // return this.devicesService.update(+id, updateDeviceDto);
    try {
      return new ResponseData<string>(this.devicesService.update(+id, updateDeviceDto), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
    } catch (Error) {
      return new ResponseData<string>(null, HttpStatus.ERROR, HttpMessage.ERROR)
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.devicesService.remove(+id);
    try {
      return new ResponseData<string>(this.devicesService.remove(+id), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
    } catch (Error) {
      return new ResponseData<string>(null, HttpStatus.ERROR, HttpMessage.ERROR)
    }
  }
}
