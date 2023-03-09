import { IsEthereumAddress, IsOptional, IsString } from 'class-validator';

export class JoinRoomPayloadDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsEthereumAddress()
  fromWalletAddress: string;

  @IsEthereumAddress()
  toWalletAddress: string;
}
