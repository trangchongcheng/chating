import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room, User } from 'database/entities';
import { EzWalletNotFoundException } from 'src/common/infra-exception';
import { Repository } from 'typeorm';
import { JoinRoomPayloadDto } from '../chat/dto';
import { CreateRoomDto } from './dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const room = this.roomRepository.create(createRoomDto);
    return this.roomRepository.save(room);
  }

  async createRoomIfNotExits(payload: JoinRoomPayloadDto, user: User): Promise<Room> {
    const { ...rest } = payload;
    if (!payload.id) {
      return this.create({
        ...rest,
        roomName: `Room created by ${payload.fromWalletAddress}`,
        createdBy: user.id,
      });
    }
    return this.isMemberOfRoom(payload.id, payload.fromWalletAddress);
  }

  async isMemberOfRoom(roomId: string, walletAddress: string): Promise<Room> {
    const room = await this.roomRepository
      .createQueryBuilder('room')
      .where('room.id = :id', { id: roomId })
      .andWhere(
        'LOWER(room.fromWalletAddress) = LOWER(:walletAddress) OR LOWER(room.toWalletAddress) = LOWER(:walletAddress)',
        { walletAddress },
      )
      .getOne();

    if (!room) throw new EzWalletNotFoundException('You are not a member of this group');
    return room;
  }

  async myRoom(walletAddress: string): Promise<Room[]> {
    return this.roomRepository.find({
      where: [{ fromWalletAddress: walletAddress }, { toWalletAddress: walletAddress }],
    });
  }

  async rooms(): Promise<Room[]> {
    return this.roomRepository.find({});
  }
}
