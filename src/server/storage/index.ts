/**
 * Storage barrel export.
 *
 * Usage:
 *   import { storage, uploadProductImage, getThumbnailUrl } from "@/server/storage";
 */

export { storage } from "./client";
export type { StorageProvider, UploadResult, UploadOptions } from "./types";
export {
  uploadProductImage,
  uploadAvatar,
  uploadReviewImage,
  uploadAdminAsset,
  deleteImage,
  getThumbnailUrl,
  getMediumUrl,
  getLargeUrl,
  getSquareUrl,
} from "./queries";
