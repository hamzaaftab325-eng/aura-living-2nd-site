"use client";

/**
 * SoundToggle — toggle UI for enabling/disabling subtle UI sounds.
 *
 * Spec (DESIGN.md → Sound): "Allow users to disable them."
 *
 * Usage:
 *   <SoundToggle />  // floating button bottom-left
 *   <SoundToggle className="..." />  // inline
 */

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { soundsEnabled, toggleSounds } from "@/lib/sound";
import { cn } from "@/lib/utils";

interface SoundToggleProps {
  className?: string;
}

export function SoundToggle({ className }: SoundToggleProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Sync local state with stored preference on mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(soundsEnabled());
  }, []);

  function handleToggle() {
    setEnabled(toggleSounds());
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={enabled ? "Disable sounds" : "Enable sounds"}
      aria-pressed={enabled}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--background)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[var(--ink)]",
        className,
      )}
    >
      {enabled ? (
        <Volume2 className="h-4 w-4 text-[var(--ink)]" strokeWidth={1.25} />
      ) : (
        <VolumeX className="h-4 w-4 text-[var(--muted)]" strokeWidth={1.25} />
      )}
    </button>
  );
}
