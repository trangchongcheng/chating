import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Room, User } from 'database/entities';
import { CurrentUser } from '../auth/decorators';
import { JwtAuthGuard } from '../auth/guards';
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

  @Get('/me')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ status: HttpStatus.OK, type: RoomResponse })
  async myRoom(@CurrentUser() { walletAddress }: User): Promise<Room[]> {
    return this.roomService.myRoom(walletAddress);
  }
}
