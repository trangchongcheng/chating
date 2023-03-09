import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { UserModule } from '../user/user.module';
import { RoomModule } from '../room/room.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [UserModule, RoomModule, MessageModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
