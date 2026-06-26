"use client";

/**
 * SignInForm — luxury sign-in form with Better Auth.
 *
 * Uses UnderlineInput + Button from our luxury design system.
 * Shows error states + loading state + redirect on success.
 */

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/server/auth/client";
import { Button, UnderlineInput } from "@/components/ui";
import { LuxuryHeading, Eyebrow } from "@/components/layout";
import { Container, Section } from "@/components/layout";
import { ArrowRight, AlertCircle } from "lucide-react";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message ?? "Invalid email or password");
        setLoading(false);
        return;
      }

      // Redirect to the originally requested page (or account dashboard)
      router.push(redirect);
      router.refresh();
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      console.error("Sign-in error:", err);
    }
  }

  return (
    <Container size="narrow">
      <Section spacing="xl" className="flex flex-col items-center">
        <div className="w-full max-w-md">
          <Eyebrow tone="gold">Welcome back</Eyebrow>
          <LuxuryHeading variant="display-md" as="h1" className="mt-3">
            Sign in
          </LuxuryHeading>
          <p className="text-body-md mt-4 text-[var(--stone)]">
            Access your account, orders, and wishlist.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
            <UnderlineInput
              label="Email Address"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error && !email ? "Email is required" : undefined}
            />
            <UnderlineInput
              label="Password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <div className="text-body-sm flex items-center gap-2 border-l-2 border-[var(--destructive)] bg-[var(--destructive)]/5 px-4 py-3 text-[var(--destructive)]">
                <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-full"
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && (
                <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
              )}
            </Button>
          </form>

          <div className="mt-8 flex flex-col gap-4 text-center">
            <a
              href="/forgot-password"
              className="link-underline text-body-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
            >
              Forgot your password?
            </a>
            <p className="text-body-sm text-[var(--muted)]">
              Don&apos;t have an account?{" "}
              <a
                href="/sign-up"
                className="link-underline font-medium text-[var(--ink)]"
              >
                Create one
              </a>
            </p>
          </div>
        </div>
      </Section>
    </Container>
  );
}
