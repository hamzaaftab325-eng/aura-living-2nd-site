import { redirect } from "next/navigation";
import { getSession } from "@/server/auth";
import { getAddressesByUser } from "@/server/db/queries";
import {
  Container,
  Section,
  Eyebrow,
  LuxuryHeading,
} from "@/components/layout";
import { AddressList } from "@/components/account/address-list";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function AddressesPage() {
  const session = await getSession();
  if (!session) redirect("/sign-in?redirect=/account/addresses");

  const addresses = await getAddressesByUser(session.user.id);

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
            Addresses
          </LuxuryHeading>
          <p className="text-body-md text-[var(--stone)]">
            Manage your shipping and billing addresses.
          </p>
        </div>

        <div className="mt-12">
          <AddressList addresses={addresses} />
        </div>
      </Section>
    </Container>
  );
}
