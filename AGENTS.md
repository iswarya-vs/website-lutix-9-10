# Project Guidance

## User Preferences

- Recreate the Lutix DeepTech company website as a modern single-page marketing site
- Single-page layout with anchor navigation between sections
- Professional, modern technology/AI brand aesthetic
- Distinctive non-default typography across headings and body
- Responsive design that works on desktop and mobile

## Verified Commands

- **typecheck**: `pnpm typecheck`
- **fix**: `pnpm fix`
- **build**: `pnpm build`

## Learnings

- Single-page anchor site: root route renders Layout + HomePage directly; anchor hrefs must match each Section id prop.
- Tailwind color tokens used with alpha modifiers (bg-card/70) must be declared as oklch(var(--x) / <alpha-value>) or the build fails.
- biome useValidAnchor rejects onClick on <a>; use SheetClose asChild wrapping the anchor to close the mobile drawer.
- biome useSemanticElements rejects role="status" on a div; use the native <output> element for success/status regions.
- Candid variant results arrive as {__kind__:'ok'|'err'}; branch on result.__kind__ and read .err for the backend error message.
- OQL auto-derivation has no built-in option resolver: a record field of type ?Text needs a top-level-imported <Type>Value.mo module exporting _toRow : ?Text -> OQL.Value.
- caffeineai-email 0.3.0 exposes sendServiceEmail(fromUsername, recipients, subject, htmlBody) : async SendResult; a failed send returns #err and does not trap.
- EnquiryId is declared in src/backend/types/common.mo; lib modules must import Common to reference it.
- Verified commands: frontend pnpm typecheck / pnpm fix / pnpm build from src/frontend/; backend mops check --fix / mops build from src/backend/; pnpm bindgen from root.
