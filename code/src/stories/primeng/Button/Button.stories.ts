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
  size?: 'p-button-sm' | 'p-button-lg' | '';
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
    size: '' 
  },
  argTypes: {
    severity: { control: 'select', options: [null, 'primary','secondary','success','info','warning','help','danger'] },
    size: { control: 'radio', options: ['', 'p-button-sm', 'p-button-lg'] },
  },
  render: (args) => ({
    template: `
      <div class="button-demo-container">
        <button
          pButton
          type="button"
          [label]="label"
          [disabled]="disabled"
          [icon]="icon || null"
          [class]="buttonClasses"
        ></button>
      </div>
    `,
    props: {
      ...args,
      buttonClasses: [
        'p-button',
        'design-system-button',
        args.severity ? `p-button-${args.severity}` : '',
        args.outlined ? 'p-button-outlined' : '',
        args.text ? 'p-button-text' : '',
        args.raised ? 'p-button-raised' : '',
        args.rounded ? 'p-button-rounded' : '',
        args.size || ''
      ].filter(Boolean).join(' ').trim()
    },
    styles: [`
      .button-demo-container {
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: var(--surface-ground, #EFF2F4);
        border-radius: var(--border-radius, 6px);
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
      .p-button.p-button-primary:hover {
        background: var(--blue-600, #2068A8) !important;
        border-color: var(--blue-600, #2068A8) !important;
      }

      /* Secondary Button - Light Blue/Gray */
      .p-button.p-button-secondary {
        background: var(--surface-100, #F7F8F9) !important;
        border-color: var(--surface-400, #E2E6EB) !important;
        color: var(--blue-700, #1D5D96) !important;
      }
      .p-button.p-button-secondary:hover {
        background: var(--surface-200, #F3F5F7) !important;
        border-color: var(--surface-500, #C6CCD6) !important;
      }

      /* Success Button - Green */
      .p-button.p-button-success {
        background: var(--green-500, #00BF30) !important;
        border-color: var(--green-500, #00BF30) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-success:hover {
        background: var(--green-600, #00AC2B) !important;
        border-color: var(--green-600, #00AC2B) !important;
      }

      /* Info Button - Cyan */
      .p-button.p-button-info {
        background: var(--cyan-500, #72CDF4) !important;
        border-color: var(--cyan-500, #72CDF4) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-info:hover {
        background: var(--cyan-600, #67B8DC) !important;
        border-color: var(--cyan-600, #67B8DC) !important;
      }

      /* Warning Button - Orange */
      .p-button.p-button-warning {
        background: var(--orange-500, #FFA300) !important;
        border-color: var(--orange-500, #FFA300) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-warning:hover {
        background: var(--orange-600, #E59300) !important;
        border-color: var(--orange-600, #E59300) !important;
      }

      /* Danger Button - Red */
      .p-button.p-button-danger {
        background: var(--red-500, #DA1F2C) !important;
        border-color: var(--red-500, #DA1F2C) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-danger:hover {
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
    `],
  }),
};

export default meta;
type Story = StoryObj<ButtonArgs>;

// Basic Buttons Section
export const Basic: Story = { 
  args: { label: 'Submit' } 
};

export const BasicDisabled: Story = { 
  args: { label: 'Disabled', disabled: true } 
};

// Icons Section
export const WithIcon: Story = { 
  args: { icon: 'pi pi-upload', label: 'Submit' } 
};

export const WithIconTrailing: Story = { 
  args: { icon: 'pi pi-upload', label: 'Submit' } 
};

// Severities Section
export const Primary: Story = { 
  args: { severity: 'primary', label: 'Primary' } 
};

export const Secondary: Story = { 
  args: { severity: 'secondary', label: 'Secondary' } 
};

export const Success: Story = { 
  args: { severity: 'success', label: 'Success' } 
};

export const Info: Story = { 
  args: { severity: 'info', label: 'Info' } 
};

export const Warning: Story = { 
  args: { severity: 'warning', label: 'Warning' } 
};

export const Danger: Story = { 
  args: { severity: 'danger', label: 'Danger' } 
};

// Raised Buttons Section
export const RaisedPrimary: Story = { 
  args: { severity: 'primary', label: 'Primary', raised: true } 
};

export const RaisedSecondary: Story = { 
  args: { severity: 'secondary', label: 'Secondary', raised: true } 
};

export const RaisedSuccess: Story = { 
  args: { severity: 'success', label: 'Success', raised: true } 
};

export const RaisedInfo: Story = { 
  args: { severity: 'info', label: 'Info', raised: true } 
};

export const RaisedWarning: Story = { 
  args: { severity: 'warning', label: 'Warning', raised: true } 
};

export const RaisedDanger: Story = { 
  args: { severity: 'danger', label: 'Danger', raised: true } 
};

