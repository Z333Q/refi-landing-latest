# ReFi.Trading Brand Guidelines

## Overview

ReFi.Trading is an AI-powered trading platform that brings institutional-grade trading technology to everyone. This document outlines the comprehensive branding guidelines for the ReFi.Trading platform.

---

## Table of Contents

- [Brand Identity](#brand-identity)
- [Color Palette](#color-palette)
- [Typography](#typography)
- [Logo Usage](#logo-usage)
- [Design Principles](#design-principles)
- [Component Guidelines](#component-guidelines)
- [Navigation](#navigation)
- [Accessibility](#accessibility)
- [Internationalization](#internationalization)

---

## Brand Identity

### Mission
Democratize access to institutional-grade AI trading technology while maintaining full user custody and transparent risk management.

### Brand Values
- **Transparency**: Open, provable, and auditable
- **Accessibility**: Wall Street AI, radically accessible
- **Security**: Self-custodied execution with zero-knowledge proofs
- **Innovation**: Cutting-edge reinforcement learning and cryptography

### Voice & Tone
- **Professional yet approachable**: Technical accuracy without jargon overload
- **Confident but not arrogant**: Focus on facts and capabilities
- **Educational**: Help users understand complex technology
- **Action-oriented**: Clear calls-to-action and next steps

---

## Color Palette

### Primary Colors

#### Charcoal (Background)
- **Primary**: `#101820` - Main background color
- **Deep**: `#0A0F14` - Deeper background variations
- **Light**: `#1E2A35` - Lighter background sections
- **Lighter**: `#2D3A47` - Cards and elevated surfaces
- **Border**: `#2D3A47` - Border elements

**Usage**: Backgrounds, surfaces, container elements

#### Mint (Brand Accent)
- **Primary**: `#0CD4A0` - Primary brand color
- **Dark**: `#0AB889` - Hover states, darker variations
- **Light**: `#4EEDC4` - Highlights, lighter accents

**Usage**: CTAs, links, active states, highlights, success indicators

### Secondary Colors

#### Gray Scale
- **Gray 300**: `#D1D5DB` - Body text
- **Gray 400**: `#9CA3AF` - Secondary text
- **Gray 500**: `#6B7280` - Tertiary text
- **Gray 600**: `#4B5563` - Muted text
- **Gray 700**: `#374151` - Borders
- **Gray 800**: `#1F2937` - Dark borders

#### Status Colors
- **Success**: `#10B981` - Positive states, confirmations
- **Warning**: `#F59E0B` - Warnings, cautions
- **Error**: `#EF4444` - Errors, destructive actions

### Color Usage Rules

**DO:**
- Use mint for primary actions and active states
- Maintain sufficient contrast for readability (WCAG AA minimum)
- Use charcoal variations for depth and hierarchy
- Use status colors consistently across the platform

**DON'T:**
- Never use purple, indigo, or violet hues unless specifically requested
- Don't use mint for backgrounds (too bright)
- Don't mix too many colors in a single view
- Don't use color alone to convey information (ensure text/icons too)

---

## Typography

### Font Family
- **Primary**: Inter
- **Display**: Inter (same as primary for consistency)
- **Fallback**: system-ui, sans-serif

### Font Sizes & Hierarchy

#### Headings
```css
h1: 2.5rem - 3.5rem (40px - 56px) - Page titles
h2: 1.875rem - 2.25rem (30px - 36px) - Section titles
h3: 1.5rem - 1.875rem (24px - 30px) - Subsection titles
h4: 1.25rem (20px) - Card titles
h5: 1.125rem (18px) - Small headings
h6: 1rem (16px) - Smallest headings
```

#### Body Text
```css
Large: 1.25rem (20px) - Hero subtitles, lead paragraphs
Regular: 1rem (16px) - Body text, paragraph text
Small: 0.875rem (14px) - Captions, metadata, helper text
Extra Small: 0.75rem (12px) - Fine print, labels
```

### Line Height
- **Body text**: 150% (1.5) - Optimal readability
- **Headings**: 120% (1.2) - Tighter spacing for impact
- **Small text**: 140% (1.4) - Adequate spacing for small sizes

### Font Weights
- **Regular**: 400 - Body text
- **Medium**: 500 - Emphasized text
- **Semibold**: 600 - Subheadings
- **Bold**: 700 - Headings, CTAs

### Typography Best Practices

**DO:**
- Use tracking-tight for headings
- Limit line length to 65-75 characters for optimal readability
- Use appropriate line height for text size
- Enable font features: kern, liga, calt

**DON'T:**
- Don't use more than 3 font weights in a single view
- Don't use all caps for long text (short labels only)
- Don't use font sizes smaller than 12px
- Don't use poor contrast text colors

---

## Logo Usage

### Logo Variations

#### Primary Logo
- **Format**: SVG (vector)
- **Location**: `/public/green-logo-only-square.png`
- **Color**: Mint green on transparent background
- **Size**: Square format (recommended 64x64px minimum)

#### Wordmark
```
ReFi.Trading
- "ReFi" in mint green (#0CD4A0)
- ".Trading" in white
```

### Logo Guidelines

**Clear Space**: Maintain minimum clear space of 50% of logo height on all sides

**Minimum Size**: 32x32px for icon, 120px width for wordmark

**DO:**
- Use on dark backgrounds (charcoal preferred)
- Maintain aspect ratio when scaling
- Use SVG format for web
- Ensure sufficient contrast

**DON'T:**
- Don't place on busy backgrounds
- Don't distort or skew the logo
- Don't add effects (shadows, gradients, outlines)
- Don't change the logo colors

---

## Design Principles

### 1. Premium Feel
Focus on meticulous attention to detail, intuitive UX, and clean, sophisticated visual presentation.

**Implementation:**
- Subtle animations and micro-interactions
- Thoughtful spacing using 8px grid system
- High-quality imagery and graphics
- Smooth transitions (200-300ms)

### 2. Visual Hierarchy
Establish clear hierarchy using typography, spacing, and color.

**Implementation:**
- Size contrast between elements (3:2 ratio minimum)
- Strategic use of white space
- Color contrast for emphasis
- Consistent layout patterns

### 3. Responsive Design
Optimal viewing experience across all devices.

**Breakpoints:**
```css
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: 1024px - 1440px
Large Desktop: > 1440px
```

### 4. Modern Aesthetics
Contemporary design with tasteful animations.

**Elements:**
- Rounded corners (4px - 8px standard, 12px for cards)
- Subtle shadows for depth
- Grid patterns for texture
- Particle effects (desktop only)
- Gradient accents (mint to mint-light)

### 5. Accessibility First
WCAG AA compliance minimum.

**Requirements:**
- 4.5:1 contrast ratio for text
- 3:1 contrast ratio for UI elements
- Keyboard navigation support
- Screen reader friendly
- Skip links for navigation
- Focus indicators (2px mint outline)

---

## Component Guidelines

### Buttons

#### Primary Button
```tsx
<button className="bg-mint hover:bg-mint-dark text-charcoal font-semibold px-6 py-3 rounded-lg transition-all duration-300">
  Button Text
</button>
```
- **Use for**: Primary actions, main CTAs
- **Colors**: Mint background, charcoal text
- **Hover**: Darker mint with subtle scale
- **Padding**: 24px horizontal, 12px vertical

#### Secondary Button
```tsx
<button className="border-2 border-mint text-mint hover:bg-mint hover:text-charcoal font-semibold px-6 py-3 rounded-lg transition-all duration-300">
  Button Text
</button>
```
- **Use for**: Secondary actions
- **Colors**: Mint border and text, transparent background
- **Hover**: Mint background with charcoal text

#### Tertiary Button
```tsx
<button className="text-gray-300 hover:text-mint transition-colors duration-200">
  Button Text
</button>
```
- **Use for**: Subtle actions, navigation
- **Colors**: Gray text
- **Hover**: Mint text

### Cards

```tsx
<div className="bg-charcoal-lighter rounded-lg p-8 border border-gray-700 hover:border-mint/30 transition-all duration-300">
  Card content
</div>
```

**Specifications:**
- Background: `charcoal-lighter`
- Border: `gray-700` (default), `mint/30` (hover)
- Padding: 32px (p-8)
- Border radius: 8px (rounded-lg)
- Transition: 300ms for smooth interaction

### Inputs

```tsx
<input
  type="text"
  className="w-full px-4 py-3 bg-charcoal border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition-colors text-white"
/>
```

**Specifications:**
- Background: `charcoal`
- Border: `gray-600` (default), `mint` (focus)
- Padding: 16px horizontal, 12px vertical
- Focus ring: 2px mint
- Text color: White

### Badges/Tags

```tsx
<span className="inline-block px-3 py-1 rounded bg-mint/10 border border-mint/20 text-mint text-xs font-medium">
  Tag Text
</span>
```

**Specifications:**
- Background: Mint with 10% opacity
- Border: Mint with 20% opacity
- Text: Mint color
- Padding: 12px horizontal, 4px vertical

### Sections

```tsx
<section className="py-24 md:py-32 bg-charcoal relative overflow-hidden">
  <div className="container mx-auto px-4 md:px-6">
    <div className="max-w-6xl mx-auto">
      Section content
    </div>
  </div>
</section>
```

**Spacing:**
- Vertical padding: 96px (mobile), 128px (desktop)
- Container: Max-width with horizontal padding
- Content: Centered with max-width constraints

---

## Navigation

### Header

**Fixed Header:**
- Background: Transparent (top), Charcoal with shadow (scrolled)
- Height: Variable based on scroll state
- Z-index: 50 (always on top)
- Transition: 300ms for background change

**Navigation Links:**
```tsx
<a className="text-gray-300 hover:text-mint transition-colors duration-200 font-medium">
  Link Text
</a>
```

**Active State:**
```tsx
<a className="text-mint">
  Active Link
</a>
```

### Section Navigation

**Anchor Links:**
- Format: `#section-id`
- Behavior: Smooth scroll with 80px offset (header clearance)
- Active indication: Mint color for current section

**Scroll Spy:**
- Intersection Observer API
- Root margin: `-20% 0px -70% 0px`
- Updates active nav item on scroll

### Breadcrumbs

```tsx
<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'Current Page' }
]} />
```

**Specifications:**
- Home icon for first item
- ChevronRight separator
- Gray text with mint hover
- Current page: White, no link

---

## Accessibility

### Color Contrast
- **Text on charcoal**: Use white or gray-300 minimum
- **Links**: Mint (#0CD4A0) has 4.8:1 contrast on charcoal
- **Interactive elements**: 3:1 minimum for UI components

### Focus States
- **Outline**: 2px solid mint
- **Offset**: 2px outside element
- **Visible on all interactive elements**

### Keyboard Navigation
- Tab order follows visual hierarchy
- All interactive elements focusable
- Skip links for main content
- ESC to close modals/menus

### Screen Readers
- Semantic HTML (nav, main, section, article)
- ARIA labels for icon-only buttons
- Alt text for all images
- Schema.org structured data

### Motion & Animation
- Respect `prefers-reduced-motion`
- Disable complex animations on mobile
- Keep transitions under 400ms
- Provide static alternatives

---

## Internationalization

### Supported Languages
- English (en) - Default
- German (de)
- Spanish (es)
- French (fr)
- Italian (it)
- Portuguese (pt)
- Russian (ru)
- Arabic (ar)
- Hindi (hi)
- Japanese (ja)
- Korean (ko)
- Chinese (zh)

### Translation Guidelines

**DO:**
- Use i18next for all user-facing text
- Test layouts with longer translations (German, Russian)
- Support RTL languages (Arabic, Hebrew)
- Format numbers and dates per locale
- Use appropriate currency symbols

**DON'T:**
- Don't hardcode text in components
- Don't assume English text length
- Don't use images with embedded text
- Don't forget to update all locale files

### RTL Support
```css
[dir="rtl"] {
  text-align: right;
  /* Mirror flex direction */
  flex-direction: row-reverse;
}
```

---

## Spacing System

### 8px Grid System
All spacing should be multiples of 8px:

```
0.5rem = 8px   (space-2)
1rem   = 16px  (space-4)
1.5rem = 24px  (space-6)
2rem   = 32px  (space-8)
3rem   = 48px  (space-12)
4rem   = 64px  (space-16)
6rem   = 96px  (space-24)
8rem   = 128px (space-32)
```

### Layout Spacing
- **Component padding**: 16px - 32px
- **Section padding**: 96px - 128px vertical
- **Card gap**: 32px
- **Element gap**: 16px - 24px

---

## Animation Guidelines

### Timing Functions
```css
ease-out: Entering animations (elements appearing)
ease-in: Exiting animations (elements disappearing)
ease-in-out: State changes (hover, active)
```

### Duration
- **Micro-interactions**: 150ms - 200ms
- **Transitions**: 250ms - 300ms
- **Complex animations**: 400ms - 600ms
- **Never exceed**: 1000ms

### Best Practices
- Use transform and opacity (GPU accelerated)
- Avoid animating width/height
- Add will-change for complex animations
- Disable on mobile for performance

---

## Design Anti-Patterns

### DO NOT:
1. **Purple/Indigo/Violet**: Never use unless explicitly requested
2. **Cookie-cutter designs**: Create unique, production-worthy designs
3. **Over-engineering**: Keep solutions simple and focused
4. **Poor contrast**: Always ensure readability
5. **Inconsistent spacing**: Follow the 8px grid system
6. **Too many fonts**: Stick to Inter across the board
7. **Cluttered interfaces**: Use white space effectively
8. **Slow animations**: Keep under 400ms for user interactions
9. **Missing mobile optimization**: Always responsive
10. **Accessibility shortcuts**: WCAG AA is minimum

---

## Technical Specifications

### Frameworks & Libraries
- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Animation**: Framer Motion
- **i18n**: react-i18next
- **Charts**: Recharts
- **Icons**: Lucide React

### Performance Guidelines
- **First Contentful Paint**: < 1.8s
- **Time to Interactive**: < 3.8s
- **Cumulative Layout Shift**: < 0.1
- **Image optimization**: WebP format, lazy loading
- **Code splitting**: Route-based
- **Animation optimization**: GPU acceleration

### Browser Support
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android

---

## File Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   └── ...              # Feature components
├── pages/               # Route pages
├── lib/                 # Utilities and helpers
├── i18n/               # Internationalization
│   └── locales/        # Translation files
├── hooks/              # Custom React hooks
└── types/              # TypeScript types
```

---

## Brand Assets

### Image Usage
- **Hero images**: High quality, professional
- **Blog images**: Relevant to content, professional
- **Partner logos**: Grayscale with subtle glow effect
- **Icons**: Lucide React icon set only

### Image Specifications
- **Format**: WebP preferred (PNG/JPG fallback)
- **Optimization**: Compressed, lazy-loaded
- **Aspect ratios**: 16:9 for hero, 4:3 for cards
- **Quality**: 80-85% compression

---

## Contact & Resources

### Questions?
For branding questions or clarifications, contact the design team.

### Useful Links
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Inter Font](https://rsms.me/inter/)

---

## Version History

- **v1.0** - Initial brand guidelines (January 2026)
  - Color palette defined
  - Typography system established
  - Component library documented
  - Navigation system implemented
  - Accessibility standards set

---

**Last Updated**: January 2026
**Maintained By**: ReFi.Trading Design Team
