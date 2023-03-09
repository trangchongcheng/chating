import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { JwtService } from '@nestjs/jwt';
import { SocketWithAuth } from 'src/modules/auth/dtos';
import { INestApplicationContext, Logger } from '@nestjs/common';

export class RedisIoAdapter extends IoAdapter {
  private readonly logger = new Logger(RedisIoAdapter.name);

  constructor(private app: INestApplicationContext) {
    super(app);
  }

  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis(): Promise<void> {
    const pubClient = createClient({ url: `redis://red-cg4leaseoogtrlt52eqg:6379` });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    const jwtService = this.app.get(JwtService);
    server.use(this.createTokenMiddleware(jwtService, this.logger));

    return server;
  }

  createTokenMiddleware =
    (jwtService: JwtService, logger: Logger) =>
    (socket: SocketWithAuth, next: any): void => {
      const token = socket.handshake.headers.authorization || socket.handshake.auth.token;
      try {
        const payload = jwtService.verify(token);
        // eslint-disable-next-line no-param-reassign
        socket.user = { ...payload };
        next();
      } catch {
        logger.debug('Validating auth token failed');
        next(new Error('FORBIDDEN'));
      }
    };
}
