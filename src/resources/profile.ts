// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Profile extends APIResource {
  /**
   * Get authenticated user profile
   */
  retrieve(
    params: ProfileRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ProfileRetrieveResponse> {
    const { cookie } = params ?? {};
    return this._client.get('/api/profile', {
      ...options,
      headers: buildHeaders([{ ...(cookie != null ? { cookie: cookie } : undefined) }, options?.headers]),
    });
  }
}

export interface ProfileRetrieveResponse {
  id: string;

  email: string | null;

  image: string | null;

  name: string | null;
}

export interface ProfileRetrieveParams {
  /**
   * Session cookie
   */
  cookie?: string;
}

export declare namespace Profile {
  export {
    type ProfileRetrieveResponse as ProfileRetrieveResponse,
    type ProfileRetrieveParams as ProfileRetrieveParams,
  };
}
