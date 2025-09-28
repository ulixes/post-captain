// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AuthAPI from './auth';
import { Auth, AuthCheckSessionResponse, AuthLogoutResponse } from './auth';
import * as TiktokAPI from './tiktok';
import {
  Tiktok,
  TiktokCheckPostStatusParams,
  TiktokCheckPostStatusResponse,
  TiktokGetProfileResponse,
  TiktokPostPhotosParams,
  TiktokPostPhotosResponse,
  TiktokPostVideoParams,
  TiktokPostVideoResponse,
  TiktokQueryCreatorInfoResponse,
  TiktokUploadVideoFileParams,
  TiktokUploadVideoFileResponse,
} from './tiktok';

export class API extends APIResource {
  auth: AuthAPI.Auth = new AuthAPI.Auth(this._client);
  tiktok: TiktokAPI.Tiktok = new TiktokAPI.Tiktok(this._client);
}

API.Auth = Auth;
API.Tiktok = Tiktok;

export declare namespace API {
  export {
    Auth as Auth,
    type AuthCheckSessionResponse as AuthCheckSessionResponse,
    type AuthLogoutResponse as AuthLogoutResponse,
  };

  export {
    Tiktok as Tiktok,
    type TiktokCheckPostStatusResponse as TiktokCheckPostStatusResponse,
    type TiktokGetProfileResponse as TiktokGetProfileResponse,
    type TiktokPostPhotosResponse as TiktokPostPhotosResponse,
    type TiktokPostVideoResponse as TiktokPostVideoResponse,
    type TiktokQueryCreatorInfoResponse as TiktokQueryCreatorInfoResponse,
    type TiktokUploadVideoFileResponse as TiktokUploadVideoFileResponse,
    type TiktokCheckPostStatusParams as TiktokCheckPostStatusParams,
    type TiktokPostPhotosParams as TiktokPostPhotosParams,
    type TiktokPostVideoParams as TiktokPostVideoParams,
    type TiktokUploadVideoFileParams as TiktokUploadVideoFileParams,
  };
}
