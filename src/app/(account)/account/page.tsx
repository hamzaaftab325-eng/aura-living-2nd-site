/**
 * Account Dashboard — protected page for signed-in customers.
 *
 * Shows the user's profile + order history + addresses (stub for now).
 * Full functionality built in Phase 4 (orders) + Phase 2.3 (addresses).
 */

import { redirect } from "next/navigation";
import { getSession } from "@/server/auth";
import {
  Container,
  Section,
  Eyebrow,
  LuxuryHeading,
} from "@/components/layout";
import { Button } from "@/components/ui";
import { Package, MapPin, Heart, User, LogOut } from "lucide-react";
import Link from "next/link";

export default async function AccountPage() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in?redirect=/account");
  }

  const firstName = session.user.name?.split(" ")[0] ?? "there";

  return (
    <Container>
      <Section spacing="xl">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <Eyebrow tone="gold">My Account</Eyebrow>
          <LuxuryHeading variant="display-md" as="h1">
            Welcome, {firstName}
          </LuxuryHeading>
          <p className="text-body-md text-[var(--stone)]">
            Signed in as {session.user.email}
          </p>
        </div>

        {/* Account cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <AccountCard
            icon={Package}
            title="Orders"
            description="View your order history and track current orders."
            href="/account/orders"
            cta="View orders"
          />
          <AccountCard
            icon={MapPin}
            title="Addresses"
            description="Manage shipping and billing addresses."
            href="/account/addresses"
            cta="Manage"
          />
          <AccountCard
            icon={Heart}
            title="Wishlist"
            description="Your saved pieces, ready when you are."
            href="/account/wishlist"
            cta="Open wishlist"
          />
          <AccountCard
            icon={User}
            title="Profile"
            description="Update your name, email, and password."
            href="/account/profile"
            cta="Edit profile"
          />
        </div>

        {/* Admin link (only if admin) */}
        {session.user.role === "ADMIN" && (
          <div className="mt-12 border border-[var(--gold)] bg-[var(--cream)] p-8">
            <Eyebrow tone="gold">Admin Access</Eyebrow>
            <LuxuryHeading variant="headline-md" as="h2" className="mt-2">
              You have admin privileges
            </LuxuryHeading>
            <p className="text-body-md mt-3 max-w-[52ch] text-[var(--stone)]">
              Manage products, orders, and customers from the admin dashboard.
            </p>
            <Button variant="gold" size="lg" asChild className="mt-6">
              <Link href="/admin">Go to Admin Dashboard</Link>
            </Button>
          </div>
        )}

        {/* Sign out */}
        <div className="mt-12 border-t border-[var(--line)] pt-8">
          <form action="/api/auth/sign-out" method="post">
            <Button type="submit" variant="outline-luxury" size="lg">
              <LogOut className="h-4 w-4" strokeWidth={1.5} />
              Sign out
            </Button>
          </form>
        </div>
      </Section>
    </Container>
  );
}

function AccountCard({
  icon: Icon,
  title,
  description,
  href,
  cta,
}: {
  icon: typeof Package;
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 border border-[var(--line)] bg-[var(--cream)] p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[var(--ink)] hover:bg-white hover:shadow-[0_24px_60px_rgba(18,18,18,0.06)]"
    >
      <Icon className="h-6 w-6 text-[var(--gold-deep)]" strokeWidth={1} />
      <h3 className="text-headline-sm font-medium text-[var(--ink)]">
        {title}
      </h3>
      <p className="text-body-sm flex-1 text-[var(--stone)]">{description}</p>
      <span className="link-underline text-body-sm inline-block font-medium text-[var(--ink)]">
        {cta}
      </span>
    </Link>
  );
}
