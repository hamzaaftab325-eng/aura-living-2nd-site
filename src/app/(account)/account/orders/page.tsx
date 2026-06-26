import { redirect } from "next/navigation";
import { getSession } from "@/server/auth";
import { getOrdersByUser } from "@/server/db/queries";
import {
  Container,
  Section,
  Eyebrow,
  LuxuryHeading,
} from "@/components/layout";
import { LuxuryBadge } from "@/components/ui";
import Link from "next/link";
import { ArrowLeft, Package, ShoppingBag } from "lucide-react";
import { format } from "date-fns";

export default async function OrdersPage() {
  const session = await getSession();
  if (!session) redirect("/sign-in?redirect=/account/orders");

  const orders = await getOrdersByUser(session.user.id);

  return (
    <Container>
      <Section spacing="xl">
        <Link
          href="/account"
          className="link-underline text-body-sm inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--ink)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.25} />
          Back to Account
        </Link>

        <div className="mt-8 flex flex-col gap-2">
          <Eyebrow tone="gold">My Account</Eyebrow>
          <LuxuryHeading variant="display-md" as="h1">
            Orders
          </LuxuryHeading>
          <p className="text-body-md text-[var(--stone)]">
            View your order history and track current orders.
          </p>
        </div>

        <div className="mt-12">
          {orders.length === 0 ? (
            <EmptyState
              icon={ShoppingBag}
              title="No orders yet"
              description="When you place your first order, it will appear here."
              ctaHref="/"
              ctaLabel="Start Shopping"
            />
          ) : (
            <div className="flex flex-col gap-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-[var(--line)] bg-[var(--cream)] p-8"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-body-sm text-[var(--muted)]">
                        Order #{order.id.slice(-8).toUpperCase()}
                      </span>
                      <span className="text-body-sm text-[var(--stone)]">
                        {format(order.createdAt, "PPP")}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <OrderStatusBadge status={order.status} />
                      <span className="text-headline-sm font-medium text-[var(--ink)]">
                        ₨{Number(order.total).toLocaleString("en-PK")}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-[var(--line)] pt-4">
                    <p className="label-caps text-[var(--muted)]">
                      {order.items.length} item
                      {order.items.length !== 1 ? "s" : ""}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-4">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="text-body-sm flex items-center gap-2"
                        >
                          <Package
                            className="h-3.5 w-3.5 text-[var(--gold-deep)]"
                            strokeWidth={1}
                          />
                          <span className="text-[var(--ink)]">
                            {item.productName ?? "Product"} × {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {order.trackingNumber && (
                    <div className="mt-4 border-t border-[var(--line)] pt-4">
                      <p className="text-body-sm text-[var(--stone)]">
                        Tracking:{" "}
                        <span className="font-medium text-[var(--ink)]">
                          {order.trackingNumber}
                        </span>
                        {order.carrier && ` via ${order.carrier}`}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>
    </Container>
  );
}

function OrderStatusBadge({ status }: { status: string }) {
  const variant = {
    PENDING: "subtle",
    PROCESSING: "subtle",
    SHIPPED: "bestseller",
    DELIVERED: "new",
    CANCELLED: "sale",
    REFUNDED: "sale",
    FAILED: "sale",
  }[status] as "subtle" | "bestseller" | "new" | "sale";

  return (
    <LuxuryBadge variant={variant} size="md">
      {status}
    </LuxuryBadge>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
  ctaHref,
  ctaLabel,
}: {
  icon: typeof Package;
  title: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <div className="flex flex-col items-center gap-6 border border-[var(--line)] bg-[var(--cream)] px-8 py-20 text-center">
      <Icon className="h-12 w-12 text-[var(--muted)]" strokeWidth={0.75} />
      <div>
        <h3 className="text-headline-sm font-medium text-[var(--ink)]">
          {title}
        </h3>
        <p className="text-body-md mt-2 text-[var(--stone)]">{description}</p>
      </div>
      <Link href={ctaHref} className="btn-primary">
        {ctaLabel}
      </Link>
    </div>
  );
}
