import { redirect } from "next/navigation";
import { getSession } from "@/server/auth";
import { getWishlistByUserId } from "@/server/db/queries";
import {
  Container,
  Section,
  Eyebrow,
  LuxuryHeading,
} from "@/components/layout";
import { WishlistGrid } from "@/components/account/wishlist-grid";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function WishlistPage() {
  const session = await getSession();
  if (!session) redirect("/sign-in?redirect=/account/wishlist");

  const wishlist = await getWishlistByUserId(session.user.id);
  const items = wishlist?.items ?? [];

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
            Wishlist
          </LuxuryHeading>
          <p className="text-body-md text-[var(--stone)]">
            {items.length > 0
              ? `${items.length} saved ${items.length === 1 ? "piece" : "pieces"}`
              : "Your saved pieces will appear here."}
          </p>
        </div>

        <div className="mt-12">
          <WishlistGrid items={items} />
        </div>
      </Section>
    </Container>
  );
}
