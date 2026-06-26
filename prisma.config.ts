/**
 * Prisma Configuration File.
 *
 * Replaces the deprecated `prisma.seed` field in package.json (Prisma 7+).
 * Configuration: https://pris.ly/prisma-config
 *
 * NOTE: When prisma.config.ts exists, Prisma skips auto-loading .env.
 * We load .env manually via dotenv to keep dev experience smooth.
 */

import { defineConfig } from "prisma/config";
import { config as loadEnv } from "dotenv";

loadEnv();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
});
