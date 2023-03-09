import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SocketWithAuth } from '../dtos';

export const CurrentUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const socket: SocketWithAuth = ctx.switchToWs().getClient();
  return socket.user;
});
