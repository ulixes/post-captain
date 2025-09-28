// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class OAuth extends APIResource {
  /**
   * Start the TikTok OAuth flow and get the authorization URL
   */
  initiateTiktok(
    body: OAuthInitiateTiktokParams,
    options?: RequestOptions,
  ): APIPromise<OAuthInitiateTiktokResponse> {
    return this._client.post('/oauth/tiktok', { body, ...options });
  }
}

export interface OAuthInitiateTiktokResponse {
  redirect: boolean;

  url: string;
}

export interface OAuthInitiateTiktokParams {
  provider: 'tiktok';
}

export declare namespace OAuth {
  export {
    type OAuthInitiateTiktokResponse as OAuthInitiateTiktokResponse,
    type OAuthInitiateTiktokParams as OAuthInitiateTiktokParams,
  };
}
