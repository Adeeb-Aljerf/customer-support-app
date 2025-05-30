# Icon System Documentation

This directory contains a centralized icon management system for the customer support app, using Hero Icons with Figma design specifications.

## Structure

```
src/components/common/icons/
├── index.js          # Central icon exports and mappings
├── Icon.jsx          # Main icon component (recommended)
├── IconWrapper.jsx   # Low-level wrapper component
├── IconShowcase.jsx  # Demo/development component
├── main.js          # Main export file
└── README.md        # This documentation
```

## Available Icons

All icons are from Hero Icons library and include both outline and solid variants:

- `document-chart-bar`
- `magnifying-glass`
- `cog-6-tooth`
- `bell`
- `arrow-right-start-on-rectangle`
- `phone`
- `envelope`
- `user-group`
- `user`
- `user-circle`
- `pencil-square`
- `paper-clip`
- `squares-2x2`
- `ticket`
- `identification`
- `x-circle`
- `check-circle`
- `information-circle`
- `arrow-left`
- `ellipsis-horizontal`
- `x-mark`
- `funnel`
- `face-smile`
- `map-pin`
- `arrows-up-down`
- `chevron-double-right`
- `chevron-left`

## Usage

### Method 1: Using the Icon Component (Recommended)

```jsx
import { Icon } from '@/components/common/icons/main.js';

// Basic usage
<Icon name="user" />

// With custom size and color
<Icon name="bell" size={20} className="text-red-500" />

// Solid variant
<Icon name="check-circle" variant="solid" className="text-green-600" />
```

### Method 2: Direct Icon Import

```jsx
import { UserIcon, BellIcon } from '@/components/common/icons/main.js';
import IconWrapper from '@/components/common/IconWrapper.jsx';

<IconWrapper icon={UserIcon} size={24} />
<IconWrapper icon={BellIcon} size={20} className="text-red-500" />
```

### Method 3: Using Icon Mappings

```jsx
import { ICONS, ICONS_SOLID } from '@/components/common/icons/main.js';

const iconName = 'user';
const IconComponent = ICONS[iconName];
<IconComponent className="w-6 h-6" />
```

## Figma Design Specifications

The icon system is designed to match your Figma specifications:

- **Layout Container**: 204px width × 196px height
- **Gap**: 12px between icons
- **Default Size**: 24px × 24px
- **Stroke Width**: 1.5 for outline icons

## Component Props

### Icon Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | required | Icon name (e.g., 'user', 'bell') |
| `variant` | 'outline' \| 'solid' | 'outline' | Icon style variant |
| `size` | number | 24 | Icon size in pixels |
| `className` | string | '' | Additional CSS classes |
| `color` | string | 'currentColor' | Icon color |

### IconWrapper Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | Component | required | Hero Icon component |
| `size` | number | 24 | Icon size in pixels |
| `variant` | 'outline' \| 'solid' | 'outline' | Icon style variant |
| `className` | string | '' | Additional CSS classes |
| `color` | string | 'currentColor' | Icon color |

## Examples

### Navigation Icons
```jsx
<Icon name="user" size={20} />
<Icon name="cog-6-tooth" size={20} />
<Icon name="bell" size={20} />
```

### Action Icons
```jsx
<Icon name="pencil-square" size={16} className="text-blue-600" />
<Icon name="x-mark" size={16} className="text-red-500" />
<Icon name="check-circle" variant="solid" size={16} className="text-green-600" />
```

### Status Icons
```jsx
<Icon name="information-circle" className="text-blue-500" />
<Icon name="x-circle" className="text-red-500" />
<Icon name="check-circle" className="text-green-500" />
```

## Development

To see all available icons in action, import and use the IconShowcase component:

```jsx
import { IconShowcase } from '@/components/common/icons/main.js';

<IconShowcase />
```

## Adding New Icons

1. Add the new icon import to `index.js`
2. Add it to both `ICONS` and `ICONS_SOLID` mappings
3. Export it in `main.js`
4. Add it to the `iconNames` array in `IconShowcase.jsx`
5. Update this README

## Best Practices

1. **Use the Icon component** for most use cases - it's simpler and more consistent
2. **Use consistent sizing** - stick to multiples of 4 (16, 20, 24, 32)
3. **Apply colors via className** for better theme integration
4. **Use semantic names** when possible (e.g., 'user' instead of 'person')
5. **Test with IconShowcase** before deploying new icons
