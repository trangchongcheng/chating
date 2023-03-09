import { IsEthereumAddress, IsOptional, IsString } from 'class-validator';

export class JoinRoomPayloadDto {
  @IsString()
  @IsOptional()
  roomId: string;

  @IsEthereumAddress()
  fromWalletAddress: string;

  @IsEthereumAddress()
  toWalletAddress: string;

  @IsString()
  @IsOptional()
  message: string;
}
