# Builder.io Integration with PrimeNG

## 🚀 Quick Setup

Your Builder.io components are ready! Here's how to integrate them:

### 1. Import in your main app module:

```typescript
// app.module.ts
import { BuilderComponentsModule } from './builder/builder.module';
import { registerBuilderComponents } from './builder/register-components';

@NgModule({
  imports: [
    // ... other imports
    BuilderComponentsModule
  ]
})
export class AppModule {
  constructor() {
    // Register components with Builder.io
    registerBuilderComponents();
  }
}
```

### 2. Use in Builder.io:

1. Go to [Builder.io](https://builder.io) and create/open your space
2. Create a new page or section
3. Look for these components in the sidebar:
   - **PrimeNG Button** (in Form Controls group)
   - **PrimeNG Input** (in Form Controls group)  
   - **PrimeNG Calendar** (in Form Controls group)

### 3. Drag & Drop:

✅ **Button**: Drag to add buttons with all PrimeNG severity options  
✅ **Input**: Drag to add form inputs with validation and styling  
✅ **Calendar**: Drag to add date pickers with multiple formats  

## 🎨 Theme Integration

These components automatically use your Token Studio variables:

- `--p-primary-color` → Button colors
- `--p-font-family` → Typography
- `--p-border-radius` → Corner radius
- `--p-surface-*` → Background colors

## 📱 Component Features

### Button
- ✅ All PrimeNG severities (primary, secondary, success, warning, danger)
- ✅ Outlined, raised, rounded, text variants
- ✅ Icon support (PrimeIcons)
- ✅ Size options (small, normal, large)
- ✅ Full width option

### Input
- ✅ Multiple input types (text, email, password, number)
- ✅ Label and help text
- ✅ Validation styling
- ✅ Size variants
- ✅ Outlined/filled styles

### Calendar
- ✅ Single/multiple/range date selection
- ✅ Multiple date formats
- ✅ Time picker support
- ✅ Inline or popup display
- ✅ Min/max date constraints

## 🔧 Storybook Integration

Your components work exactly the same as in Storybook:
- Same props
- Same styling  
- Same token variables
- Same theme switching

## 📚 Next Steps

1. **Add more components**: Copy the pattern for Dropdown, Card, etc.
2. **Custom properties**: Add your own props to the registration
3. **Advanced theming**: Map more Token Studio variables
4. **Form validation**: Add validation logic to input components

Your Builder.io integration is complete! 🎉
