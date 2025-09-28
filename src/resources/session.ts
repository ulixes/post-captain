// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Session extends APIResource {
  /**
   * Get current session info (for SDK: pass sessionToken as cookie)
   */
  retrieve(
    params: SessionRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SessionRetrieveResponse> {
    const { cookie } = params ?? {};
    return this._client.get('/api/session', {
      ...options,
      headers: buildHeaders([{ ...(cookie != null ? { cookie: cookie } : undefined) }, options?.headers]),
    });
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

export interface SessionRetrieveParams {
  /**
   * Session cookie containing session_token
   */
  cookie?: string;
}

export declare namespace Session {
  export {
    type SessionRetrieveResponse as SessionRetrieveResponse,
    type SessionRetrieveParams as SessionRetrieveParams,
  };
}
