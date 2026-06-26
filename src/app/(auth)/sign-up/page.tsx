import type { Metadata } from "next";
import SignUpForm from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your Aura Living account.",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
