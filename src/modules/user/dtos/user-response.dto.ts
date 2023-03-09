import { Expose } from 'class-transformer';

export class UserResponse {
  @Expose()
  id: string;

  @Expose()
  walletAddress: string;

  @Expose()
  isOnline: boolean;

  @Expose()
  lastOnline: Date;
}
