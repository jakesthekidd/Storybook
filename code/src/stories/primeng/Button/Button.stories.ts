import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ButtonModule } from 'primeng/button';

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
      </div>
    `,
    props: {
      ...args,
      buttonLabel: args.icon && !args.label ? '' : args.label,
      buttonIcon: args.icon || null,
      buttonClasses: [
        'p-button',
        'design-system-button',
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
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        background: var(--surface-ground, #EFF2F4);
        border-radius: var(--border-radius, 6px);
        min-height: 100px;
      }

      .design-system-button {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        font-weight: 500 !important;
        transition: all 0.2s ease !important;
        border: 1px solid transparent !important;
      }

      /* Primary Button - Blue */
      .p-button.p-button-primary {
        background: var(--blue-500, #2474BB) !important;
        border-color: var(--blue-500, #2474BB) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-primary:hover:not(:disabled) {
        background: var(--blue-600, #2068A8) !important;
        border-color: var(--blue-600, #2068A8) !important;
      }

      /* Secondary Button - Light Blue/Gray */
      .p-button.p-button-secondary {
        background: var(--cyan-50, #F1FAFE) !important;
        border-color: var(--surface-400, #E2E6EB) !important;
        color: var(--blue-700, #1D5D96) !important;
      }
      .p-button.p-button-secondary:hover:not(:disabled) {
        background: var(--cyan-100, #E3F5FD) !important;
        border-color: var(--surface-500, #C6CCD6) !important;
      }

      /* Success Button - Green */
      .p-button.p-button-success {
        background: var(--green-500, #00BF30) !important;
        border-color: var(--green-500, #00BF30) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-success:hover:not(:disabled) {
        background: var(--green-600, #00AC2B) !important;
        border-color: var(--green-600, #00AC2B) !important;
      }

      /* Info Button - Cyan */
      .p-button.p-button-info {
        background: var(--cyan-500, #72CDF4) !important;
        border-color: var(--cyan-500, #72CDF4) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-info:hover:not(:disabled) {
        background: var(--cyan-600, #67B8DC) !important;
        border-color: var(--cyan-600, #67B8DC) !important;
      }

      /* Warning Button - Orange */
      .p-button.p-button-warning {
        background: var(--orange-500, #FFA300) !important;
        border-color: var(--orange-500, #FFA300) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-warning:hover:not(:disabled) {
        background: var(--orange-600, #E59300) !important;
        border-color: var(--orange-600, #E59300) !important;
      }

      /* Danger Button - Red */
      .p-button.p-button-danger {
        background: var(--red-500, #DA1F2C) !important;
        border-color: var(--red-500, #DA1F2C) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-danger:hover:not(:disabled) {
        background: var(--red-600, #C41C28) !important;
        border-color: var(--red-600, #C41C28) !important;
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
        color: var(--blue-500, #2474BB) !important;
        border-color: var(--blue-500, #2474BB) !important;
      }
      .p-button.p-button-outlined.p-button-primary:hover:not(:disabled) {
        background: var(--blue-50, #E9F1F8) !important;
      }
      .p-button.p-button-outlined.p-button-secondary {
        color: var(--blue-700, #1D5D96) !important;
        border-color: var(--surface-400, #E2E6EB) !important;
      }
      .p-button.p-button-outlined.p-button-secondary:hover:not(:disabled) {
        background: var(--surface-50, #FBFCFC) !important;
      }
      .p-button.p-button-outlined.p-button-success {
        color: var(--green-500, #00BF30) !important;
        border-color: var(--green-500, #00BF30) !important;
      }
      .p-button.p-button-outlined.p-button-success:hover:not(:disabled) {
        background: var(--green-50, #E5F9EA) !important;
      }
      .p-button.p-button-outlined.p-button-info {
        color: var(--cyan-500, #72CDF4) !important;
        border-color: var(--cyan-500, #72CDF4) !important;
      }
      .p-button.p-button-outlined.p-button-info:hover:not(:disabled) {
        background: var(--cyan-50, #F1FAFE) !important;
      }
      .p-button.p-button-outlined.p-button-warning {
        color: var(--orange-500, #FFA300) !important;
        border-color: var(--orange-500, #FFA300) !important;
      }
      .p-button.p-button-outlined.p-button-warning:hover:not(:disabled) {
        background: var(--orange-50, #FFF6E5) !important;
      }
      .p-button.p-button-outlined.p-button-danger {
        color: var(--red-500, #DA1F2C) !important;
        border-color: var(--red-500, #DA1F2C) !important;
      }
      .p-button.p-button-outlined.p-button-danger:hover:not(:disabled) {
        background: var(--red-50, #FBE9EA) !important;
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

// Quick Preset Examples
export const PrimaryButton: Story = {
  args: {
    label: 'Primary Button',
    severity: 'primary'
  }
};

export const SecondaryButton: Story = {
  args: {
    label: 'Secondary Button', 
    severity: 'secondary'
  }
};

export const OutlinedButton: Story = {
  args: {
    label: 'Outlined',
    severity: 'primary',
    outlined: true
  }
};

export const RoundedButton: Story = {
  args: {
    label: 'Rounded',
    severity: 'success', 
    rounded: true
  }
};

export const IconButton: Story = {
  args: {
    icon: 'pi pi-check',
    label: '',
    severity: 'primary',
    rounded: true
  }
};

export const TextButton: Story = {
  args: {
    label: 'Text Button',
    severity: 'primary',
    text: true
  }
};

export const DisabledButton: Story = {
  args: {
    label: 'Disabled',
    severity: 'primary',
    disabled: true
  }
};

// Comprehensive Demo Page (like Figma layout)
export const AllVariations: Story = {
  render: () => ({
    template: `
      <div class="comprehensive-demo">
        <div class="demo-section">
          <h3 class="section-title">Basic</h3>
          <div class="button-row">
            <button pButton type="button" label="Submit" class="p-button p-button-primary"></button>
            <button pButton type="button" label="Disabled" class="p-button p-button-primary" disabled></button>
          </div>
        </div>

        <div class="demo-section">
          <h3 class="section-title">Icons</h3>
          <div class="button-row">
            <button pButton type="button" label="Submit" class="p-button p-button-primary" icon="pi pi-upload"></button>
            <button pButton type="button" label="Submit" class="p-button p-button-primary" icon="pi pi-upload"></button>
          </div>
        </div>

        <div class="demo-section">
          <h3 class="section-title">Severities</h3>
          <div class="button-row">
            <button pButton type="button" label="Primary" class="p-button p-button-primary"></button>
            <button pButton type="button" label="Secondary" class="p-button p-button-secondary"></button>
            <button pButton type="button" label="Success" class="p-button p-button-success"></button>
            <button pButton type="button" label="Info" class="p-button p-button-info"></button>
            <button pButton type="button" label="Warning" class="p-button p-button-warning"></button>
            <button pButton type="button" label="Danger" class="p-button p-button-danger"></button>
          </div>
        </div>

        <div class="demo-section">
          <h3 class="section-title">Raised Buttons</h3>
          <div class="button-row">
            <button pButton type="button" label="Primary" class="p-button p-button-primary p-button-raised"></button>
            <button pButton type="button" label="Secondary" class="p-button p-button-secondary p-button-raised"></button>
            <button pButton type="button" label="Success" class="p-button p-button-success p-button-raised"></button>
            <button pButton type="button" label="Info" class="p-button p-button-info p-button-raised"></button>
            <button pButton type="button" label="Warning" class="p-button p-button-warning p-button-raised"></button>
            <button pButton type="button" label="Danger" class="p-button p-button-danger p-button-raised"></button>
          </div>
        </div>

        <div class="demo-section">
          <h3 class="section-title">Rounded Buttons</h3>
          <div class="button-row">
            <button pButton type="button" label="Primary" class="p-button p-button-primary p-button-rounded"></button>
            <button pButton type="button" label="Secondary" class="p-button p-button-secondary p-button-rounded"></button>
            <button pButton type="button" label="Success" class="p-button p-button-success p-button-rounded"></button>
            <button pButton type="button" label="Info" class="p-button p-button-info p-button-rounded"></button>
            <button pButton type="button" label="Warning" class="p-button p-button-warning p-button-rounded"></button>
            <button pButton type="button" label="Danger" class="p-button p-button-danger p-button-rounded"></button>
          </div>
        </div>

        <div class="demo-section">
          <h3 class="section-title">Text Buttons</h3>
          <div class="button-row">
            <button pButton type="button" label="Primary" class="p-button p-button-primary p-button-text"></button>
            <button pButton type="button" label="Secondary" class="p-button p-button-secondary p-button-text"></button>
            <button pButton type="button" label="Success" class="p-button p-button-success p-button-text"></button>
            <button pButton type="button" label="Info" class="p-button p-button-info p-button-text"></button>
            <button pButton type="button" label="Warning" class="p-button p-button-warning p-button-text"></button>
            <button pButton type="button" label="Danger" class="p-button p-button-danger p-button-text"></button>
          </div>
        </div>

        <div class="demo-section">
          <h3 class="section-title">Outlined Buttons</h3>
          <div class="button-row">
            <button pButton type="button" label="Primary" class="p-button p-button-primary p-button-outlined"></button>
            <button pButton type="button" label="Secondary" class="p-button p-button-secondary p-button-outlined"></button>
            <button pButton type="button" label="Success" class="p-button p-button-success p-button-outlined"></button>
            <button pButton type="button" label="Info" class="p-button p-button-info p-button-outlined"></button>
            <button pButton type="button" label="Warning" class="p-button p-button-warning p-button-outlined"></button>
            <button pButton type="button" label="Danger" class="p-button p-button-danger p-button-outlined"></button>
          </div>
        </div>

        <div class="demo-section">
          <h3 class="section-title">Rounded Icon Buttons</h3>
          <div class="button-row">
            <button pButton type="button" icon="pi pi-check" class="p-button p-button-primary p-button-rounded"></button>
            <button pButton type="button" icon="pi pi-times" class="p-button p-button-secondary p-button-rounded"></button>
            <button pButton type="button" icon="pi pi-check" class="p-button p-button-success p-button-rounded"></button>
            <button pButton type="button" icon="pi pi-info" class="p-button p-button-info p-button-rounded"></button>
            <button pButton type="button" icon="pi pi-exclamation-triangle" class="p-button p-button-warning p-button-rounded"></button>
            <button pButton type="button" icon="pi pi-times" class="p-button p-button-danger p-button-rounded"></button>
          </div>
        </div>

        <div class="demo-section">
          <h3 class="section-title">Button Set</h3>
          <div class="button-row">
            <div class="button-set" style="display: flex; gap: 0;">
              <button pButton type="button" label="Save" class="p-button p-button-primary button-set-left" icon="pi pi-save"></button>
              <button pButton type="button" label="Delete" class="p-button p-button-danger button-set-middle" icon="pi pi-trash"></button>
              <button pButton type="button" label="Cancel" class="p-button p-button-secondary button-set-right" icon="pi pi-times"></button>
            </div>
          </div>
        </div>
      </div>
    `,
    styles: [`
      .comprehensive-demo {
        padding: 28px;
        background: #FFF;
        border-radius: 10px;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .demo-section {
        margin-bottom: 21px;
      }

      .section-title {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 700;
        font-size: 18px;
        color: #3D3D3D;
        margin: 0 0 14px 0;
        line-height: 1.2;
      }

      .button-row {
        display: flex;
        align-items: center;
        gap: 7px;
        flex-wrap: wrap;
      }

      .p-button {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        font-weight: 500 !important;
        transition: all 0.2s ease !important;
        border: 1px solid transparent !important;
      }

      /* Button Set Styles */
      .button-set .p-button {
        border-radius: 0 !important;
        margin-left: -1px !important;
      }

      .button-set .button-set-left {
        border-top-left-radius: 6px !important;
        border-bottom-left-radius: 6px !important;
        margin-left: 0 !important;
      }

      .button-set .button-set-right {
        border-top-right-radius: 6px !important;
        border-bottom-right-radius: 6px !important;
      }

      /* Primary Button - Blue */
      .p-button.p-button-primary {
        background: var(--blue-500, #2474BB) !important;
        border-color: var(--blue-500, #2474BB) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-primary:hover:not(:disabled) {
        background: var(--blue-600, #2068A8) !important;
        border-color: var(--blue-600, #2068A8) !important;
      }

      /* Secondary Button - Light Blue/Gray */
      .p-button.p-button-secondary {
        background: var(--cyan-50, #F1FAFE) !important;
        border-color: var(--surface-400, #E2E6EB) !important;
        color: var(--blue-700, #1D5D96) !important;
      }
      .p-button.p-button-secondary:hover:not(:disabled) {
        background: var(--cyan-100, #E3F5FD) !important;
        border-color: var(--surface-500, #C6CCD6) !important;
      }

      /* Success Button - Green */
      .p-button.p-button-success {
        background: var(--green-500, #00BF30) !important;
        border-color: var(--green-500, #00BF30) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-success:hover:not(:disabled) {
        background: var(--green-600, #00AC2B) !important;
        border-color: var(--green-600, #00AC2B) !important;
      }

      /* Info Button - Cyan */
      .p-button.p-button-info {
        background: var(--cyan-500, #72CDF4) !important;
        border-color: var(--cyan-500, #72CDF4) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-info:hover:not(:disabled) {
        background: var(--cyan-600, #67B8DC) !important;
        border-color: var(--cyan-600, #67B8DC) !important;
      }

      /* Warning Button - Orange */
      .p-button.p-button-warning {
        background: var(--orange-500, #FFA300) !important;
        border-color: var(--orange-500, #FFA300) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-warning:hover:not(:disabled) {
        background: var(--orange-600, #E59300) !important;
        border-color: var(--orange-600, #E59300) !important;
      }

      /* Danger Button - Red */
      .p-button.p-button-danger {
        background: var(--red-500, #DA1F2C) !important;
        border-color: var(--red-500, #DA1F2C) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-danger:hover:not(:disabled) {
        background: var(--red-600, #C41C28) !important;
        border-color: var(--red-600, #C41C28) !important;
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
        color: var(--blue-500, #2474BB) !important;
        border-color: var(--blue-500, #2474BB) !important;
      }
      .p-button.p-button-outlined.p-button-secondary {
        color: var(--blue-700, #1D5D96) !important;
        border-color: var(--surface-400, #E2E6EB) !important;
      }
      .p-button.p-button-outlined.p-button-success {
        color: var(--green-500, #00BF30) !important;
        border-color: var(--green-500, #00BF30) !important;
      }
      .p-button.p-button-outlined.p-button-info {
        color: var(--cyan-500, #72CDF4) !important;
        border-color: var(--cyan-500, #72CDF4) !important;
      }
      .p-button.p-button-outlined.p-button-warning {
        color: var(--orange-500, #FFA300) !important;
        border-color: var(--orange-500, #FFA300) !important;
      }
      .p-button.p-button-outlined.p-button-danger {
        color: var(--red-500, #DA1F2C) !important;
        border-color: var(--red-500, #DA1F2C) !important;
      }

      /* Rounded Buttons */
      .p-button.p-button-rounded {
        border-radius: 2rem !important;
      }

      /* Raised Buttons */
      .p-button.p-button-raised {
        box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12) !important;
      }

      /* Disabled State */
      .p-button:disabled {
        opacity: 0.6 !important;
        cursor: not-allowed !important;
      }
    `]
  })
};
