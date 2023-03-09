import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Message } from 'database/entities';
import { MessageResponse } from './dto';
import { MessageService } from './message.service';

@Controller('messages')
@ApiTags('Message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('/:roomId')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ status: HttpStatus.OK, type: MessageResponse })
  async rooms(@Param('roomId') roomId: string): Promise<Message[]> {
    return this.messageService.getMessageByRoom(roomId);
  }
}
