import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ButtonModule } from 'primeng/button';
import { colorPaletteManager } from '../../../theme/color-palette';

type Severity = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger';

interface ButtonArgs {
  label: string;
  disabled?: boolean;
  icon?: string;
  severity?: Severity | null;
  outlined?: boolean;
  text?: boolean;
  raised?: boolean;
  rounded?: boolean;
  size?: 'small' | 'large' | 'normal';
}

// Initialize color palette
if (typeof document !== 'undefined') {
  colorPaletteManager.setThemeMode('light');
}

const meta: Meta<ButtonArgs> = {
  title: 'PrimeNG/Button',
  decorators: [moduleMetadata({ imports: [ButtonModule] })],
  args: { 
    label: 'Button', 
    disabled: false, 
    severity: 'primary', 
    outlined: false, 
    text: false, 
    raised: false, 
    rounded: false, 
    size: 'normal',
    icon: ''
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Text to display on the button'
    },
    severity: { 
      control: 'select', 
      options: ['primary','secondary','success','info','warning','help','danger'],
      description: 'Defines the color scheme from the color palette'
    },
    outlined: {
      control: 'boolean',
      description: 'Add a border with background transparent'
    },
    text: {
      control: 'boolean', 
      description: 'Text button with no background or border'
    },
    raised: {
      control: 'boolean',
      description: 'Add shadow elevation to the button'
    },
    rounded: {
      control: 'boolean',
      description: 'Make the button fully rounded'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button interaction'
    },
    icon: {
      control: 'text',
      description: 'Icon class (e.g., "pi pi-check", "pi pi-times")'
    },
    size: { 
      control: 'radio', 
      options: ['small', 'normal', 'large'],
      description: 'Size of the button'
    },
  },
  render: (args) => ({
    template: `
      <div class="button-demo-container">
        <button
          pButton
          type="button"
          [label]="buttonLabel"
          [disabled]="disabled"
          [icon]="buttonIcon"
          [class]="buttonClasses"
        ></button>
        <div class="palette-info">
          <small>🎨 Colors from Color Palette Manager</small>
        </div>
      </div>
    `,
    props: {
      ...args,
      buttonLabel: args.icon && !args.label ? '' : args.label,
      buttonIcon: args.icon || null,
      buttonClasses: [
        'p-button',
        'palette-button',
        args.severity ? `p-button-${args.severity}` : '',
        args.outlined ? 'p-button-outlined' : '',
        args.text ? 'p-button-text' : '',
        args.raised ? 'p-button-raised' : '',
        args.rounded ? 'p-button-rounded' : '',
        args.size === 'small' ? 'p-button-sm' : '',
        args.size === 'large' ? 'p-button-lg' : ''
      ].filter(Boolean).join(' ').trim()
    },
    styles: [`
      .button-demo-container {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        background: var(--palette-surface-ground, #EFF2F4);
        border-radius: 8px;
        min-height: 120px;
      }

      .palette-info {
        opacity: 0.7;
        font-family: 'Inter', system-ui, sans-serif;
        font-size: 12px;
        color: var(--palette-text-muted, #666);
      }

      /* PALETTE-DRIVEN BUTTON STYLES */
      
      .palette-button {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        font-weight: 500 !important;
        transition: all 0.2s ease !important;
        border: 1px solid transparent !important;
        border-radius: 8px !important;
      }

      /* Primary Button - Uses palette primary color */
      .p-button.p-button-primary {
        background: var(--palette-primary) !important;
        border-color: var(--palette-primary) !important;
        color: var(--palette-primary-contrast, #ffffff) !important;
      }
      .p-button.p-button-primary:hover:not(:disabled) {
        background: var(--palette-primary-hover) !important;
        border-color: var(--palette-primary-hover) !important;
      }

      /* Secondary Button - Uses palette secondary color */
      .p-button.p-button-secondary {
        background: var(--palette-secondary) !important;
        border-color: var(--palette-surface-border) !important;
        color: var(--palette-secondary-contrast) !important;
      }
      .p-button.p-button-secondary:hover:not(:disabled) {
        background: var(--palette-secondary-hover) !important;
        border-color: var(--palette-surface-border) !important;
      }

      /* Success Button - Uses palette success color */
      .p-button.p-button-success {
        background: var(--palette-success) !important;
        border-color: var(--palette-success) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-success:hover:not(:disabled) {
        background: var(--palette-success-hover) !important;
        border-color: var(--palette-success-hover) !important;
      }

      /* Info Button - Uses palette info color */
      .p-button.p-button-info {
        background: var(--palette-info) !important;
        border-color: var(--palette-info) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-info:hover:not(:disabled) {
        background: var(--palette-info-hover) !important;
        border-color: var(--palette-info-hover) !important;
      }

      /* Warning Button - Uses palette warning color */
      .p-button.p-button-warning {
        background: var(--palette-warning) !important;
        border-color: var(--palette-warning) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-warning:hover:not(:disabled) {
        background: var(--palette-warning-hover) !important;
        border-color: var(--palette-warning-hover) !important;
      }

      /* Danger Button - Uses palette danger color */
      .p-button.p-button-danger {
        background: var(--palette-danger) !important;
        border-color: var(--palette-danger) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-danger:hover:not(:disabled) {
        background: var(--palette-danger-hover) !important;
        border-color: var(--palette-danger-hover) !important;
      }

      /* Text Buttons */
      .p-button.p-button-text {
        background: transparent !important;
        border-color: transparent !important;
      }

      /* Outlined Buttons */
      .p-button.p-button-outlined {
        background: transparent !important;
      }
      .p-button.p-button-outlined.p-button-primary {
        color: var(--palette-primary) !important;
        border-color: var(--palette-primary) !important;
      }
      .p-button.p-button-outlined.p-button-primary:hover:not(:disabled) {
        background: var(--palette-primary)10 !important;
      }
      .p-button.p-button-outlined.p-button-secondary {
        color: var(--palette-secondary-contrast) !important;
        border-color: var(--palette-surface-border) !important;
      }
      .p-button.p-button-outlined.p-button-secondary:hover:not(:disabled) {
        background: var(--palette-surface-hover) !important;
      }
      .p-button.p-button-outlined.p-button-success {
        color: var(--palette-success) !important;
        border-color: var(--palette-success) !important;
      }
      .p-button.p-button-outlined.p-button-success:hover:not(:disabled) {
        background: var(--palette-success)10 !important;
      }
      .p-button.p-button-outlined.p-button-info {
        color: var(--palette-info) !important;
        border-color: var(--palette-info) !important;
      }
      .p-button.p-button-outlined.p-button-info:hover:not(:disabled) {
        background: var(--palette-info)10 !important;
      }
      .p-button.p-button-outlined.p-button-warning {
        color: var(--palette-warning) !important;
        border-color: var(--palette-warning) !important;
      }
      .p-button.p-button-outlined.p-button-warning:hover:not(:disabled) {
        background: var(--palette-warning)10 !important;
      }
      .p-button.p-button-outlined.p-button-danger {
        color: var(--palette-danger) !important;
        border-color: var(--palette-danger) !important;
      }
      .p-button.p-button-outlined.p-button-danger:hover:not(:disabled) {
        background: var(--palette-danger)10 !important;
      }

      /* Rounded Buttons */
      .p-button.p-button-rounded {
        border-radius: 2rem !important;
      }

      /* Raised Buttons */
      .p-button.p-button-raised {
        box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12) !important;
      }

      /* Size Variants */
      .p-button.p-button-sm {
        font-size: 0.75rem !important;
        padding: 0.375rem 0.75rem !important;
      }

      .p-button.p-button-lg {
        font-size: 1.125rem !important;
        padding: 0.75rem 1.5rem !important;
      }

      /* Disabled State */
      .p-button:disabled {
        background: var(--palette-disabled-bg) !important;
        border-color: var(--palette-disabled-bg) !important;
        color: var(--palette-disabled-text) !important;
        opacity: 0.6 !important;
        cursor: not-allowed !important;
      }
    `],
  }),
};

