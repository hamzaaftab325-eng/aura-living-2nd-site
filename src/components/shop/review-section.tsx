"use client";

import Image from "next/image";
import { Container, Section, Eyebrow } from "@/components/layout";
import { RevealOnScroll } from "@/components/motion";
import { Star } from "lucide-react";
import { format } from "date-fns";
import type { Review } from "@prisma/client";

/**
 * ReviewSection — displays product reviews with rating summary.
 * Client component (needed for potential "write review" form later).
 */

interface ReviewWithImages extends Review {
  images: { id: string; url: string; alt: string | null }[];
}

interface ReviewSummary {
  average: number;
  count: number;
  distribution: number[];
}

export function ReviewSection({
  productId,
  reviews,
  summary,
}: {
  productId: string;
  reviews: ReviewWithImages[];
  summary: ReviewSummary;
}) {
  if (summary.count === 0) {
    return null;
  }

  return (
    <Section spacing="lg" tone="default">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          {/* Summary */}
          <RevealOnScroll variant="fade">
            <div className="flex flex-col gap-4">
              <Eyebrow tone="gold">Customer Reviews</Eyebrow>
              <div className="flex items-center gap-4">
                <span className="text-display-md font-medium text-[var(--ink)]">
                  {summary.average.toFixed(1)}
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= Math.round(summary.average) ? "fill-[var(--gold)] text-[var(--gold)]" : "text-[var(--line)]"}`}
                        strokeWidth={1}
                      />
                    ))}
                  </div>
                  <span className="text-body-sm text-[var(--muted)]">
                    Based on {summary.count} review
                    {summary.count !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Distribution bars */}
              <div className="mt-4 flex flex-col gap-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = summary.distribution[star - 1] ?? 0;
                  const pct =
                    summary.count > 0 ? (count / summary.count) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-body-sm w-8 text-[var(--muted)]">
                        {star}★
                      </span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--line)]">
                        <div
                          className="h-full rounded-full bg-[var(--gold)] transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-body-sm w-8 text-right text-[var(--muted)]">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </RevealOnScroll>

          {/* Individual reviews */}
          <div className="flex flex-col gap-8">
            {reviews.map((review, i) => (
              <RevealOnScroll
                key={review.id}
                variant="fade-up"
                delay={i * 0.1}
                amount={0.2}
              >
                <div className="border-b border-[var(--line)] pb-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3">
                        <span className="text-body-md font-medium text-[var(--ink)]">
                          {review.userName ?? "Anonymous"}
                        </span>
                        {review.isVerified && (
                          <span className="label-caps rounded-full bg-[var(--cream)] px-2 py-0.5 text-[0.625rem] text-[var(--gold-deep)]">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3.5 w-3.5 ${star <= review.rating ? "fill-[var(--gold)] text-[var(--gold)]" : "text-[var(--line)]"}`}
                            strokeWidth={1}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-body-sm text-[var(--muted)]">
                      {format(review.createdAt, "MMM yyyy")}
                    </span>
                  </div>

                  {review.title && (
                    <h4 className="text-headline-sm mt-4 font-medium text-[var(--ink)]">
                      {review.title}
                    </h4>
                  )}
                  <p className="text-body-md mt-2 leading-relaxed text-[var(--stone)]">
                    {review.body}
                  </p>

                  {/* Review images */}
                  {review.images.length > 0 && (
                    <div className="mt-4 flex gap-3">
                      {review.images.map((img) => (
                        <div
                          key={img.id}
                          className="relative h-20 w-20 overflow-hidden"
                        >
                          <Image
                            src={img.url}
                            alt={img.alt ?? "Review photo"}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
