import { redirect } from "next/navigation";
import { getSession } from "@/server/auth";
import {
  Container,
  Section,
  Eyebrow,
  LuxuryHeading,
} from "@/components/layout";
import {
  ProfileForm,
  PasswordChangeForm,
} from "@/components/account/profile-forms";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/sign-in?redirect=/account/profile");

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
            Profile
          </LuxuryHeading>
          <p className="text-body-md text-[var(--stone)]">
            Update your personal information and password.
          </p>
        </div>

        <div className="mt-12 grid gap-16 lg:grid-cols-2">
          <ProfileForm
            initialName={session.user.name ?? ""}
            email={session.user.email}
          />
          <PasswordChangeForm />
        </div>
      </Section>
    </Container>
  );
}
