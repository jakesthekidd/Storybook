# PrimeNG Storybook Components

This directory contains Storybook stories for PrimeNG components following a standardized structure.

## Directory Structure

```
/src/stories/primeng/
├── {ComponentName}/
│   └── {ComponentName}.stories.ts
└── README.md
```

## Story File Structure

Each component story follows this pattern:

### 1. Import Structure
```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ComponentModule } from 'primeng/component';
// Additional imports as needed (FormsModule, etc.)
```

### 2. Meta Configuration
```typescript
const meta: Meta = {
  title: 'PrimeNG/{ComponentName}',
  decorators: [
    moduleMetadata({
      imports: [ComponentModule, /* other required modules */],
    }),
  ],
  argTypes: {
    // Define controls for component properties
  },
  args: {
    // Define default values
  }
};
```

### 3. Story Variants

Each component should include stories for:

- **Default**: Basic component with default args
- **All Variants**: Different visual styles (sizes, colors, states)
- **All States**: Different functional states (disabled, loading, invalid, etc.)
- **Interactive Examples**: Complex examples showing real-world usage

### 4. Styling Guidelines

- **No inline colors or spacing**: Use only PrimeNG CSS variables and classes
- **Use PrimeNG utility classes**: `flex`, `gap-3`, `mt-1`, `w-full`, etc.
- **Leverage PrimeNG theming**: Use severity props and built-in variants
- **Maintain accessibility**: Ensure proper ARIA attributes and semantic markup

## Available Components

### Form Components
- **Button**: Action buttons with all severities and states
- **InputText**: Text input with validation states
- **Dropdown**: Select dropdown with filtering and custom templates

### Layout Components  
- **Card**: Content cards with headers, footers, and actions

## Adding New Components

1. Create a new directory: `/src/stories/primeng/{ComponentName}/`
2. Create the story file: `{ComponentName}.stories.ts`
3. Follow the established patterns shown in existing components
4. Include comprehensive argTypes for all component properties
5. Create stories for all variants and states
6. Use only PrimeNG CSS variables and utility classes

## Best Practices

- **Comprehensive Coverage**: Include all component variants and states
- **Real-world Examples**: Show practical usage scenarios
- **Consistent Naming**: Use descriptive story names that reflect the variant
- **Proper Controls**: Configure argTypes to provide useful Storybook controls
- **Documentation**: Use description properties in argTypes for clarity
- **Accessibility**: Ensure examples follow accessibility best practices

## Example argTypes Patterns

```typescript
// For text properties
propertyName: {
  control: 'text',
  description: 'Description of the property'
},

// For boolean properties
disabled: {
  control: 'boolean',
  description: 'Disabled state'
},

// For select options
severity: {
  control: 'select',
  options: ['secondary', 'success', 'info', 'warning', 'danger'],
  description: 'Visual severity level'
},

// For complex objects
options: {
  control: 'object',
  description: 'Array of available options'
}
```

This structure ensures consistency across all PrimeNG component stories and provides a comprehensive showcase of component capabilities.
