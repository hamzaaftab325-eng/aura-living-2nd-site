/**
 * Next.js Instrumentation — runs once on server startup.
 *
 * Ensures .env file values take precedence over any stale system env vars
 * (e.g., the SQLite DATABASE_URL that the bootstrap script sets globally).
 *
 * This is a defensive measure — the `env -u` flag in the dev script handles
 * most cases, but this guarantees correctness across all entry points
 * (next dev, next start, custom servers, serverless functions).
 */

export async function register() {
  // Only run on server side (not edge runtime).
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Force-load .env values into process.env if they're missing or stale.
    // We use a targeted approach: only override if the current value looks
    // like the old SQLite path.
    const currentDbUrl = process.env.DATABASE_URL ?? "";
    if (
      currentDbUrl.startsWith("file:") ||
      !currentDbUrl.startsWith("postgresql://")
    ) {
      // Re-read from .env file directly. Next.js has already loaded .env at
      // this point, but if system env var took precedence, we need to override.
      try {
        const fs = await import("node:fs");
        const path = await import("node:path");

        const envPath = path.join(process.cwd(), ".env");
        if (fs.existsSync(envPath)) {
          const content = fs.readFileSync(envPath, "utf-8");
          for (const line of content.split("\n")) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith("#")) continue;
            const eqIndex = trimmed.indexOf("=");
            if (eqIndex === -1) continue;
            const key = trimmed.slice(0, eqIndex).trim();
            const value = trimmed
              .slice(eqIndex + 1)
              .trim()
              .replace(/^["']|["']$/g, "");
            // Only override keys that look stale or are missing.
            const current = process.env[key];
            if (
              !current ||
              (key === "DATABASE_URL" && current.startsWith("file:")) ||
              (key === "DIRECT_URL" && current.startsWith("file:"))
            ) {
              process.env[key] = value;
            }
          }
        }
      } catch (error) {
        // Silent fail — the app should still boot; the dev script's `env -u`
        // is the primary fix.
        console.warn("[instrumentation] Failed to reload .env:", error);
      }
    }
  }
}
