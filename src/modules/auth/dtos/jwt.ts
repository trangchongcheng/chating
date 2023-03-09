import { User } from 'database/entities';
import { Socket } from 'socket.io';

export interface IJwtPayload {
  id: string;
  walletAddress: string;
}

export interface IAdminJwtPayload {
  id: string;
  email: string;
}

export interface IAccessToken {
  accessToken: string;
}

export interface IRefreshToken {
  refreshToken: string;
}
export interface SocketWithAuth extends Socket {
  user: User;
}
