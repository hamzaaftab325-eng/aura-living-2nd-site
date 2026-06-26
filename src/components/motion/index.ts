/**
 * Motion components barrel export.
 * Single import surface for all luxury animation primitives.
 *
 * Usage:
 *   import {
 *     RevealOnScroll, BlurReveal, WordReveal, SplitHeading,
 *     ParallaxImage, ImageReveal, ImageSpotlight, AlternateImage,
 *     StaggerContainer, StaggerItem, ScrollProgress, ScrollIndicator,
 *     Marquee, Counter, Tilt, DrawLine, DecorativeDivider,
 *     CursorFollower, PageLoader, FloatingElement, MagneticWrap,
 *     RippleEffect, SuccessCheckmark, StepProgress,
 *   } from "@/components/motion";
 */

// Reveal + transition wrappers
export { RevealOnScroll } from "./reveal-on-scroll";
export { BlurReveal } from "./blur-reveal";
export { WordReveal } from "./word-reveal";
export { SplitHeading } from "./split-heading";
export { StaggerContainer, StaggerItem } from "./stagger";

// Image effects
export { ParallaxImage } from "./parallax-image";
export { ImageReveal } from "./image-reveal";
export { ImageSpotlight } from "./image-spotlight";
export { AlternateImage } from "./alternate-image";

// Decorative
export { DrawLine } from "./draw-line";
export { DecorativeDivider } from "./decorative-divider";
export { FloatingElement } from "./floating-element";

// Interaction wrappers
export { MagneticWrap } from "./magnetic-wrap";
export { RippleEffect } from "./ripple-effect";

// UI effects
export { ScrollProgress } from "./scroll-progress";
export { ScrollIndicator } from "./scroll-indicator";
export { Marquee } from "./marquee";
export { Counter } from "./counter";
export { Tilt } from "./tilt";

// Status / progress
export { SuccessCheckmark } from "./success-checkmark";
export { StepProgress } from "./step-progress";

// System
export { CursorFollower } from "./cursor-follower";
export { PageLoader } from "./page-loader";
