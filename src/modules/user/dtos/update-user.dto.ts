import { PartialType } from '@nestjs/swagger';
import { UserStatus } from 'database/enums';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  status: UserStatus;
}
