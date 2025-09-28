// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { PostCaptain } from '../client';

export abstract class APIResource {
  protected _client: PostCaptain;

  constructor(client: PostCaptain) {
    this._client = client;
  }
}
