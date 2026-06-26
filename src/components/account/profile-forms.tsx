"use client";

import { useState } from "react";
import { Button, UnderlineInput } from "@/components/ui";
import { Eyebrow } from "@/components/layout";
import { updateProfile, changePassword } from "@/server/actions/profile";
import { Check, AlertCircle } from "lucide-react";

export function ProfileForm({
  initialName,
  email,
}: {
  initialName: string;
  email: string;
}) {
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleProfileSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const formData = new FormData();
    formData.set("name", name);
    const result = await updateProfile(formData);
    setLoading(false);
    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({ type: "success", text: "Profile updated successfully." });
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Eyebrow>Personal Information</Eyebrow>
        <form
          onSubmit={handleProfileSubmit}
          className="mt-6 flex max-w-md flex-col gap-6"
        >
          <UnderlineInput
            label="Full Name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <UnderlineInput
            label="Email Address"
            type="email"
            value={email}
            disabled
            hint="Email cannot be changed. Contact support if needed."
          />
          {message && <StatusMessage message={message} />}
          <Button type="submit" variant="primary" size="lg" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export function PasswordChangeForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }
    setLoading(true);
    setMessage(null);
    const formData = new FormData();
    formData.set("currentPassword", currentPassword);
    formData.set("newPassword", newPassword);
    const result = await changePassword(formData);
    setLoading(false);
    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({ type: "success", text: "Password changed successfully." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <div>
      <Eyebrow>Change Password</Eyebrow>
      <form
        onSubmit={handlePasswordSubmit}
        className="mt-6 flex max-w-md flex-col gap-6"
      >
        <UnderlineInput
          label="Current Password"
          type="password"
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <UnderlineInput
          label="New Password"
          type="password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          hint="Minimum 8 characters"
        />
        <UnderlineInput
          label="Confirm New Password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={
            confirmPassword && newPassword !== confirmPassword
              ? "Passwords do not match"
              : undefined
          }
        />
        {message && <StatusMessage message={message} />}
        <Button type="submit" variant="primary" size="lg" disabled={loading}>
          {loading ? "Changing..." : "Change Password"}
        </Button>
      </form>
    </div>
  );
}

function StatusMessage({
  message,
}: {
  message: { type: "success" | "error"; text: string };
}) {
  return (
    <div
      className={`text-body-sm flex items-center gap-2 border-l-2 px-4 py-3 ${
        message.type === "success"
          ? "border-[var(--gold-deep)] bg-[var(--cream)] text-[var(--ink)]"
          : "border-[var(--destructive)] bg-[var(--destructive)]/5 text-[var(--destructive)]"
      }`}
    >
      {message.type === "success" ? (
        <Check className="h-4 w-4 shrink-0" strokeWidth={1.5} />
      ) : (
        <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
      )}
      {message.text}
    </div>
  );
}
