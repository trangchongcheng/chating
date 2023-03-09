import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'database/entities';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserResponse } from './dtos';

import { UserService } from './user.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOkResponse({ status: HttpStatus.OK, type: UserResponse })
  async rooms(): Promise<User[]> {
    return this.userService.getUsers();
  }
}
