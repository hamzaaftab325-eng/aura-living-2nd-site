/**
 * Better Auth API route handler.
 *
 * Catches all /api/auth/* requests and routes them to Better Auth.
 * Endpoints exposed:
 *   POST /api/auth/sign-up/email
 *   POST /api/auth/sign-in/email
 *   POST /api/auth/sign-out
 *   GET  /api/auth/get-session
 *   POST /api/auth/verify-email
 *   POST /api/auth/forget-password
 *   POST /api/auth/reset-password
 *
 * Spec: Create auth API route handler at app/api/auth/[...all]/route.ts
 */

import { auth } from "@/server/auth/config";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
