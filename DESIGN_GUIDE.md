# Public Reputation Receipts – Design Direction Guide

## App Summary

**Public Reputation Receipts** is a mobile-first trust platform for verifying, reviewing, and reporting businesses. Users can search for businesses, view trust scores and badges, read and share opinions, and file complaints. The UI emphasizes clarity, trust, and accessibility, with a focus on mobile usability and a clean, modern aesthetic.

## Core Design Principles

### 1. **Mobile-First, Responsive Layouts**
- All primary containers use `.mobile-container` for max-width and padding.
- Sticky headers and action bars for easy navigation.
- Generous touch targets (e.g., buttons, cards) with rounded corners.

### 2. **Consistent Use of UI Components**
- **Cards**: Used for business listings and opinions. Always use the `Card` and `BusinessCard` components for these.
- **Buttons**: Use the `Button` component with variants (`primary`, `outline`, `ghost`, etc.) for all actions.
- **Badges & Scores**: Use `TrustBadge` and `TrustScore` for visual trust indicators. Do not create custom trust visuals.
- **Headers**: Use `MobileHeader` for all top-level mobile screens.
- **Search**: Use the `SearchBar` component for all search/filter UIs.

### 3. **Color & Visual Language**
- **Brand Colors**: Use CSS variables from `index.css` (e.g., `--primary`, `--background`, `--card`).
- **Trust System Colors**: Use `--trust-excellent`, `--trust-good`, etc. for trust indicators.
- **Status Colors**: Use `--verified`, `--pending`, `--flagged`, `--under-review` for badges and status chips.
- **Shadows**: Use `.card-shadow`, `.elevated-shadow`, and `.trust-shadow` utility classes for elevation.

### 4. **Typography & Spacing**
- Use Tailwind's font and spacing utilities for consistency.
- Headings: `text-lg`/`text-xl` for titles, `font-semibold`/`font-bold` for emphasis.
- Text: `text-muted-foreground` for secondary info.
- Spacing: Use `gap-*`, `px-*`, `py-*` for layout; avoid hardcoded pixel values.

### 5. **Interaction & Feedback**
- All interactive elements (buttons, cards) have hover and active states.
- Use `Toaster` and `Sonner` for notifications and feedback.
- Use icons from `lucide-react` for visual cues (e.g., search, share, flag).

### 6. **Accessibility**
- Ensure sufficient color contrast (see color variables).
- Use semantic HTML and ARIA labels where appropriate.
- All buttons and inputs must be keyboard accessible.

## Component Reuse Guidelines
- **Never duplicate UI logic or visuals.** Always use or extend existing components (`Button`, `Card`, `BusinessCard`, `TrustBadge`, `TrustScore`, `MobileHeader`, `SearchBar`).
- If a new visual pattern is needed, first check if it can be achieved by extending props or variants of an existing component.
- Only create new components if absolutely necessary and after justifying why reuse/extension is not possible.

## Example Patterns
- **Business List**: Use a grid of `BusinessCard` components.
- **Business Profile**: Use `TrustBadge`, `TrustScore`, and `Card` for opinions.
- **Quick Actions**: Use `Button` with icons and variants for actions like Trending, Near Me, Report.

## Visual Reference
- See `src/index.css` for color and spacing variables.
- See `src/components/ui/` for all reusable UI components.

---

**Follow this guide to ensure a cohesive, maintainable, and user-friendly experience.** 