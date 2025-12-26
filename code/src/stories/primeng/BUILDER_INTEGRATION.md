# Builder.io Integration Guide for PrimeNG Components

This guide explains how to connect your PrimeNG Storybook components to Builder.io as Visual Components for seamless design-to-code workflows.

## Overview

Each PrimeNG component story can be registered as a Builder.io Visual Component, allowing designers and developers to use these pre-built components directly in Builder.io's visual editor.

## Component Mapping

### Available Components

| Storybook Component | Builder.io Integration | Props Mapping | Status |
|-------------------|----------------------|---------------|---------|
| **Button** | ✅ Ready | `label`, `severity`, `size`, `icon`, `disabled`, `loading` | Complete |
| **InputText** | ✅ Ready | `value`, `placeholder`, `disabled`, `readonly`, `size` | Complete |
| **Dropdown** | ✅ Ready | `options`, `placeholder`, `disabled`, `filter`, `showClear` | Complete |
| **Checkbox** | ✅ Ready | `label`, `checked`, `disabled`, `binary` | Complete |
| **RadioButton** | ✅ Ready | `label`, `value`, `disabled`, `name` | Complete |
| **Calendar** | ✅ Ready | `placeholder`, `dateFormat`, `showIcon`, `showTime` | Complete |
| **Dialog** | ✅ Ready | `header`, `width`, `height`, `modal`, `closable` | Complete |
| **TabView** | ✅ Ready | `activeIndex`, `closable`, `scrollable` | Complete |
| **Table** | ✅ Ready | `data`, `paginator`, `rows`, `sortable`, `loading` | Complete |
| **Toast** | ✅ Ready | `position`, `autoZIndex`, `preventDuplicates` | Complete |
| **Card** | ✅ Ready | `header`, `subheader`, `content`, `footer` | Complete |

## Integration Steps

### 1. Register Components in Builder.io

For each component, create a Visual Component registration:

```typescript
// Example: Button Component Registration
import { Builder } from '@builder.io/sdk';
import { ButtonComponent } from './path/to/button-component';

Builder.registerComponent(ButtonComponent, {
  name: 'PrimeNG Button',
  image: 'https://cdn.builder.io/api/v1/image/assets%2Fprimeng-button-icon',
  inputs: [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Click me',
      helperText: 'Button text'
    },
    {
      name: 'severity',
      type: 'string',
      enum: ['primary', 'secondary', 'success', 'info', 'warning', 'danger'],
      defaultValue: 'primary',
      helperText: 'Visual style of the button'
    },
    {
      name: 'size',
      type: 'string',
      enum: ['small', 'normal', 'large'],
      defaultValue: 'normal',
      helperText: 'Size of the button'
    },
    {
      name: 'icon',
      type: 'string',
      helperText: 'PrimeIcons class name (e.g., pi pi-check)'
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Disable button interaction'
    },
    {
      name: 'loading',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Show loading spinner'
    }
  ],
  defaultStyles: {
    display: 'inline-block',
    margin: '8px'
  }
});
```

### 2. Component Input Mapping

Each Storybook `argTypes` configuration maps directly to Builder.io inputs:

#### Button Component
```typescript
// Storybook argTypes → Builder.io inputs
{
  label: { control: 'text' } → { name: 'label', type: 'string' },
  severity: { control: 'select', options: [...] } → { name: 'severity', type: 'string', enum: [...] },
  disabled: { control: 'boolean' } → { name: 'disabled', type: 'boolean' }
}
```

#### Form Components (InputText, Dropdown, etc.)
```typescript
{
  placeholder: { control: 'text' } → { name: 'placeholder', type: 'string' },
  disabled: { control: 'boolean' } → { name: 'disabled', type: 'boolean' },
  options: { control: 'object' } → { name: 'options', type: 'list', subFields: [...] }
}
```

### 3. Token Integration

All components reference the design tokens from `tokens.css`:

```typescript
// Include in component registration
{
  name: 'PrimeNG Button',
  // ... other config
  meta: {
    designTokens: {
      theme: 'Uses PrimeNG theme tokens. Customize in tokens.css.',
      tokens: [
        '--brand-primary',
        '--brand-secondary', 
        '--brand-button-padding-y',
        '--brand-button-padding-x',
        '--brand-border-radius'
      ]
    }
  }
}
```

### 4. Variant Registration

Each Storybook story becomes a Builder.io variant:

```typescript
// Register component variants
Builder.registerComponent(ButtonComponent, {
  name: 'PrimeNG Button',
  // ... base config
  variations: [
    {
      name: 'Primary',
      inputs: { severity: 'primary', label: 'Primary Button' }
    },
    {
      name: 'Secondary', 
      inputs: { severity: 'secondary', label: 'Secondary Button' }
    },
    {
      name: 'Loading',
      inputs: { loading: true, label: 'Loading...' }
    }
  ]
});
```

## Implementation Workflow

### Step 1: Component Setup
1. Import your Angular component into Builder.io
2. Configure the component inputs based on Storybook argTypes
3. Set default values from Storybook args
4. Add component image/icon for Builder.io library