export default meta;
type Story = StoryObj<ButtonArgs>;

// Main Interactive Story
export const Interactive: Story = {
  args: {
    label: 'Button',
    severity: 'primary',
    outlined: false,
    text: false,
    raised: false,
    rounded: false,
    disabled: false,
    icon: '',
    size: 'normal'
  }
};

// Quick Examples Using Palette Colors
export const AllSeverities: Story = {
  render: () => ({
    template: `
      <div class="severities-demo">
        <h3>All Button Severities Using Color Palette</h3>
        <div class="button-grid">
          <button pButton label="Primary" severity="primary" class="palette-button"></button>
          <button pButton label="Secondary" severity="secondary" class="palette-button"></button>
          <button pButton label="Success" severity="success" class="palette-button"></button>
          <button pButton label="Info" severity="info" class="palette-button"></button>
          <button pButton label="Warning" severity="warning" class="palette-button"></button>
          <button pButton label="Danger" severity="danger" class="palette-button"></button>
        </div>
        <p class="note">💡 Change colors in Theme/ColorPalette to see all buttons update instantly!</p>
      </div>
    `,
    styles: [`
      .severities-demo {
        padding: 2rem;
        background: var(--palette-surface-ground, #EFF2F4);
        border-radius: 8px;
        font-family: 'Inter', system-ui, sans-serif;
      }
      
      .severities-demo h3 {
        margin: 0 0 1.5rem 0;
        color: var(--palette-text-primary, #3D3D3D);
        text-align: center;
      }
      
      .button-grid {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 1rem;
      }
      
      .note {
        text-align: center;
        color: var(--palette-text-secondary, #666);
        font-style: italic;
        margin: 0;
      }
      
      .palette-button {
        font-family: 'Inter', system-ui, sans-serif !important;
        border-radius: 8px !important;
      }
    `]
  })
};
