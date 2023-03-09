import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET || 'jwtSecret',
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || '2592000000', // 30 days
  forgotPasswordTokenExpiration: process.env.FORGOT_PASSWORD_TOKEN_EXPIRATION || '60000', // 1 minute
  accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRATION || '604800000', // 7 days
  cryptoPrivateKey: process.env.CRYPTO_PRIVATE_KEY || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456',
}));