### Step 2: Props Configuration
1. Map each Storybook control to appropriate Builder.io input type
2. Include validation rules and helper text
3. Set up conditional inputs (e.g., show time format only when showTime is enabled)
4. Configure nested object inputs for complex props

### Step 3: Styling Integration
1. Reference design tokens in component CSS
2. Add hover states and interactions
3. Ensure responsive behavior
4. Test dark/light theme compatibility

### Step 4: Testing & Validation
1. Test each variant in Builder.io editor
2. Verify props are correctly passed and rendered
3. Check responsive behavior across devices
4. Validate accessibility features

## Design Token Usage

All components are designed to use the centralized design tokens:

```css
/* Components automatically use these tokens */
--brand-primary: var(--blue-500);
--brand-secondary: var(--gray-500);
--brand-success: var(--green-500);
--brand-warning: var(--yellow-500);
--brand-danger: var(--red-500);

/* Spacing tokens */
--brand-spacing-sm: 0.5rem;
--brand-spacing-md: 0.75rem;
--brand-spacing-lg: 1rem;

/* Typography tokens */
--brand-font-family: var(--font-family);
--brand-font-size: var(--font-size);
```

## Builder.io Specific Features

### Custom Field Types
```typescript
// For complex inputs like Table data
{
  name: 'data',
  type: 'list',
  subFields: [
    { name: 'id', type: 'string' },
    { name: 'name', type: 'string' },
    { name: 'status', type: 'string', enum: ['active', 'inactive'] }
  ],
  defaultValue: []
}
```

### Conditional Inputs
```typescript
// Show dateFormat only when not timeOnly
{
  name: 'dateFormat',
  type: 'string',
  showIf: 'options.get("timeOnly") !== true',
  defaultValue: 'mm/dd/yy'
}
```

### Rich Text Support
```typescript
// For components that support rich content
{
  name: 'content',
  type: 'richText',
  defaultValue: '<p>Default content</p>'
}
```

## Example Registration Code

Here's a complete example for registering the Button component:

```typescript
import { Builder } from '@builder.io/sdk';
import { PrimeNGButtonComponent } from './components/primeng-button.component';

Builder.registerComponent(PrimeNGButtonComponent, {
  name: 'PrimeNG Button',
  image: 'https://cdn.builder.io/api/v1/image/assets%2Fyour-button-icon',
  inputs: [
    {
      name: 'label',
      type: 'string',
      required: true,
      defaultValue: 'Button',
      helperText: 'Text displayed on the button'
    },
    {
      name: 'severity',
      type: 'string',
      enum: ['primary', 'secondary', 'success', 'info', 'warning', 'danger'],
      defaultValue: 'primary',
      helperText: 'Visual style and color scheme'
    },
    {
      name: 'size',
      type: 'string', 
      enum: ['small', 'normal', 'large'],
      defaultValue: 'normal',
      helperText: 'Button size'
    },
    {
      name: 'icon',
      type: 'string',
      helperText: 'PrimeIcons class (e.g., pi pi-check)'
    },
    {
      name: 'iconPos',
      type: 'string',
      enum: ['left', 'right', 'top', 'bottom'],
      defaultValue: 'left',
      showIf: 'options.get("icon")',
      helperText: 'Position of the icon relative to text'
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Disable button interactions'
    },
    {
      name: 'loading',
      type: 'boolean', 
      defaultValue: false,
      helperText: 'Show loading spinner'
    },
    {
      name: 'outlined',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Use outlined button style'
    },
    {
      name: 'text',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Use text-only button style'
    },
    {
      name: 'raised',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Add elevated appearance'
    },
    {
      name: 'rounded',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Use rounded corners'
    }
  ],
  meta: {
    designTokens: 'Uses PrimeNG theme tokens. Customize in tokens.css.',
    documentation: 'https://your-storybook-url.com/?path=/story/primeng-button'
  },
  defaultStyles: {
    display: 'inline-block',
    margin: '4px'
  }
});
```

## Benefits

1. **Consistent Design**: All components use the same design tokens
2. **Type Safety**: Props are validated by Builder.io
3. **Developer Experience**: Direct connection between Storybook and Builder.io
4. **Design System**: Enforces design system usage across teams
5. **Customization**: Easy theming through tokens.css
6. **Documentation**: Each component links back to Storybook documentation

## Next Steps

1. **Set up Builder.io SDK** in your Angular project
2. **Register components** one by one, starting with Button
3. **Test integration** in Builder.io editor
4. **Create component library** in Builder.io for team usage
5. **Document usage patterns** for your design team
6. **Set up CI/CD** to automatically update components when Storybook changes

## Resources

- [Builder.io Component Registration](https://www.builder.io/c/docs/custom-components)
- [PrimeNG Documentation](https://primeng.org/)
- [Design Tokens Specification](https://design-tokens.github.io/community-group/)
- [Storybook Integration Guide](https://storybook.js.org/docs/angular/get-started/introduction)

---

**Note**: Uses PrimeNG theme tokens. Customize in tokens.css for consistent brand theming across all components.
