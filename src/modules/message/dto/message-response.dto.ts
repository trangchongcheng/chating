import { Expose } from 'class-transformer';

export class MessageResponse {
  @Expose()
  message: string;

  @Expose()
  userId: string;

  @Expose()
  roomId: string;
}
