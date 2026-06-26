/**
 * Cloudinary Storage Client — primary image storage provider.
 *
 * Features:
 *   - Automatic WebP/AVIF delivery (browser-dependent)
 *   - On-the-fly resizing + quality optimization via URL params
 *   - Global CDN delivery (fast for Pakistani + international customers)
 *   - 25 GB free tier (vs Supabase's 1 GB)
 *   - No sharp processing needed — Cloudinary handles optimization
 *
 * Usage:
 *   import { storage } from "@/server/storage";
 *   const result = await storage.uploadBuffer(buffer, { folder: "products" });
 *   const optimizedUrl = storage.getOptimizedUrl(result.publicId, { width: 600, quality: "auto" });
 */

import { v2 as cloudinary } from "cloudinary";
import type { StorageProvider, UploadResult, UploadOptions } from "./types";

// Configure Cloudinary from env vars
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Use Record<string, unknown> for upload options to avoid type friction
// with Cloudinary's complex nested type definitions.
type UploadOpts = Record<string, unknown>;

async function uploadBuffer(
  buffer: Buffer,
  options: UploadOptions,
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadOptions: UploadOpts = {
      folder: options.folder,
      resource_type: "image",
      tags: options.tags ?? [options.folder],
      public_id: options.publicId,
      transformation: options.transformation
        ? [{ raw_transformation: options.transformation }]
        : [{ quality: "auto", fetch_format: "auto" }],
    };

    cloudinary.uploader
      .upload_stream(
        uploadOptions as unknown as Parameters<
          typeof cloudinary.uploader.upload_stream
        >[0],
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error("Upload failed"));
            return;
          }
          resolve({
            publicId: result.public_id,
            url: result.secure_url,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
          });
        },
      )
      .end(buffer);
  });
}

async function uploadFromUrl(
  sourceUrl: string,
  options: UploadOptions,
): Promise<UploadResult> {
  const uploadOptions: UploadOpts = {
    folder: options.folder,
    resource_type: "image",
    tags: options.tags ?? [options.folder],
    public_id: options.publicId,
    transformation: options.transformation
      ? [{ raw_transformation: options.transformation }]
      : [{ quality: "auto", fetch_format: "auto" }],
  };

  const result = await cloudinary.uploader.upload(
    sourceUrl,
    uploadOptions as unknown as Parameters<
      typeof cloudinary.uploader.upload
    >[1],
  );

  return {
    publicId: result.public_id,
    url: result.secure_url,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
  };
}

async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
}

function getOptimizedUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    quality?: "auto" | "auto:low" | "auto:high" | number;
    crop?: "fill" | "fit" | "limit" | "scale";
    format?: "auto" | "webp" | "avif" | "jpg";
  },
): string {
  const {
    width,
    height,
    quality = "auto",
    crop = "limit",
    format = "auto",
  } = options ?? {};

  return cloudinary.url(publicId, {
    width,
    height,
    quality,
    crop,
    fetch_format: format,
    secure: true,
  });
}

export const storage: StorageProvider = {
  uploadBuffer,
  uploadFromUrl,
  delete: deleteImage,
  getOptimizedUrl,
};
