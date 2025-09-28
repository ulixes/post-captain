// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import PostCaptain, { toFile } from 'post-captain';

const client = new PostCaptain({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource tiktok', () => {
  // Prism tests are disabled
  test.skip('checkPostStatus: only required params', async () => {
    const responsePromise = client.api.tiktok.checkPostStatus({ publish_id: 'publish_id' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('checkPostStatus: required and optional params', async () => {
    const response = await client.api.tiktok.checkPostStatus({ publish_id: 'publish_id' });
  });

  // Prism tests are disabled
  test.skip('getProfile', async () => {
    const responsePromise = client.api.tiktok.getProfile();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('postPhotos: only required params', async () => {
    const responsePromise = client.api.tiktok.postPhotos({
      media_type: 'PHOTO',
      post_info: { title: 'title' },
      post_mode: 'DIRECT_POST',
      source_info: { photo_images: ['string'], source: 'FILE_UPLOAD' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('postPhotos: required and optional params', async () => {
    const response = await client.api.tiktok.postPhotos({
      media_type: 'PHOTO',
      post_info: {
        title: 'title',
        auto_add_music: true,
        description: 'description',
        disable_comment: true,
        disable_duet: true,
        disable_stitch: true,
        privacy_level: 'PUBLIC_TO_EVERYONE',
        video_cover_timestamp_ms: 0,
      },
      post_mode: 'DIRECT_POST',
      source_info: { photo_images: ['string'], source: 'FILE_UPLOAD', photo_cover_index: 0 },
    });
  });

  // Prism tests are disabled
  test.skip('postVideo: only required params', async () => {
    const responsePromise = client.api.tiktok.postVideo({
      post_info: { title: 'My Amazing Video' },
      source_info: { source: 'PULL_FROM_URL' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('postVideo: required and optional params', async () => {
    const response = await client.api.tiktok.postVideo({
      post_info: {
        title: 'My Amazing Video',
        auto_add_music: true,
        description: 'Check out this cool video! #tiktok #video',
        disable_comment: false,
        disable_duet: false,
        disable_stitch: false,
        privacy_level: 'PUBLIC_TO_EVERYONE',
        video_cover_timestamp_ms: 0,
      },
      source_info: {
        source: 'PULL_FROM_URL',
        chunk_size: 0,
        total_chunk_count: 0,
        video_size: 0,
        video_url: 'https://example.com/video.mp4',
      },
    });
  });

  // Prism tests are disabled
  test.skip('queryCreatorInfo', async () => {
    const responsePromise = client.api.tiktok.queryCreatorInfo();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('uploadVideoFile: only required params', async () => {
    const responsePromise = client.api.tiktok.uploadVideoFile(
      await toFile(Buffer.from('# my file contents'), 'README.md'),
      { upload_url: 'upload_url' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('uploadVideoFile: required and optional params', async () => {
    const response = await client.api.tiktok.uploadVideoFile(
      await toFile(Buffer.from('# my file contents'), 'README.md'),
      { upload_url: 'upload_url' },
    );
  });
});
