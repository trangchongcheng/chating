import { Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Message, User } from 'database/entities';
import { Repository } from 'typeorm';
import { RoomService } from '../room/room.service';
import { CreateMessageDto } from './dto';

@Injectable()
@ApiTags('Message')
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private roomService: RoomService,
  ) {}

  async getMessageByRoom(roomId: string): Promise<Message[]> {
    return this.messageRepository.findBy({ roomId });
  }

  async saveMessage(user: User, createMessageDto: CreateMessageDto): Promise<void> {
    await this.roomService.isMemberOfRoom(createMessageDto.roomId, user.walletAddress);
    const message = await this.messageRepository.create({ ...createMessageDto, userId: user.id });
    this.messageRepository.insert(message);
  }
}
