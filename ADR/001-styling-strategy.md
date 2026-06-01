# ADR 001: Styling Strategy

## Context
We need a unified styling approach to prevent CSS bloat and maintain a consistent design system across the commerce platform.

## Decision
1. **Tailwind CSS Only:** All component styling must be done using Tailwind CSS utility classes.
2. **No Global CSS:** Developers are strictly forbidden from creating new `.css` or `.scss` files, except for the root `globals.css` which is managed by the core team.
3. **No Inline Styles:** The `style={{}}` prop in React should be avoided unless calculating dynamic layout values (like absolute positioning coordinates).