import { IAccessToken, IRefreshToken } from 'src/modules/auth/dtos';

export type AuthToken = {
  accessToken: IAccessToken['accessToken'];
  refreshToken?: IRefreshToken['refreshToken'];
};
