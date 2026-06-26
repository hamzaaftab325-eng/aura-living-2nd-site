/**
 * Auth barrel export.
 */

export { auth, getSession, requireUser, requireAdmin } from "./config";
export type { Session } from "./config";
export { authClient, signIn, signUp, signOut, useSession } from "./client";
