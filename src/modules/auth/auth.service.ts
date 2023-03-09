import { JwtService } from '@nestjs/jwt';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EzWalletUnauthorizedException } from 'src/common/infra-exception';
import { AuthConfig } from 'src/config';
import { ConfigType } from '@nestjs/config';
import { User } from 'database/entities';
import { UserService } from '../user/user.service';
import { IJwtPayload } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(AuthConfig.KEY)
    private readonly authConfig: ConfigType<typeof AuthConfig>,
  ) {}

  async validateUserById(id: string): Promise<User> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new EzWalletUnauthorizedException('Unauthorized');
    }
    return user;
  }

  jwtToken(payload: IJwtPayload): string {
    return this.jwtService.sign(payload);
  }

  jwtRefreshToken(id: string, walletAddress: string): string {
    const { jwtSecret, refreshTokenExpiration } = this.authConfig;
    const refreshToken = this.jwtService.sign(
      { id, walletAddress },
      {
        secret: jwtSecret,
        expiresIn: refreshTokenExpiration,
      },
    );
    return refreshToken;
  }

  isValidAddress(walletAddress: string): boolean {
    const regex = /^0x[a-fA-F0-9]{40}$/;
    return regex.test(walletAddress);
  }
}
