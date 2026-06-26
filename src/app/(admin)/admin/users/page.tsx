/**
 * Admin Users Page — professional user management.
 *
 * Shows all users with:
 *   • Name + email (NOT raw IDs)
 *   • Role badge (ADMIN / TRADE / CUSTOMER)
 *   • Account status (verified / banned)
 *   • Signup date (formatted)
 *   • Last login (from most recent Session)
 *   • Total orders (when Phase 4 lands)
 *
 * Replaces the raw DB view — your client sees "Aura Living Admin / admin@auraliving.pk"
 * instead of "HGbb74ABxtWYO0CX1slYRr36DBsXOmmm".
 */

import { redirect } from "next/navigation";
import { getSession } from "@/server/auth";
import { db } from "@/server/db";
import {
  Container,
  Section,
  Eyebrow,
  LuxuryHeading,
} from "@/components/layout";
import { LuxuryBadge } from "@/components/ui";
import { Counter } from "@/components/motion";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Shield,
  User as UserIcon,
  Ban,
  CheckCircle2,
  Clock,
  Package,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

export default async function AdminUsersPage() {
  // Auth guard
  const session = await getSession();
  if (!session) redirect("/sign-in?redirect=/admin/users");
  if (session.user.role !== "ADMIN") redirect("/account");

  // Fetch all users with their most recent session (for last login) + order count
  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      sessions: {
        orderBy: { createdAt: "desc" },
        take: 1, // Most recent session only
      },
      _count: {
        select: { orders: true },
      },
    },
  });

  return (
    <Container>
      <Section spacing="xl">
        {/* Back link */}
        <Link
          href="/admin"
          className="link-underline text-body-sm inline-flex items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.25} />
          Back to Admin
        </Link>

        {/* Header */}
        <div className="mt-8 flex flex-col gap-2">
          <Eyebrow tone="gold">User Management</Eyebrow>
          <LuxuryHeading variant="display-md" as="h1">
            All Users
          </LuxuryHeading>
          <p className="text-body-md text-[var(--stone)]">
            <Counter value={users.length} /> registered users
          </p>
        </div>

        {/* Users table — professional layout */}
        <div className="mt-12 overflow-hidden border border-[var(--line)]">
          {/* Table header (desktop only) */}
          <div className="hidden grid-cols-12 gap-4 border-b border-[var(--line)] bg-[var(--cream)] px-6 py-4 md:grid">
            <div className="label-caps col-span-4 text-[var(--muted)]">
              User
            </div>
            <div className="label-caps col-span-2 text-[var(--muted)]">
              Role
            </div>
            <div className="label-caps col-span-2 text-[var(--muted)]">
              Status
            </div>
            <div className="label-caps col-span-2 text-[var(--muted)]">
              Joined
            </div>
            <div className="label-caps col-span-2 text-[var(--muted)]">
              Last Login
            </div>
          </div>

          {/* User rows */}
          <div className="divide-y divide-[var(--line)]">
            {users.length === 0 ? (
              <div className="text-body-md px-6 py-16 text-center text-[var(--muted)]">
                No users yet. Sign up the first customer to see them here.
              </div>
            ) : (
              users.map((user) => {
                const lastSession = user.sessions[0];
                const isCurrentUser = user.id === session.user.id;

                return (
                  <div
                    key={user.id}
                    className="grid grid-cols-1 gap-4 px-6 py-5 transition-colors duration-300 hover:bg-[var(--cream)] md:grid-cols-12 md:items-center"
                  >
                    {/* User identity (name + email) */}
                    <div className="col-span-4 flex items-center gap-3">
                      {/* Avatar (initials) */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--ink)] text-[0.75rem] font-semibold text-white uppercase">
                        {getInitials(user.name ?? user.email)}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-body-md font-medium text-[var(--ink)]">
                            {user.name ?? "Unnamed user"}
                          </span>
                          {isCurrentUser && (
                            <span className="label-caps rounded-full bg-[var(--gold)] px-2 py-0.5 text-[0.625rem] text-[var(--ink)]">
                              You
                            </span>
                          )}
                        </div>
                        <a
                          href={`mailto:${user.email}`}
                          className="link-underline text-body-sm inline-flex items-center gap-1.5 text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                        >
                          <Mail className="h-3 w-3" strokeWidth={1.25} />
                          {user.email}
                        </a>
                      </div>
                    </div>

                    {/* Role */}
                    <div className="col-span-2">
                      <RoleBadge role={user.role} />
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      <StatusBadge
                        emailVerified={user.emailVerified}
                        banned={user.banned}
                      />
                    </div>

                    {/* Joined date */}
                    <div className="text-body-sm col-span-2 flex items-center gap-2 text-[var(--stone)]">
                      <Clock
                        className="h-3.5 w-3.5 text-[var(--muted)]"
                        strokeWidth={1.25}
                      />
                      <span title={format(user.createdAt, "PPP p")}>
                        {formatDistanceToNow(user.createdAt, {
                          addSuffix: true,
                        })}
                      </span>
                    </div>

                    {/* Last login */}
                    <div className="text-body-sm col-span-2 flex items-center gap-2 text-[var(--stone)]">
                      {lastSession ? (
                        <>
                          <CheckCircle2
                            className="h-3.5 w-3.5 text-[var(--gold-deep)]"
                            strokeWidth={1.25}
                          />
                          <span title={format(lastSession.createdAt, "PPP p")}>
                            {formatDistanceToNow(lastSession.createdAt, {
                              addSuffix: true,
                            })}
                          </span>
                        </>
                      ) : (
                        <>
                          <Clock
                            className="h-3.5 w-3.5 text-[var(--muted)]"
                            strokeWidth={1.25}
                          />
                          <span>Never</span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="text-body-sm mt-8 flex flex-wrap gap-6 text-[var(--muted)]">
          <div className="flex items-center gap-2">
            <Shield
              className="h-3.5 w-3.5 text-[var(--gold-deep)]"
              strokeWidth={1.25}
            />
            Admin = full access
          </div>
          <div className="flex items-center gap-2">
            <UserIcon className="h-3.5 w-3.5" strokeWidth={1.25} />
            Customer = standard account
          </div>
          <div className="flex items-center gap-2">
            <Package className="h-3.5 w-3.5" strokeWidth={1.25} />
            Trade = designer pricing (Phase 4)
          </div>
          <div className="flex items-center gap-2">
            <Ban
              className="h-3.5 w-3.5 text-[var(--destructive)]"
              strokeWidth={1.25}
            />
            Banned = no login access
          </div>
        </div>

        {/* Help note */}
        <div className="mt-12 border-l-2 border-[var(--gold)] bg-[var(--cream)] px-6 py-4">
          <p className="text-body-sm text-[var(--stone)]">
            <span className="font-medium text-[var(--ink)]">Note:</span> User
            management actions (change role, ban/unban, delete) will be added in
            Phase 2.3 with typed Server Actions + Zod validation.
          </p>
        </div>
      </Section>
    </Container>
  );
}

// ---------- Helpers ----------

function getInitials(name: string): string {
  const trimmed = name.trim();
  if (trimmed === "") return "?";
  const parts = trimmed.split(/\s+/);
  const first = parts[0];
  if (parts.length === 1 || !first) {
    return (first ?? "?").substring(0, 2).toUpperCase();
  }
  const last = parts[parts.length - 1];
  const firstInitial = first[0] ?? "";
  const lastInitial = last?.[0] ?? "";
  return (firstInitial + lastInitial).toUpperCase();
}

function RoleBadge({ role }: { role: "ADMIN" | "CUSTOMER" | "TRADE" }) {
  if (role === "ADMIN") {
    return (
      <LuxuryBadge variant="bestseller" size="md">
        <Shield className="h-3 w-3" strokeWidth={1.5} />
        Admin
      </LuxuryBadge>
    );
  }
  if (role === "TRADE") {
    return (
      <LuxuryBadge variant="limited" size="md">
        <Package className="h-3 w-3" strokeWidth={1.5} />
        Trade
      </LuxuryBadge>
    );
  }
  return (
    <LuxuryBadge variant="subtle" size="md">
      <UserIcon className="h-3 w-3" strokeWidth={1.5} />
      Customer
    </LuxuryBadge>
  );
}

function StatusBadge({
  emailVerified,
  banned,
}: {
  emailVerified: boolean;
  banned: boolean;
}) {
  if (banned) {
    return (
      <LuxuryBadge variant="sale" size="md">
        <Ban className="h-3 w-3" strokeWidth={1.5} />
        Banned
      </LuxuryBadge>
    );
  }
  if (emailVerified) {
    return (
      <LuxuryBadge variant="new" size="md">
        <CheckCircle2 className="h-3 w-3" strokeWidth={1.5} />
        Verified
      </LuxuryBadge>
    );
  }
  return (
    <LuxuryBadge variant="subtle" size="md">
      <Clock className="h-3 w-3" strokeWidth={1.5} />
      Pending
    </LuxuryBadge>
  );
}
