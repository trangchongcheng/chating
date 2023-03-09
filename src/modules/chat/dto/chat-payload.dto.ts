import { IsString } from 'class-validator';

export class ChatPayloadDto {
  @IsString()
  roomId: string;

  @IsString()
  message: string;
}
