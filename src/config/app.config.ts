import { registerAs } from '@nestjs/config';
import { ManipulateType } from 'dayjs';
import { CookieOptions } from 'express';

export default registerAs('app', () => ({
  appName: process.env.APP_NAME || 'Blox3',
  registerOtpPrefix: 'otp:register:', // session otp for register step one
  loginSessionPrefix: 'session:login:', // session login step one
  loginSessionTtl: parseInt(process.env.LOGIN_SESSION_TTL || '300000', 10), // milliseconds
  loginOtpPrefix: 'otp:login:', // session otp login step one
  authSessionPrefix: 'session:auth:', // session login success
  forgotPasswordOtpPrefix: 'otp:forgot-password:', // session otp for forgot password
  changePasswordOtpPrefix: 'otp:change-password:', // session otp for change password
  sessionTransactionOtpPrefix: 'otp:transaction:', // session otp for transaction
  withdrawalSessionPrefix: 'session:withdraw:', // session for transaction
  transactionSessionTtl: parseInt(process.env.TRANSACTION_SESSION_TTL || '300000', 10), // milliseconds
  emailVerifyOtpRetry: process.env.EMAIL_VERIFY_OTP_MAX_RETRY || 3,
  otpTimeout: parseInt(process.env.OTP_TIMEOUT || '300000', 10), // milliseconds
  dealTopicPrefix: process.env.DEAL_TOPIC_PREFIX,
  corsOrigins: process.env.CORS_ORIGINS || '',
  cookieOptions: {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    domain: process.env.COOKIE_DOMAIN || '',
  } as CookieOptions,
  frequencyUnit: (process.env.FREQUENCY_UNIT || 'day') as ManipulateType,
}));
