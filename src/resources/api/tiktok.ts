// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Tiktok extends APIResource {
  /**
   * Check the status of a TikTok post
   *
   * @example
   * ```ts
   * const response = await client.api.tiktok.checkPostStatus({
   *   publish_id: 'publish_id',
   * });
   * ```
   */
  checkPostStatus(
    body: TiktokCheckPostStatusParams,
    options?: RequestOptions,
  ): APIPromise<TiktokCheckPostStatusResponse> {
    return this._client.post('/api/tiktok/post-status', { body, ...options });
  }

  /**
   * Fetch the authenticated user's TikTok profile information
   *
   * @example
   * ```ts
   * const response = await client.api.tiktok.getProfile();
   * ```
   */
  getProfile(options?: RequestOptions): APIPromise<TiktokGetProfileResponse> {
    return this._client.get('/api/tiktok/profile', options);
  }

  /**
   * Initiate photo upload to TikTok
   *
   * @example
   * ```ts
   * const response = await client.api.tiktok.postPhotos({
   *   media_type: 'PHOTO',
   *   post_info: { title: 'title' },
   *   post_mode: 'DIRECT_POST',
   *   source_info: {
   *     photo_images: ['string'],
   *     source: 'FILE_UPLOAD',
   *   },
   * });
   * ```
   */
  postPhotos(body: TiktokPostPhotosParams, options?: RequestOptions): APIPromise<TiktokPostPhotosResponse> {
    return this._client.post('/api/tiktok/post-photos', { body, ...options });
  }

  /**
   * Initiate video upload to TikTok
   *
   * @example
   * ```ts
   * const response = await client.api.tiktok.postVideo({
   *   post_info: {
   *     title: 'My Amazing Video',
   *     privacy_level: 'PUBLIC_TO_EVERYONE',
   *     disable_duet: false,
   *     disable_comment: false,
   *     disable_stitch: false,
   *     description:
   *       'Check out this cool video! #tiktok #video',
   *   },
   *   source_info: {
   *     source: 'PULL_FROM_URL',
   *     video_url: 'https://example.com/video.mp4',
   *   },
   * });
   * ```
   */
  postVideo(body: TiktokPostVideoParams, options?: RequestOptions): APIPromise<TiktokPostVideoResponse> {
    return this._client.post('/api/tiktok/post-video', { body, ...options });
  }

  /**
   * Get the latest information about the authenticated TikTok creator
   *
   * @example
   * ```ts
   * const response = await client.api.tiktok.queryCreatorInfo();
   * ```
   */
  queryCreatorInfo(options?: RequestOptions): APIPromise<TiktokQueryCreatorInfoResponse> {
    return this._client.post('/api/tiktok/creator-info', options);
  }

  /**
   * Upload video file to TikTok (used with FILE_UPLOAD source)
   *
   * @example
   * ```ts
   * const response = await client.api.tiktok.uploadVideoFile({
   *   upload_url: 'upload_url',
   * });
   * ```
   */
  uploadVideoFile(
    params: TiktokUploadVideoFileParams,
    options?: RequestOptions,
  ): APIPromise<TiktokUploadVideoFileResponse> {
    const { upload_url, body } = params;
    return this._client.put('/api/tiktok/upload-video', {
      query: { upload_url },
      body: body,
      ...options,
      headers: buildHeaders([
        { ...('video/mp4' != null ? { 'Content-Type': 'video/mp4' } : undefined) },
        options?.headers,
      ]),
    });
  }
}

export interface TiktokCheckPostStatusResponse {
  data: TiktokCheckPostStatusResponse.Data;
}

export namespace TiktokCheckPostStatusResponse {
  export interface Data {
    status: string;

    fail_reason?: string;

    publicaly_available_post_id?: Array<string>;

    uploaded_bytes?: number;
  }
}

export interface TiktokGetProfileResponse {
  profile: TiktokGetProfileResponse.Profile;

  sessionUser: TiktokGetProfileResponse.SessionUser;
}

export namespace TiktokGetProfileResponse {
  export interface Profile {
    avatar_url: string;

    display_name: string;

    open_id: string;

    union_id: string;
  }

  export interface SessionUser {
    id: string;

    email?: string;

    image?: string;

    name?: string;
  }
}

export interface TiktokPostPhotosResponse {
  data: TiktokPostPhotosResponse.Data;
}

export namespace TiktokPostPhotosResponse {
  export interface Data {
    publish_id: string;
  }
}

export interface TiktokPostVideoResponse {
  data: TiktokPostVideoResponse.Data;
}

export namespace TiktokPostVideoResponse {
  export interface Data {
    publish_id: string;

