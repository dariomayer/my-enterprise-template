# Styling Guide

## Theming Architecture
- We use Tailwind CSS in combination with Shadcn/ui.
- The entire application's theme (colors, radii, spacing) is controlled centrally via `/apps/web/src/config/theme.config.ts` and `/apps/web/src/globals.css`.

## How to Modify the Theme
1. **Never** hardcode hex colors or explicit border radii directly in components.
2. Use CSS variables defined in `globals.css` (e.g., `bg-primary`, `text-muted-foreground`, `rounded-md`).
3. To change the overall look for a white-label client, update the root CSS variables in `globals.css` and the exported configurations in `theme.config.ts`.
