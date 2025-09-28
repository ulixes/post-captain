// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Auth extends APIResource {
  /**
   * Initiate TikTok OAuth flow
   */
  signInWithSocial(
    body: AuthSignInWithSocialParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AuthSignInWithSocialResponse> {
    return this._client.post('/api/auth/sign-in/social', { body, ...options });
  }

  /**
   * Sign out and clear session
   */
  signOut(
    params: AuthSignOutParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AuthSignOutResponse> {
    const { cookie } = params ?? {};
    return this._client.post('/api/auth/sign-out', {
      ...options,
      headers: buildHeaders([{ ...(cookie != null ? { cookie: cookie } : undefined) }, options?.headers]),
    });
  }
}

export interface AuthSignInWithSocialResponse {
  /**
   * Whether to redirect
   */
  redirect: boolean;

  /**
   * OAuth authorization URL
   */
  url: string;
}

export interface AuthSignOutResponse {
  success: boolean;
}

export interface AuthSignInWithSocialParams {
  /**
   * Redirect URL after authentication
   */
  callbackURL?: string;

  provider?: 'tiktok';
}

export interface AuthSignOutParams {
  cookie?: string;
}

export declare namespace Auth {
  export {
    type AuthSignInWithSocialResponse as AuthSignInWithSocialResponse,
    type AuthSignOutResponse as AuthSignOutResponse,
    type AuthSignInWithSocialParams as AuthSignInWithSocialParams,
    type AuthSignOutParams as AuthSignOutParams,
  };
}
