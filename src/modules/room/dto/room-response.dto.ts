import { Expose } from 'class-transformer';

export class RoomResponse {
  @Expose()
  roomName: string;

  @Expose()
  fromWalletAddress: string;

  @Expose()
  toWalletAddress: string;

  @Expose()
  createdBy: string;
}
