import { HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';
import {
  EzWalletBadRequestException,
  EzWalletNotFoundException,
  InternalServerError,
} from '../infra-exception';

type ErrorResponse = { statusCode: number; message: string };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const httpErrorHandler = (error: AxiosError) => {
  const { statusCode, message } = (error?.response?.data as ErrorResponse) || {};
  if (statusCode === HttpStatus.NOT_FOUND) {
    throw new EzWalletNotFoundException(message);
  } else if (statusCode === HttpStatus.BAD_REQUEST) {
    throw new EzWalletBadRequestException(message);
  }
  throw new InternalServerError();
};
