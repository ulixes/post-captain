// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Profile extends APIResource {
  /**
   * Get authenticated user profile using Bearer token
   */
  retrieve(options?: RequestOptions): APIPromise<ProfileRetrieveResponse> {
    return this._client.get('/api/profile', options);
  }
}

export interface ProfileRetrieveResponse {
  id: string;

  email: string | null;

  image: string | null;

  name: string | null;
}

export declare namespace Profile {
  export { type ProfileRetrieveResponse as ProfileRetrieveResponse };
}