    upload_url?: string;
  }
}

export interface TiktokQueryCreatorInfoResponse {
  data: TiktokQueryCreatorInfoResponse.Data;
}

export namespace TiktokQueryCreatorInfoResponse {
  export interface Data {
    comment_disabled: boolean;

    creator_avatar_url: string;

    creator_nickname: string;

    creator_username: string;

    duet_disabled: boolean;

    max_video_post_duration_sec: number;

    privacy_level_options: Array<string>;

    stitch_disabled: boolean;
  }
}

export interface TiktokUploadVideoFileResponse {
  success: boolean;
}

export interface TiktokCheckPostStatusParams {
  publish_id: string;
}

export interface TiktokPostPhotosParams {
  media_type: 'PHOTO';

  post_info: TiktokPostPhotosParams.PostInfo;

  post_mode: 'DIRECT_POST';

  source_info: TiktokPostPhotosParams.SourceInfo;
}

export namespace TiktokPostPhotosParams {
  export interface PostInfo {
    /**
     * Video title (required, max 150 chars)
     */
    title: string;

    /**
     * Automatically add music
     */
    auto_add_music?: boolean;

    /**
     * Video description/caption
     */
    description?: string;

    /**
     * Disable comments
     */
    disable_comment?: boolean;

    /**
     * Disable duet feature
     */
    disable_duet?: boolean;

    /**
     * Disable stitch feature
     */
    disable_stitch?: boolean;

    /**
     * Privacy setting for the video
     */
    privacy_level?: 'PUBLIC_TO_EVERYONE' | 'MUTUAL_FOLLOW_FRIENDS' | 'SELF_ONLY';

    /**
     * Thumbnail timestamp in milliseconds
     */
    video_cover_timestamp_ms?: number;
  }

  export interface SourceInfo {
    photo_images: Array<string>;

    source: 'FILE_UPLOAD' | 'PULL_FROM_URL';

    photo_cover_index?: number;
  }
}

export interface TiktokPostVideoParams {
  post_info: TiktokPostVideoParams.PostInfo;

  source_info: TiktokPostVideoParams.SourceInfo;
}

export namespace TiktokPostVideoParams {
  export interface PostInfo {
    /**
     * Video title (required, max 150 chars)
     */
    title: string;

    /**
     * Automatically add music
     */
    auto_add_music?: boolean;

    /**
     * Video description/caption
     */
    description?: string;

    /**
     * Disable comments
     */
    disable_comment?: boolean;

    /**
     * Disable duet feature
     */
    disable_duet?: boolean;

    /**
     * Disable stitch feature
     */
    disable_stitch?: boolean;

    /**
     * Privacy setting for the video
     */
    privacy_level?: 'PUBLIC_TO_EVERYONE' | 'MUTUAL_FOLLOW_FRIENDS' | 'SELF_ONLY';

    /**
     * Thumbnail timestamp in milliseconds
     */
    video_cover_timestamp_ms?: number;
  }

  export interface SourceInfo {
    /**
     * FILE_UPLOAD: Upload file directly, PULL_FROM_URL: Provide video URL
     */
    source: 'FILE_UPLOAD' | 'PULL_FROM_URL';

    /**
     * Chunk size in bytes for FILE_UPLOAD (default: 10MB)
     */
    chunk_size?: number;

    /**
     * Number of chunks for FILE_UPLOAD (default: 1)
     */
    total_chunk_count?: number;

    /**
     * Size of video in bytes (required for FILE_UPLOAD)
     */
    video_size?: number;

    /**
     * HTTPS URL of video file (required for PULL_FROM_URL)
     */
    video_url?: string;
  }
}

export interface TiktokUploadVideoFileParams {
  /**
   * Query param:
   */
  upload_url: string;

  /**
   * Body param:
   */
  body?: unknown;
}

export declare namespace Tiktok {
  export {
    type TiktokCheckPostStatusResponse as TiktokCheckPostStatusResponse,
    type TiktokGetProfileResponse as TiktokGetProfileResponse,
    type TiktokPostPhotosResponse as TiktokPostPhotosResponse,
    type TiktokPostVideoResponse as TiktokPostVideoResponse,
    type TiktokQueryCreatorInfoResponse as TiktokQueryCreatorInfoResponse,
    type TiktokUploadVideoFileResponse as TiktokUploadVideoFileResponse,
    type TiktokCheckPostStatusParams as TiktokCheckPostStatusParams,
    type TiktokPostPhotosParams as TiktokPostPhotosParams,
    type TiktokPostVideoParams as TiktokPostVideoParams,
    type TiktokUploadVideoFileParams as TiktokUploadVideoFileParams,
  };
}
