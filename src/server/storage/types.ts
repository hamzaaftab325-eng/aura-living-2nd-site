/**
 * Storage Provider Interface — swappable abstraction.
 *
 * Currently implemented for Cloudinary (automatic optimization + CDN).
 * Could be swapped to Supabase Storage, S3, or any other provider
 * without changing application code.
 */

export interface UploadResult {
  publicId: string; // Cloudinary public ID (e.g., "products/lumen-pendant-001")
  url: string; // Full optimized URL (auto format + quality)
  width: number;
  height: number;
  format: string; // "webp", "avif", "jpg" etc.
  bytes: number;
}

export interface UploadOptions {
  folder: string; // e.g., "products", "avatars", "reviews"
  publicId?: string; // Optional custom ID (defaults to auto-generated)
  transformation?: string; // Optional Cloudinary transformation string
  tags?: string[]; // Optional tags for organization
}

export interface StorageProvider {
  /**
   * Upload an image from a buffer (used in Server Actions from FormData).
   */
  uploadBuffer(buffer: Buffer, options: UploadOptions): Promise<UploadResult>;

  /**
   * Upload an image from a URL (used for importing external images).
   */
  uploadFromUrl(
    sourceUrl: string,
    options: UploadOptions,
  ): Promise<UploadResult>;

  /**
   * Delete an image by public ID.
   */
  delete(publicId: string): Promise<void>;

  /**
   * Generate an optimized URL with on-the-fly transformations.
   * Cloudinary auto-delivers WebP/AVIF to supported browsers.
   */
  getOptimizedUrl(
    publicId: string,
    options?: {
      width?: number;
      height?: number;
      quality?: "auto" | "auto:low" | "auto:high" | number;
      crop?: "fill" | "fit" | "limit" | "scale";
      format?: "auto" | "webp" | "avif" | "jpg";
    },
  ): string;
}
