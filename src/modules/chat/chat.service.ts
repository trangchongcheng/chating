import { Injectable } from '@nestjs/common';
import { RoomService } from '../room/room.service';
import { UserService } from '../user/user.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatService {
  constructor(private userService: UserService, private roomService: RoomService) {}

  async create(createChatDto: CreateChatDto): Promise<CreateChatDto> {
    return createChatDto;
  }

  async setUserOnline(id: string): Promise<void> {
    await this.userService.update(id, { isOnline: true });
  }

  async setUserOffline(id: string): Promise<void> {
    await this.userService.update(id, { isOnline: false, lastOnline: new Date() });
  }
}
