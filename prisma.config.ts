/**
 * Prisma Configuration File.
 *
 * Replaces the deprecated `prisma.seed` field in package.json (Prisma 7+).
 * Configuration: https://pris.ly/prisma-config
 */

import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
});
