# StudyBud style guide

Short house rules so the code stays clean and easy to grow.

## Formatting

- Prettier formats everything, and it sorts Tailwind classes into a consistent order.
- Run `npm run format` before committing. `npm run lint` fails if a file isn't formatted.
- `.editorconfig` keeps every editor on 2-space indents and LF line endings.

## Folders

| Folder                     | What goes there                                     |
| -------------------------- | --------------------------------------------------- |
| `src/app/`                 | Pages and routes only. Keep them thin.              |
| `src/components/<screen>/` | Pieces used by one screen (e.g. `components/home/`) |
| `src/components/`          | Pieces shared by several screens (`BottomNav`)      |
| `src/lib/`                 | Types, data and logic with no UI                    |

## Components

- One component per file, using a named export: `export function ModuleList()`.
- File names are PascalCase and match the component: `ModuleList.tsx`.
- Keep components small. Once logic grows past a few lines, move it into `src/lib/` as a plain function.
- Pass data in through props and keep data fetching in pages, so components stay easy to reuse.
- Add `"use client"` only to components that need it (state, effects, browser APIs).

## Styling

- Use Tailwind classes and the Pop tokens in `globals.css`: `bg-coral`, `border-ink`, `shadow-pop` and so on.
- Never write raw hex colours in components. If a colour is missing, add a token.
- The Pop look: `border-2 border-ink`, generous rounding, and `shadow-pop` on the main thing on each screen.
- Tap targets are at least 44px (`h-11`).

## Accessibility

- Use real `<button>` and `<Link>`, never a clickable `<div>`.
- Icon-only buttons and links need an `aria-label`. Decorative SVGs get `aria-hidden="true"`.

## Naming

- Components and types: `PascalCase`. Functions and variables: `camelCase`. Constants: `UPPER_SNAKE_CASE`.
- Booleans read as questions: `isActive`, `hasCards`.
