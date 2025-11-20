# DedLift Color Palette

## Overview
All components in the DedLift project must use the defined color palette instead of generic colors (gray, black, white, etc.).

## Color Variables

The color palette consists of 10 colors from lightest to darkest:

- `--color-1`: `#dfefdd` (Lightest - Background)
- `--color-2`: `#abcab4` (Light backgrounds, borders)
- `--color-3`: `#9dc8a3` (Accent light)
- `--color-4`: `#9cc7a4` (Border medium)
- `--color-5`: `#80b790` (Accent medium)
- `--color-6`: `#679c79` (Text light)
- `--color-7`: `#4e815b` (Accent dark)
- `--color-8`: `#355544` (Text secondary)
- `--color-9`: `#18342b` (Text secondary, icons)
- `--color-10`: `#11231c` (Darkest - Primary text, foreground)

## Semantic Mappings

- **Background**: `var(--color-1)` or `bg-[var(--color-1)]`
- **Primary Text**: `var(--color-10)` or `text-[var(--color-10)]`
- **Secondary Text**: `var(--color-8)` or `text-[var(--color-8)]`
- **Light Text**: `var(--color-6)` or `text-[var(--color-6)]`
- **Icons**: `var(--color-9)` or `text-[var(--color-9)]`
- **Hover States**: Use `var(--color-9)` for hover on `var(--color-10)` elements

## Usage in Components

### Tailwind Classes
```tsx
// Text colors
className="text-[var(--color-10)]"  // Primary text
className="text-[var(--color-9)]"   // Secondary text/icons
className="text-[var(--color-8)]"   // Lighter text

// Background colors
className="bg-[var(--color-1)]"      // Light background
className="bg-[var(--color-2)]"     // Card backgrounds
className="bg-gradient-to-br from-[var(--color-9)] to-[var(--color-10)]"  // Dark gradients
```

### Inline Styles
```tsx
style={{ color: 'var(--color-10)' }}
style={{ backgroundColor: 'var(--color-1)' }}
```

## Rules

1. **Never use generic colors**: Avoid `gray-*`, `black`, `white` classes. Always use the palette.
2. **Use CSS variables**: Always reference colors via `var(--color-X)` or Tailwind `text-[var(--color-X)]`
3. **Consistent hover states**: Use adjacent colors in the palette for hover effects (e.g., `color-10` → `color-9` on hover)
4. **Dark elements**: Use `color-9` and `color-10` for dark UI elements, icons, and primary text
5. **Light elements**: Use `color-1` through `color-3` for backgrounds and light accents

## Examples

### Navigation Links
```tsx
<Link className="text-[var(--color-10)] hover:text-[var(--color-9)]">
```

### Icons
```tsx
<svg className="text-[var(--color-9)]" />
```

### Cards with Dark Icons
```tsx
<div className="bg-gradient-to-br from-[var(--color-9)] to-[var(--color-10)]">
  <Icon className="text-white" />
</div>
```


