"use client";

import { useState } from "react";
import { Button, UnderlineInput } from "@/components/ui";
import { Eyebrow } from "@/components/layout";
import {
  createAddress,
  deleteAddress,
  setDefaultAddress,
} from "@/server/actions/address";
import { Check, AlertCircle, Trash2, Star, Plus, X } from "lucide-react";
import type { Address } from "@prisma/client";

export function AddressList({ addresses }: { addresses: Address[] }) {
  const [showForm, setShowForm] = useState(false);

  if (addresses.length === 0 && !showForm) {
    return (
      <div className="flex flex-col items-center gap-6 border border-[var(--line)] bg-[var(--cream)] px-8 py-20 text-center">
        <p className="text-body-md text-[var(--stone)]">
          No saved addresses yet. Add one for faster checkout.
        </p>
        <Button variant="primary" size="lg" onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4" strokeWidth={1.5} />
          Add Address
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Eyebrow>Saved Addresses ({addresses.length})</Eyebrow>
        {!showForm && (
          <Button
            variant="outline-luxury"
            size="sm"
            onClick={() => setShowForm(true)}
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
            Add New
          </Button>
        )}
      </div>

      {showForm && <AddressForm onCancel={() => setShowForm(false)} />}

      <div className="grid gap-4 md:grid-cols-2">
        {addresses.map((addr) => (
          <AddressCard key={addr.id} address={addr} />
        ))}
      </div>
    </div>
  );
}

function AddressCard({ address }: { address: Address }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete(e: React.FormEvent) {
    e.preventDefault();
    if (!confirm("Delete this address?")) return;
    setLoading(true);
    const formData = new FormData();
    formData.set("id", address.id);
    await deleteAddress(formData);
    setLoading(false);
  }

  async function handleSetDefault(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.set("id", address.id);
    await setDefaultAddress(formData);
    setLoading(false);
  }

  return (
    <div className="relative border border-[var(--line)] bg-white p-6">
      {address.isDefault && (
        <span className="label-caps absolute top-4 right-4 rounded-full bg-[var(--gold)] px-2 py-0.5 text-[0.625rem] text-[var(--ink)]">
          Default
        </span>
      )}
      <div className="flex flex-col gap-1">
        <p className="text-body-md font-medium text-[var(--ink)]">
          {address.firstName} {address.lastName}
        </p>
        {address.company && (
          <p className="text-body-sm text-[var(--stone)]">{address.company}</p>
        )}
        <p className="text-body-sm text-[var(--stone)]">{address.line1}</p>
        {address.line2 && (
          <p className="text-body-sm text-[var(--stone)]">{address.line2}</p>
        )}
        <p className="text-body-sm text-[var(--stone)]">
          {address.city}, {address.state} {address.postalCode}
        </p>
        <p className="text-body-sm text-[var(--stone)]">{address.country}</p>
        {address.phone && (
          <p className="text-body-sm text-[var(--stone)]">{address.phone}</p>
        )}
        <p className="label-caps mt-2 text-[var(--muted)]">{address.type}</p>
      </div>

      <div className="mt-4 flex items-center gap-3 border-t border-[var(--line)] pt-4">
        {!address.isDefault && (
          <form onSubmit={handleSetDefault}>
            <button
              type="submit"
              disabled={loading}
              className="link-underline text-body-sm inline-flex items-center gap-1.5 text-[var(--muted)] hover:text-[var(--ink)]"
            >
              <Star className="h-3.5 w-3.5" strokeWidth={1.25} />
              Set as default
            </button>
          </form>
        )}
        <form onSubmit={handleDelete} className="ml-auto">
          <button
            type="submit"
            disabled={loading}
            className="link-underline text-body-sm inline-flex items-center gap-1.5 text-[var(--destructive)]"
          >
            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.25} />
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}

function AddressForm({ onCancel }: { onCancel: () => void }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const formData = new FormData(e.currentTarget);
    const result = await createAddress(formData);
    setLoading(false);
    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({ type: "success", text: "Address saved." });
      setTimeout(() => onCancel(), 1000);
    }
  }

  return (
    <div className="border border-[var(--line)] bg-[var(--cream)] p-8">
      <div className="mb-6 flex items-center justify-between">
        <Eyebrow>Add New Address</Eyebrow>
        <button
          onClick={onCancel}
          className="text-[var(--muted)] hover:text-[var(--ink)]"
        >
          <X className="h-4 w-4" strokeWidth={1.25} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        <UnderlineInput label="First Name" required name="firstName" />
        <UnderlineInput label="Last Name" required name="lastName" />
        <div className="md:col-span-2">
          <UnderlineInput label="Company (optional)" name="company" />
        </div>
        <div className="md:col-span-2">
          <UnderlineInput
            label="Address Line 1"
            required
            name="line1"
            placeholder="House #, Street"
          />
        </div>
        <div className="md:col-span-2">
          <UnderlineInput
            label="Address Line 2 (optional)"
            name="line2"
            placeholder="Apartment, suite, etc."
          />
        </div>
        <UnderlineInput label="City" required name="city" />
        <UnderlineInput
          label="Province"
          required
          name="state"
          placeholder="Punjab"
        />
        <UnderlineInput label="Postal Code" required name="postalCode" />
        <UnderlineInput label="Phone (optional)" name="phone" />
        <div className="md:col-span-2">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              name="isDefault"
              value="true"
              className="h-4 w-4 accent-[var(--gold)]"
            />
            <span className="text-body-sm text-[var(--ink)]">
              Set as default address
            </span>
          </label>
        </div>

        {message && (
          <div
            className={`text-body-sm flex items-center gap-2 border-l-2 px-4 py-3 md:col-span-2 ${message.type === "success" ? "border-[var(--gold-deep)] bg-[var(--cream-warm)] text-[var(--ink)]" : "border-[var(--destructive)] bg-[var(--destructive)]/5 text-[var(--destructive)]"}`}
          >
            {message.type === "success" ? (
              <Check className="h-4 w-4" strokeWidth={1.5} />
            ) : (
              <AlertCircle className="h-4 w-4" strokeWidth={1.5} />
            )}
            {message.text}
          </div>
        )}

        <div className="flex gap-4 md:col-span-2">
          <Button type="submit" variant="primary" size="lg" disabled={loading}>
            {loading ? "Saving..." : "Save Address"}
          </Button>
          <Button
            type="button"
            variant="outline-luxury"
            size="lg"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
