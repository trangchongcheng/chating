import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { SocketEvent } from 'src/common/constants/chat-event';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatPayloadDto, JoinRoomPayloadDto } from './dto';
import { SocketWithAuth } from '../auth/dtos';
import { RoomService } from '../room/room.service';
import { MessageService } from '../message/message.service';

@WebSocketGateway({ cors: true })
@UseGuards(JwtAuthGuard)
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly chatService: ChatService,
    private roomService: RoomService,
    private messageService: MessageService,
  ) {}

  async handleConnection(@ConnectedSocket() client: SocketWithAuth): Promise<void> {
    try {
      await this.chatService.setUserOnline(client.user.id);
    } catch (error: any) {
      client.disconnect();
    }
  }

  @SubscribeMessage(SocketEvent.NEW_MESSAGE)
  async create(
    @ConnectedSocket() client: SocketWithAuth,
    @MessageBody() payload: ChatPayloadDto,
  ): Promise<any> {
    await this.messageService.saveMessage(client.user, payload);
    this.server
      .to(payload.roomId)
      .emit(SocketEvent.NEW_MESSAGE_RECEIVED, { message: payload.message, user: client.user });
    return { status: 'ok' };
  }

  @SubscribeMessage(SocketEvent.JOINING)
  async handleJoinRoom(
    @ConnectedSocket() client: SocketWithAuth,
    @MessageBody() payload: JoinRoomPayloadDto,
  ): Promise<void> {
    const room = await this.roomService.createRoomIfNotExits(payload, client.user);
    await client.join(room.id);
    this.server.to(room.id).emit(SocketEvent.JOINED, room);
  }

  @SubscribeMessage(SocketEvent.LEAVE)
  handleLeaveRoom(client: Socket, payload: any): void {
    client.leave(payload.roomId);
  }

  async handleDisconnect(@ConnectedSocket() client: SocketWithAuth): Promise<void> {
    try {
      await this.chatService.setUserOffline(client.user.id);
    } catch (error: any) {
      client.disconnect();
    }
    client.disconnect();
  }
}