// Rounded Buttons Section
export const RoundedPrimary: Story = { 
  args: { severity: 'primary', label: 'Primary', rounded: true } 
};

export const RoundedSecondary: Story = { 
  args: { severity: 'secondary', label: 'Secondary', rounded: true } 
};

export const RoundedSuccess: Story = { 
  args: { severity: 'success', label: 'Success', rounded: true } 
};

export const RoundedInfo: Story = { 
  args: { severity: 'info', label: 'Info', rounded: true } 
};

export const RoundedWarning: Story = { 
  args: { severity: 'warning', label: 'Warning', rounded: true } 
};

export const RoundedDanger: Story = { 
  args: { severity: 'danger', label: 'Danger', rounded: true } 
};

// Text Buttons Section
export const TextPrimary: Story = { 
  args: { severity: 'primary', label: 'Primary', text: true } 
};

export const TextSecondary: Story = { 
  args: { severity: 'secondary', label: 'Secondary', text: true } 
};

export const TextSuccess: Story = { 
  args: { severity: 'success', label: 'Success', text: true } 
};

export const TextInfo: Story = { 
  args: { severity: 'info', label: 'Info', text: true } 
};

export const TextWarning: Story = { 
  args: { severity: 'warning', label: 'Warning', text: true } 
};

export const TextDanger: Story = { 
  args: { severity: 'danger', label: 'Danger', text: true } 
};

// Raised Text Buttons Section
export const RaisedTextPrimary: Story = { 
  args: { severity: 'primary', label: 'Primary', text: true, raised: true } 
};

export const RaisedTextSecondary: Story = { 
  args: { severity: 'secondary', label: 'Secondary', text: true, raised: true } 
};

export const RaisedTextSuccess: Story = { 
  args: { severity: 'success', label: 'Success', text: true, raised: true } 
};

export const RaisedTextInfo: Story = { 
  args: { severity: 'info', label: 'Info', text: true, raised: true } 
};

export const RaisedTextWarning: Story = { 
  args: { severity: 'warning', label: 'Warning', text: true, raised: true } 
};

export const RaisedTextDanger: Story = { 
  args: { severity: 'danger', label: 'Danger', text: true, raised: true } 
};

// Outlined Buttons Section
export const OutlinedPrimary: Story = { 
  args: { severity: 'primary', label: 'Primary', outlined: true } 
};

export const OutlinedSecondary: Story = { 
  args: { severity: 'secondary', label: 'Secondary', outlined: true } 
};

export const OutlinedSuccess: Story = { 
  args: { severity: 'success', label: 'Success', outlined: true } 
};

export const OutlinedInfo: Story = { 
  args: { severity: 'info', label: 'Info', outlined: true } 
};

export const OutlinedWarning: Story = { 
  args: { severity: 'warning', label: 'Warning', outlined: true } 
};

export const OutlinedDanger: Story = { 
  args: { severity: 'danger', label: 'Danger', outlined: true } 
};

// Rounded Outlined Buttons Section
export const RoundedOutlinedPrimary: Story = { 
  args: { severity: 'primary', label: 'Primary', outlined: true, rounded: true } 
};

export const RoundedOutlinedSecondary: Story = { 
  args: { severity: 'secondary', label: 'Secondary', outlined: true, rounded: true } 
};

export const RoundedOutlinedSuccess: Story = { 
  args: { severity: 'success', label: 'Success', outlined: true, rounded: true } 
};

export const RoundedOutlinedInfo: Story = { 
  args: { severity: 'info', label: 'Info', outlined: true, rounded: true } 
};

export const RoundedOutlinedWarning: Story = { 
  args: { severity: 'warning', label: 'Warning', outlined: true, rounded: true } 
};

export const RoundedOutlinedDanger: Story = { 
  args: { severity: 'danger', label: 'Danger', outlined: true, rounded: true } 
};

// Rounded Icon Buttons Section
export const RoundedIconPrimary: Story = { 
  args: { severity: 'primary', icon: 'pi pi-check', label: '', rounded: true } 
};

export const RoundedIconSecondary: Story = { 
  args: { severity: 'secondary', icon: 'pi pi-times', label: '', rounded: true } 
};

export const RoundedIconSuccess: Story = { 
  args: { severity: 'success', icon: 'pi pi-check', label: '', rounded: true } 
};

export const RoundedIconInfo: Story = { 
  args: { severity: 'info', icon: 'pi pi-info', label: '', rounded: true } 
};

export const RoundedIconWarning: Story = { 
  args: { severity: 'warning', icon: 'pi pi-exclamation-triangle', label: '', rounded: true } 
};

export const RoundedIconDanger: Story = { 
  args: { severity: 'danger', icon: 'pi pi-times', label: '', rounded: true } 
};

