import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { EzWalletNotAcceptableException } from '../infra-exception';

@Injectable()
export class HeaderMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction): void {
    // Return NOT_ACCEPTABLE if the request 'Content-Type' header is not 'application/json'
    const contentType = req.headers['Content-Type'] || req.headers['content-type'];

    if (!contentType?.includes('application/json')) {
      throw new EzWalletNotAcceptableException('Content-Type header must be application/json');
    }

    next();
  }
}
