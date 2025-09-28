// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Auth extends APIResource {
  /**
   * Check if user is authenticated and get session info
   *
   * @example
   * ```ts
   * const response = await client.api.auth.checkSession();
   * ```
   */
  checkSession(options?: RequestOptions): APIPromise<AuthCheckSessionResponse> {
    return this._client.get('/api/auth/session', options);
  }

  /**
   * Clear user session and logout
   *
   * @example
   * ```ts
   * const response = await client.api.auth.logout();
   * ```
   */
  logout(options?: RequestOptions): APIPromise<AuthLogoutResponse> {
    return this._client.post('/api/auth/logout', options);
  }
}

export interface AuthCheckSessionResponse {
  session: AuthCheckSessionResponse.Session | null;

  user: AuthCheckSessionResponse.User | null;
}

export namespace AuthCheckSessionResponse {
  export interface Session {
    id: string;

    expiresAt: string;

    userId: string;
  }

  export interface User {
    id: string;

    email?: string;

    image?: string;

    name?: string;
  }
}

export interface AuthLogoutResponse {
  message: string;

  success: boolean;
}

export declare namespace Auth {
  export {
    type AuthCheckSessionResponse as AuthCheckSessionResponse,
    type AuthLogoutResponse as AuthLogoutResponse,
  };
}
