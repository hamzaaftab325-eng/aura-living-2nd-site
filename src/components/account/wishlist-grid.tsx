"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { removeWishlistItem } from "@/server/actions/wishlist";
import { Heart, Trash2, ShoppingBag } from "lucide-react";

interface WishlistItemData {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  variantSku: string | null;
  variantLabel: string | null;
  product: {
    basePrice: unknown; // Prisma Decimal — converted at render time
    images: string[];
  };
}

export function WishlistGrid({ items }: { items: WishlistItemData[] }) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 border border-[var(--line)] bg-[var(--cream)] px-8 py-20 text-center">
        <Heart className="h-12 w-12 text-[var(--muted)]" strokeWidth={0.75} />
        <div>
          <h3 className="text-headline-sm font-medium text-[var(--ink)]">
            Your wishlist is empty
          </h3>
          <p className="text-body-md mt-2 text-[var(--stone)]">
            Save pieces you love by clicking the heart icon on any product.
          </p>
        </div>
        <Link href="/" className="btn-primary">
          <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <WishlistCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function WishlistCard({ item }: { item: WishlistItemData }) {
  const [loading, setLoading] = useState(false);

  async function handleRemove(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    const formData = new FormData();
    formData.set("itemId", item.id);
    await removeWishlistItem(formData);
    setLoading(false);
  }

  const price = Number(item.product.basePrice);
  const image = item.product.images?.[0];

  return (
    <div className="group relative flex flex-col">
      <Link href={`/product/${item.productSlug}`} className="block">
        <div className="aspect-product relative overflow-hidden bg-[var(--cream)]">
          {image && (
            <Image
              src={image}
              alt={item.productName}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
          )}
          <button
            onClick={handleRemove}
            disabled={loading}
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur-md transition-all hover:bg-[var(--destructive)] hover:text-white"
            aria-label="Remove from wishlist"
          >
            <Trash2 className="h-4 w-4" strokeWidth={1.25} />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {item.variantLabel && (
            <span className="label-caps text-[var(--muted)]">
              {item.variantLabel}
            </span>
          )}
          <h3 className="text-headline-sm leading-tight font-medium text-[var(--ink)] transition-colors group-hover:text-[var(--gold-deep)]">
            {item.productName}
          </h3>
          <p className="text-body-md font-medium text-[var(--ink)]/80">
            ₨{price.toLocaleString("en-PK")}
          </p>
        </div>
      </Link>
    </div>
  );
}
