import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ButtonModule } from 'primeng/button';
import { applyTokens } from '../../../theme/simple-token-loader';

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

// Apply tokens immediately when this story loads
if (typeof document !== 'undefined') {
  applyTokens('light');
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
      description: 'Defines the color scheme of the button'
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
        <div class="token-info">
          <small>Using Token Studio JSON values directly</small>
        </div>
      </div>
    `,
    props: {
      ...args,
      buttonLabel: args.icon && !args.label ? '' : args.label,
      buttonIcon: args.icon || null,
      buttonClasses: [
        'p-button',
        'token-button',
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
        background: var(--surface-ground);
        border-radius: 8px;
        min-height: 120px;
      }

      .token-info {
        opacity: 0.7;
        font-family: 'Inter', system-ui, sans-serif;
        font-size: 12px;
        color: #666;
      }

      .token-button {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        font-weight: 500 !important;
        transition: all 0.2s ease !important;
        border: 1px solid transparent !important;
      }

      /* DIRECT TOKEN INTEGRATION - Using actual values from transflo.tokens.json */
      
      /* Primary Button - Uses blue tokens */
      .p-button.p-button-primary {
        background: var(--blue-500) !important;
        border-color: var(--blue-500) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-primary:hover:not(:disabled) {
        background: var(--blue-600) !important;
        border-color: var(--blue-600) !important;
      }

      /* Secondary Button - Uses cyan tokens */
      .p-button.p-button-secondary {
        background: var(--cyan-50) !important;
        border-color: var(--surface-400) !important;
        color: var(--blue-700) !important;
      }
      .p-button.p-button-secondary:hover:not(:disabled) {
        background: var(--cyan-100) !important;
        border-color: var(--surface-500) !important;
      }

      /* Success Button - Uses green tokens */
      .p-button.p-button-success {
        background: var(--green-500) !important;
        border-color: var(--green-500) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-success:hover:not(:disabled) {
        background: var(--green-600) !important;
        border-color: var(--green-600) !important;
      }

      /* Info Button - Uses cyan tokens */
      .p-button.p-button-info {
        background: var(--cyan-500) !important;
        border-color: var(--cyan-500) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-info:hover:not(:disabled) {
        background: var(--cyan-600) !important;
        border-color: var(--cyan-600) !important;
      }

      /* Warning Button - Uses orange tokens */
      .p-button.p-button-warning {
        background: var(--orange-500) !important;
        border-color: var(--orange-500) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-warning:hover:not(:disabled) {
        background: var(--orange-600) !important;
        border-color: var(--orange-600) !important;
      }

      /* Danger Button - Uses red tokens */
      .p-button.p-button-danger {
        background: var(--red-500) !important;
        border-color: var(--red-500) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-danger:hover:not(:disabled) {
        background: var(--red-600) !important;
        border-color: var(--red-600) !important;
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
        color: var(--blue-500) !important;
        border-color: var(--blue-500) !important;
      }
      .p-button.p-button-outlined.p-button-primary:hover:not(:disabled) {
        background: var(--blue-50) !important;
      }
      .p-button.p-button-outlined.p-button-secondary {
        color: var(--blue-700) !important;
        border-color: var(--surface-400) !important;
      }
      .p-button.p-button-outlined.p-button-secondary:hover:not(:disabled) {
        background: var(--surface-50) !important;
      }
      .p-button.p-button-outlined.p-button-success {
        color: var(--green-500) !important;
        border-color: var(--green-500) !important;
      }
      .p-button.p-button-outlined.p-button-success:hover:not(:disabled) {
        background: var(--green-50) !important;
      }
      .p-button.p-button-outlined.p-button-info {
        color: var(--cyan-500) !important;
        border-color: var(--cyan-500) !important;
      }
      .p-button.p-button-outlined.p-button-info:hover:not(:disabled) {
        background: var(--cyan-50) !important;
      }
      .p-button.p-button-outlined.p-button-warning {
        color: var(--orange-500) !important;
        border-color: var(--orange-500) !important;
      }
      .p-button.p-button-outlined.p-button-warning:hover:not(:disabled) {
        background: var(--orange-50) !important;
      }
      .p-button.p-button-outlined.p-button-danger {
        color: var(--red-500) !important;
        border-color: var(--red-500) !important;
      }
      .p-button.p-button-outlined.p-button-danger:hover:not(:disabled) {
        background: var(--red-50) !important;
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

// Quick Examples Using Token Values
export const PrimaryButton: Story = {
  args: { label: 'Primary', severity: 'primary' }
};

export const SecondaryButton: Story = {
  args: { label: 'Secondary', severity: 'secondary' }
};

export const SuccessButton: Story = {
  args: { label: 'Success', severity: 'success' }
};

export const InfoButton: Story = {
  args: { label: 'Info', severity: 'info' }
};

export const WarningButton: Story = {
  args: { label: 'Warning', severity: 'warning' }
};

export const DangerButton: Story = {
  args: { label: 'Danger', severity: 'danger' }
};

export const OutlinedPrimary: Story = {
  args: { label: 'Outlined', severity: 'primary', outlined: true }
};

export const RoundedSuccess: Story = {
  args: { label: 'Rounded', severity: 'success', rounded: true }
};

export const IconButton: Story = {
  args: { icon: 'pi pi-check', label: '', severity: 'primary', rounded: true }
};

export const DisabledButton: Story = {
  args: { label: 'Disabled', severity: 'primary', disabled: true }
};
