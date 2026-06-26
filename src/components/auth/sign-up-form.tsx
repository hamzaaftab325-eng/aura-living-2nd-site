"use client";

/**
 * SignUpForm — luxury sign-up form with Better Auth.
 *
 * Creates a new customer account (default role CUSTOMER).
 * Redirects to /account on success.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/server/auth/client";
import { Button, UnderlineInput } from "@/components/ui";
import { LuxuryHeading, Eyebrow } from "@/components/layout";
import { Container, Section } from "@/components/layout";
import { ArrowRight, AlertCircle } from "lucide-react";

export default function SignUpForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (result.error) {
        setError(result.error.message ?? "Could not create account");
        setLoading(false);
        return;
      }

      // Redirect to account dashboard
      router.push("/account");
      router.refresh();
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
      console.error("Sign-up error:", err);
    }
  }

  return (
    <Container size="narrow">
      <Section spacing="xl" className="flex flex-col items-center">
        <div className="w-full max-w-md">
          <Eyebrow tone="gold">Join Aura Living</Eyebrow>
          <LuxuryHeading variant="display-md" as="h1" className="mt-3">
            Create account
          </LuxuryHeading>
          <p className="text-body-md mt-4 text-[var(--stone)]">
            Save your wishlist, track orders, and check out faster.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
            <UnderlineInput
              label="Full Name"
              type="text"
              required
              autoComplete="name"
              placeholder="Ayesha Khan"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <UnderlineInput
              label="Email Address"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <UnderlineInput
              label="Password"
              type="password"
              required
              autoComplete="new-password"
              placeholder="Min 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              hint="Use at least 8 characters with a mix of letters and numbers"
            />
            <UnderlineInput
              label="Confirm Password"
              type="password"
              required
              autoComplete="new-password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={
                confirmPassword && password !== confirmPassword
                  ? "Passwords do not match"
                  : undefined
              }
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
              {loading ? "Creating account..." : "Create Account"}
              {!loading && (
                <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
              )}
            </Button>
          </form>

          <p className="text-body-sm mt-8 text-center text-[var(--muted)]">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="link-underline font-medium text-[var(--ink)]"
            >
              Sign in
            </a>
          </p>

          <p className="text-body-sm mt-6 text-center text-[var(--muted)]">
            By creating an account, you agree to our{" "}
            <a href="/legal/terms" className="link-underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="/legal/privacy" className="link-underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </Section>
    </Container>
  );
}