// Rounded Text Icon Buttons Section
export const RoundedTextIconPrimary: Story = { 
  args: { severity: 'primary', icon: 'pi pi-check', label: '', rounded: true, text: true } 
};

export const RoundedTextIconSecondary: Story = { 
  args: { severity: 'secondary', icon: 'pi pi-times', label: '', rounded: true, text: true } 
};

export const RoundedTextIconSuccess: Story = { 
  args: { severity: 'success', icon: 'pi pi-check', label: '', rounded: true, text: true } 
};

export const RoundedTextIconInfo: Story = { 
  args: { severity: 'info', icon: 'pi pi-info', label: '', rounded: true, text: true } 
};

export const RoundedTextIconWarning: Story = { 
  args: { severity: 'warning', icon: 'pi pi-exclamation-triangle', label: '', rounded: true, text: true } 
};

export const RoundedTextIconDanger: Story = { 
  args: { severity: 'danger', icon: 'pi pi-times', label: '', rounded: true, text: true } 
};

// Rounded and Outlined Icon Buttons Section
export const RoundedOutlinedIconPrimary: Story = { 
  args: { severity: 'primary', icon: 'pi pi-check', label: '', rounded: true, outlined: true } 
};

export const RoundedOutlinedIconSecondary: Story = { 
  args: { severity: 'secondary', icon: 'pi pi-times', label: '', rounded: true, outlined: true } 
};

export const RoundedOutlinedIconSuccess: Story = { 
  args: { severity: 'success', icon: 'pi pi-check', label: '', rounded: true, outlined: true } 
};

export const RoundedOutlinedIconInfo: Story = { 
  args: { severity: 'info', icon: 'pi pi-info', label: '', rounded: true, outlined: true } 
};

export const RoundedOutlinedIconWarning: Story = { 
  args: { severity: 'warning', icon: 'pi pi-exclamation-triangle', label: '', rounded: true, outlined: true } 
};

export const RoundedOutlinedIconDanger: Story = { 
  args: { severity: 'danger', icon: 'pi pi-times', label: '', rounded: true, outlined: true } 
};

// Button Set Section
export const ButtonSet: Story = {
  render: () => ({
    template: `
      <div class="button-demo-container">
        <div class="button-set" style="display: flex; gap: 0;">
          <button pButton type="button" label="Save" class="p-button p-button-primary button-set-left" icon="pi pi-save"></button>
          <button pButton type="button" label="Delete" class="p-button p-button-danger button-set-middle" icon="pi pi-trash"></button>
          <button pButton type="button" label="Cancel" class="p-button p-button-secondary button-set-right" icon="pi pi-times"></button>
        </div>
      </div>
    `,
    styles: [`
      .button-demo-container {
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: var(--surface-ground, #EFF2F4);
        border-radius: var(--border-radius, 6px);
      }

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

      .button-set .button-set-middle {
        margin-left: -1px !important;
      }
    `]
  })
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
      .p-button.p-button-primary:hover {
        background: var(--blue-600, #2068A8) !important;
        border-color: var(--blue-600, #2068A8) !important;
      }

      /* Secondary Button - Light Blue/Gray */
      .p-button.p-button-secondary {
        background: var(--surface-100, #F7F8F9) !important;
        border-color: var(--surface-400, #E2E6EB) !important;
        color: var(--blue-700, #1D5D96) !important;
      }
      .p-button.p-button-secondary:hover {
        background: var(--surface-200, #F3F5F7) !important;
        border-color: var(--surface-500, #C6CCD6) !important;
      }

      /* Success Button - Green */
      .p-button.p-button-success {
        background: var(--green-500, #00BF30) !important;
        border-color: var(--green-500, #00BF30) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-success:hover {
        background: var(--green-600, #00AC2B) !important;
        border-color: var(--green-600, #00AC2B) !important;
      }

      /* Info Button - Cyan */
      .p-button.p-button-info {
        background: var(--cyan-500, #72CDF4) !important;
        border-color: var(--cyan-500, #72CDF4) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-info:hover {
        background: var(--cyan-600, #67B8DC) !important;
        border-color: var(--cyan-600, #67B8DC) !important;
      }

      /* Warning Button - Orange */
      .p-button.p-button-warning {
        background: var(--orange-500, #FFA300) !important;
        border-color: var(--orange-500, #FFA300) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-warning:hover {
        background: var(--orange-600, #E59300) !important;
        border-color: var(--orange-600, #E59300) !important;
      }

      /* Danger Button - Red */
      .p-button.p-button-danger {
        background: var(--red-500, #DA1F2C) !important;
        border-color: var(--red-500, #DA1F2C) !important;
        color: #ffffff !important;
      }
      .p-button.p-button-danger:hover {
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
