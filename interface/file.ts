export type ImageMime = 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif';

export interface UploadedImage {
  id: string;
  key: string;
  url: string;
  mime: ImageMime;
  user_id: string;
  created_at: string;
  updated_at: string;
}
