import { EzWalletUnauthorizedException } from 'src/common/infra-exception';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): any {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any): any {
    if (info instanceof jwt.TokenExpiredError) {
      throw new EzWalletUnauthorizedException('Token expired');
    }
    if (err || !user) {
      throw new EzWalletUnauthorizedException(err?.message ?? 'Unauthorized user');
    }
    return user;
  }
}
