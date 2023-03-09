import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Room } from 'database/entities';
import { RoomResponse } from './dto';
import { RoomService } from './room.service';

@Controller('rooms')
@ApiTags('Room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ status: HttpStatus.OK, type: RoomResponse })
  async rooms(): Promise<Room[]> {
    return this.roomService.rooms();
  }
}
