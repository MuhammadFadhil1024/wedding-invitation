---
name: revision-tasks
overview: "Implement 4 revision tasks: 1) Remove batik background from cover page, 2) Add maroon flower to Opening section top-right, 3) Fix Hero section couple names color (not white), 4) Add padding to Quote section content to avoid corner ornaments overlap"
design:
  architecture:
    framework: react
  styleKeywords:
    - Traditional Javanese
    - Maroon & Gold
    - Elegant
  fontSystem:
    fontFamily: Nunito Sans
    heading:
      size: clamp(2.5rem, 5vw, 4.5rem)
      weight: 400
    subheading:
      size: clamp(1rem, 2vw, 1.25rem)
      weight: 400
    body:
      size: 1rem
      weight: 400
  colorSystem:
    primary:
      - "#5A1E24"
      - "#C9A24B"
    background:
      - "#F5EBD7"
      - "#5B3A1E"
    text:
      - "#1E1410"
      - "#5B3A1E"
    functional:
      - "#5A1E24"
      - "#C9A24B"
todos:
  - id: remove-cover-batik
    content: Remove BatikBackground from cover overlay in Invitation.tsx (lines 102-107)
    status: completed
  - id: add-opening-flower
    content: Add maroon melati flower to top-right of OpeningSection.tsx
    status: completed
  - id: fix-hero-text-color
    content: Change couple names from text-white to text-sogan in HeroSection.tsx
    status: completed
  - id: add-quote-padding
    content: Add horizontal padding to QuoteSection content container
    status: completed
  - id: verify-changes
    content: Run lint and typecheck to verify all changes
    status: completed
    dependencies:
      - remove-cover-batik
      - add-opening-flower
      - fix-hero-text-color
      - add-quote-padding
---

## Product Overview

Wedding invitation website with 4 revision tasks to improve the visual design and readability.

## Core Features

1. **Remove batik from cover page** - Eliminate the BatikBackground component from the cover overlay in Invitation.tsx
2. **Add maroon flower to Opening section** - Place a maroon-colored flower ornament in the top-right corner of OpeningSection
3. **Fix Hero section text color** - Change couple names from white to a readable color (sogan/arang) on the hero background
4. **Add padding to Quote section** - Add horizontal padding to content so it doesn't overlap with corner ornaments

## Tech Stack

- Framework: Next.js 15 with React 18 (App Router)
- Styling: Tailwind CSS v4 with custom theme variables
- Animation: motion/react (Framer Motion)
- Language: TypeScript

## Implementation Approach

Each task modifies specific components with minimal, targeted changes:

1. **Cover page batik removal**: Remove BatikBackground wrapper from cover overlay in Invitation.tsx (lines 102-107), keep only the solid maroon gradient background
2. **Opening section flower**: Add Ornament component with type="melati" in top-right position, colored maroon, in OpeningSection.tsx
3. **Hero section text color**: Change text-white to text-sogan or text-arang for couple names in HeroSection.tsx (line 61)
4. **Quote section padding**: Add px-6 md:px-12 to the content container (max-w-3xl mx-auto) in QuoteSection.tsx

## Architecture Design

No architectural changes needed - all modifications are within existing component files.

## Directory Structure

```
c:/TUBES/my-wedding/
├── app/[slug]/Invitation.tsx           # [MODIFY] Remove batik from cover
├── components/sections/
│   ├── OpeningSection.tsx               # [MODIFY] Add maroon flower top-right
│   ├── HeroSection.tsx                  # [MODIFY] Fix text color
│   └── QuoteSection.tsx                 # [MODIFY] Add horizontal padding
```

## Key Code Structures

- BatikBackground component: used in cover (Invitation.tsx) and OpeningSection.tsx
- Ornament component: type="melati" for flower, supports color via className
- Theme colors available: --maroon, --sogan, --arang, --emas, --gading

No new UI design needed - modifying existing components to match design system.