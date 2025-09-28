// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import PostCaptain from 'post-tiktok-captain';

const client = new PostCaptain({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource auth', () => {
  // Prism tests are disabled
  test.skip('signInWithSocial', async () => {
    const responsePromise = client.auth.signInWithSocial();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('signInWithSocial: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.auth.signInWithSocial(
        { callbackURL: 'callbackURL', provider: 'tiktok' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(PostCaptain.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('signOut', async () => {
    const responsePromise = client.auth.signOut();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('signOut: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.auth.signOut({ cookie: 'cookie' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(PostCaptain.NotFoundError);
  });
});
