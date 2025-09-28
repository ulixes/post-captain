// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import PostCaptain from 'post-captain';

const client = new PostCaptain({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource oauth', () => {
  // Prism tests are disabled
  test.skip('initiateTiktok: only required params', async () => {
    const responsePromise = client.oauth.initiateTiktok({ provider: 'tiktok' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('initiateTiktok: required and optional params', async () => {
    const response = await client.oauth.initiateTiktok({ provider: 'tiktok' });
  });
});
