import { EzWalletUnauthorizedException } from 'src/common/infra-exception';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthConfig } from 'src/config';
import { AuthService } from '../auth.service';
import { IJwtPayload } from '../dtos';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(AuthConfig.KEY)
    private readonly authConfig: ConfigType<typeof AuthConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      passReqToCallback: false,
      ignoreExpiration: false,
      secretOrKey: authConfig.jwtSecret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any): string | null => {
          const accessToken =
            request?.handshake?.headers?.authorization ||
            request?.headers?.authorization?.split(' ')[1];
          if (!accessToken) {
            return null;
          }
          return accessToken;
        },
      ]),
    });
  }

  async validate(payload: IJwtPayload): Promise<any> {
    if (!payload) {
      throw new EzWalletUnauthorizedException('Unauthorized');
    }
    const user = await this.authService.validateUserById(payload.id);
    return user;
  }
}
