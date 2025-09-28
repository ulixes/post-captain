// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Session extends APIResource {
  /**
   * Get current session info using Bearer token authentication
   */
  retrieve(options?: RequestOptions): APIPromise<SessionRetrieveResponse> {
    return this._client.get('/api/session', options);
  }
}

export interface SessionRetrieveResponse {
  /**
   * Session token for SDK authentication
   */
  sessionToken: string;

  user?: SessionRetrieveResponse.User;
}

export namespace SessionRetrieveResponse {
  export interface User {
    id: string;

    email: string | null;

    image: string | null;

    name: string | null;
  }
}

export declare namespace Session {
  export { type SessionRetrieveResponse as SessionRetrieveResponse };
}
