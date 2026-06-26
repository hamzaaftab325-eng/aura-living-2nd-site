/**
 * Admin Dashboard — protected page for ADMIN users only.
 *
 * Shows admin stats + management shortcuts.
 * Full CRUD built in Phase 2.3 (admin Server Actions).
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
import { Button } from "@/components/ui";
import { Counter } from "@/components/motion";
import {
  Package,
  Users,
  ShoppingBag,
  FolderTree,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default async function AdminPage() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in?redirect=/admin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/account");
  }

  // Pull real stats from the DB
  const [userCount, productCount, categoryCount, orderCount] =
    await Promise.all([
      db.user.count(),
      db.product.count(),
      db.category.count(),
      db.order.count(),
    ]);

  return (
    <Container>
      <Section spacing="xl">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <Eyebrow tone="gold">Admin Dashboard</Eyebrow>
          <LuxuryHeading variant="display-md" as="h1">
            Aura Living Control
          </LuxuryHeading>
          <p className="text-body-md text-[var(--stone)]">
            Signed in as {session.user.email} ({session.user.role})
          </p>
        </div>

        {/* Stats */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <AdminStat icon={Users} label="Users" value={userCount} />
          <AdminStat icon={Package} label="Products" value={productCount} />
          <AdminStat
            icon={FolderTree}
            label="Categories"
            value={categoryCount}
          />
          <AdminStat icon={ShoppingBag} label="Orders" value={orderCount} />
        </div>

        {/* Management shortcuts */}
        <div className="mt-16">
          <Eyebrow>Manage</Eyebrow>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AdminCard
              icon={Package}
              title="Products"
              description="Add, edit, archive, and feature products."
              href="/admin/products"
            />
            <AdminCard
              icon={FolderTree}
              title="Categories"
              description="Organize products into collections."
              href="/admin/categories"
            />
            <AdminCard
              icon={ShoppingBag}
              title="Orders"
              description="View and update order status."
              href="/admin/orders"
            />
            <AdminCard
              icon={Users}
              title="Customers"
              description="View customers and manage trade accounts."
              href="/admin/customers"
            />
            <AdminCard
              icon={Package}
              title="Inventory"
              description="Track stock and product variants."
              href="/admin/inventory"
            />
            <AdminCard
              icon={Users}
              title="Settings"
              description="Store configuration and policies."
              href="/admin/settings"
            />
          </div>
        </div>

        {/* Back to account */}
        <div className="mt-16 border-t border-[var(--line)] pt-8">
          <Button variant="underline" size="lg" asChild>
            <Link href="/account">← Back to my account</Link>
          </Button>
        </div>
      </Section>
    </Container>
  );
}

function AdminStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Package;
  label: string;
  value: number;
}) {
  return (
    <div className="border border-[var(--line)] bg-[var(--cream)] p-8">
      <Icon className="h-6 w-6 text-[var(--gold-deep)]" strokeWidth={1} />
      <div className="text-display-md mt-4 font-medium text-[var(--ink)]">
        <Counter value={value} duration={1.6} />
      </div>
      <p className="label-caps mt-2 text-[var(--muted)]">{label}</p>
    </div>
  );
}

function AdminCard({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: typeof Package;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 border border-[var(--line)] p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[var(--ink)] hover:shadow-[0_24px_60px_rgba(18,18,18,0.06)]"
    >
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-[var(--gold-deep)]" strokeWidth={1} />
        <ArrowUpRight
          className="h-4 w-4 text-[var(--muted)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--ink)]"
          strokeWidth={1.25}
        />
      </div>
      <h3 className="text-headline-sm font-medium text-[var(--ink)]">
        {title}
      </h3>
      <p className="text-body-sm text-[var(--stone)]">{description}</p>
    </Link>
  );
}
