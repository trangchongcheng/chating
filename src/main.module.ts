import { Module, OnModuleDestroy, Inject, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { WinstonModule, WinstonModuleOptions } from 'nest-winston';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppConfig, configurations, DatabaseConfig, LogConfig } from './config';
import { UserModule } from './modules/user/user.module';
import { ChatModule } from './modules/chat/chat.module';
import { AuthModule } from './modules/auth/auth.module';
import { GlobalHandleExceptionFilter } from './common/infra-exception';
import { LoggerMiddleware } from './common/middlewares';
import { RoomModule } from './modules/room/room.module';
import { MessageModule } from './modules/message/message.module';

const modules = [UserModule, AuthModule, UserModule, ChatModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configurations,
      isGlobal: true,
      envFilePath: [`.env`],
    }),
    WinstonModule.forRootAsync({
      inject: [LogConfig.KEY],
      useFactory: (config: ConfigType<typeof LogConfig>) => {
        if (!config) {
          throw new Error('Cannot start app without winston config');
        }
        return config as WinstonModuleOptions;
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [DatabaseConfig.KEY],
      useFactory: (config: ConfigType<typeof DatabaseConfig>) => {
        if (!config) {
          throw new Error('Cannot start app without ORM config');
        }
        return config as TypeOrmModuleOptions;
      },
    }),
    EventEmitterModule.forRoot(),
    ...modules,
    RoomModule,
    MessageModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalHandleExceptionFilter,
    },
  ],
})
export class MainModule implements OnModuleDestroy, NestModule {
  static apiPrefix: string;

  static corsOrigins: string[];

  constructor(
    @Inject(AppConfig.KEY)
    private readonly appConfig: ConfigType<typeof AppConfig>,
  ) {
    MainModule.apiPrefix = 'v1';
    MainModule.corsOrigins = this.appConfig.corsOrigins.split('|') || 'http://localhost:3000';
  }

  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).exclude('(.*healthz.*)', '(.*auth.*)').forRoutes('*');
  }

  onModuleDestroy(): void {
    // TODO: Disconnect from database
  }
}
