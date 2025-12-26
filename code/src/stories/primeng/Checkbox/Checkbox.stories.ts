import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { colorPaletteManager } from '../../../theme/color-palette';

interface CheckboxArgs {
  checked: boolean | null;
  label: string;
  disabled: boolean;
  readonly: boolean;
  binary: boolean;
  indeterminate: boolean;
  inputId: string;
  name: string;
  value: string;
}

if (typeof document !== 'undefined') {
  colorPaletteManager.setThemeMode('light');
}

const CHECKBOX_STORY_STYLES = `
  :host {
    display: block;
    font-family: 'Inter', system-ui, sans-serif;
    color: var(--palette-text-primary, #3D3D3D);
  }

  .checkbox-demo-surface {
    background: var(--palette-surface-ground, #EFF2F4);
    border-radius: 16px;
    padding: 2rem;
  }

  .checkbox-row {
    display: flex;
    align-items: center;
  }

  .checkbox-row + .checkbox-row {
    margin-top: 0.75rem;
  }

  .checkbox-label {
    margin-left: 0.75rem;
    font-size: 0.95rem;
    color: var(--palette-text-secondary, #373737);
  }

  .checkbox-label.error {
    color: var(--palette-danger, #DA1F2C);
    font-weight: 600;
  }

  .checkbox-helper {
    color: var(--palette-text-muted, #C6CCD6);
    font-size: 0.85rem;
  }

  .checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .checkbox-card {
    background: var(--palette-surface-card, #ffffff);
    border-radius: 14px;
    padding: 1.5rem;
    box-shadow: 0 16px 32px -24px rgba(36, 116, 187, 0.45);
  }

  .checkbox-card h5 {
    margin: 0;
    color: var(--palette-text-primary, #3D3D3D);
  }

  .checkbox-summary {
    margin-top: 1rem;
    border-radius: 12px;
    background: var(--palette-surface-100, #F7F8F9);
    padding: 1rem;
  }

  .checkbox-note {
    color: var(--palette-text-muted, #C6CCD6);
    font-style: italic;
    margin-top: 0.5rem;
  }

  :host ::ng-deep .palette-checkbox .p-checkbox-box {
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid var(--palette-surface-border, #E2E6EB);
    background: var(--palette-surface-card, #ffffff);
    border-radius: 6px;
    transition: all 0.2s ease;
  }

  :host ::ng-deep .palette-checkbox .p-checkbox-box .p-checkbox-icon {
    font-size: 0.95rem;
  }

  :host ::ng-deep .palette-checkbox.p-highlight .p-checkbox-box,
  :host ::ng-deep .palette-checkbox.p-checkbox-indeterminate .p-checkbox-box,
  :host ::ng-deep .palette-checkbox.p-checkbox-checked .p-checkbox-box {
    border-color: var(--palette-primary, #2474BB);
    background: var(--palette-primary, #2474BB);
    color: var(--palette-primary-contrast, #ffffff);
  }

  :host ::ng-deep .palette-checkbox.p-disabled .p-checkbox-box {
    background: var(--palette-disabled-bg, #D6DAE0);
    border-color: var(--palette-disabled-bg, #D6DAE0);
    color: var(--palette-disabled-text, #88909E);
    opacity: 0.7;
  }

  :host ::ng-deep .checkbox-lg .p-checkbox-box {
    width: 1.5rem;
    height: 1.5rem;
  }

  :host ::ng-deep .checkbox-lg .p-checkbox-icon {
    font-size: 1rem;
  }
`;

const meta: Meta<CheckboxArgs> = {
  title: 'PrimeNG/Checkbox',
  decorators: [
    moduleMetadata({
      imports: [CheckboxModule, FormsModule],
    }),
  ],
  args: {
    checked: false,
    label: 'Checkbox Label',
    disabled: false,
    readonly: false,
    binary: true,
    indeterminate: false,
    inputId: 'checkbox',
    name: 'checkbox',
    value: 'checkbox-value',
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Checked state of the checkbox',
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    readonly: {
      control: 'boolean',
      description: 'Readonly state',
    },
    binary: {
      control: 'boolean',
      description: 'Allows selecting a boolean value',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Visual indeterminate state',
    },
    inputId: {
      control: 'text',
      description: 'Identifier that pairs with the label',
    },
    name: {
      control: 'text',
      description: 'Name of the checkbox or checkbox group',
    },
    value: {
      control: 'text',
      description: 'Value of the checkbox',
    },
  },
};

export default meta;
type Story = StoryObj<CheckboxArgs>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="checkbox-demo-surface">
        <div class="checkbox-row">
          <p-checkbox
            styleClass="palette-checkbox"
            [(ngModel)]="checked"
            [disabled]="disabled"
            [readonly]="readonly"
            [binary]="binary"
            [inputId]="inputId"
            [name]="name"
            [value]="value">
          </p-checkbox>
          <label [for]="inputId" class="checkbox-label">{{ label }}</label>
        </div>
      </div>
    `,
    styles: [CHECKBOX_STORY_STYLES],
  }),
};

export const Primary: Story = {
  args: {
    checked: true,
    label: 'Primary Checkbox (Checked)',
  },
};

export const Unchecked: Story = {
  args: {
    checked: false,
    label: 'Unchecked Checkbox',
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'Disabled Checkbox',
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Disabled Checked Checkbox',
  },
};

export const Readonly: Story = {
  args: {
    checked: true,
    readonly: true,
    label: 'Readonly Checkbox',
  },
};

export const Indeterminate: Story = {
  args: {
    checked: null,
    label: 'Indeterminate Checkbox',
    binary: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="checkbox-demo-surface">
        <div class="checkbox-row">
          <p-checkbox
            styleClass="palette-checkbox"
            [(ngModel)]="checked"
            [disabled]="disabled"
            [readonly]="readonly"
            [binary]="binary"
            [inputId]="inputId"
            [name]="name"
            [value]="value"
            [indeterminate]="true">
          </p-checkbox>
          <label [for]="inputId" class="checkbox-label">{{ label }}</label>
        </div>
      </div>
    `,
    styles: [CHECKBOX_STORY_STYLES],
  }),
};

export const MultipleCheckboxes: Story = {
  render: () => ({
    props: {
      selectedOptions: ['option1'],
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
      ],
    },
    template: `
      <div class="checkbox-demo-surface checkbox-card">
        <h5>Multiple Checkboxes</h5>
        <div class="checkbox-group">
          <div class="checkbox-row" *ngFor="let option of options">
            <p-checkbox
              styleClass="palette-checkbox"
              [(ngModel)]="selectedOptions"
              [inputId]="option.value"
              [name]="'group'"
              [value]="option.value">
            </p-checkbox>
            <label [for]="option.value" class="checkbox-label">{{ option.label }}</label>
          </div>
        </div>
        <small class="checkbox-note">Change colors in Theme/ColorPalette to see live updates.</small>
        <div class="checkbox-summary">
          <small class="checkbox-helper">Selected: {{ selectedOptions | json }}</small>
        </div>
      </div>
    `,
    styles: [CHECKBOX_STORY_STYLES],
  }),
};

export const Invalid: Story = {
  args: {
    checked: false,
    label: 'Invalid Checkbox (Required)',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="checkbox-demo-surface">
        <div class="checkbox-row">
          <p-checkbox
            styleClass="palette-checkbox"
            [(ngModel)]="checked"
            [disabled]="disabled"
            [readonly]="readonly"
            [binary]="binary"
            [inputId]="inputId"
            [name]="name"
            [value]="value"
            class="ng-invalid ng-dirty">
          </p-checkbox>
          <label [for]="inputId" class="checkbox-label error">{{ label }}</label>
        </div>
      </div>
    `,
    styles: [CHECKBOX_STORY_STYLES],
  }),
};

export const WithCustomStyling: Story = {
  args: {
    checked: true,
    label: 'Large Custom Checkbox',
    inputId: 'custom-checkbox',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="checkbox-demo-surface">
        <div class="checkbox-row">
          <p-checkbox
            styleClass="palette-checkbox checkbox-lg"
            [(ngModel)]="checked"
            [inputId]="inputId"
            [binary]="binary">
          </p-checkbox>
          <label [for]="inputId" class="checkbox-label font-semibold">{{ label }}</label>
        </div>
        <small class="checkbox-helper">Uses palette-driven tokens for consistent sizing and colors.</small>
      </div>
    `,
    styles: [CHECKBOX_STORY_STYLES],
  }),
};

export const FormIntegration: Story = {
  render: () => ({
    props: {
      formData: {
        notifications: true,
        newsletter: false,
        terms: false,
      },
    },
    template: `
      <div class="checkbox-demo-surface checkbox-card">
        <h5>User Preferences</h5>

        <div class="checkbox-row">
          <p-checkbox
            styleClass="palette-checkbox"
            [(ngModel)]="formData.notifications"
            inputId="notifications"
            [binary]="true">
          </p-checkbox>
          <label for="notifications" class="checkbox-label">Enable push notifications</label>
        </div>

        <div class="checkbox-row">
          <p-checkbox
            styleClass="palette-checkbox"
            [(ngModel)]="formData.newsletter"
            inputId="newsletter"
            [binary]="true">
          </p-checkbox>
          <label for="newsletter" class="checkbox-label">Subscribe to newsletter</label>
        </div>

        <div class="checkbox-row">
          <p-checkbox
            styleClass="palette-checkbox"
            [(ngModel)]="formData.terms"
            inputId="terms"
            [binary]="true">
          </p-checkbox>
          <label for="terms" class="checkbox-label">I agree to the terms and conditions *</label>
        </div>

        <div class="checkbox-summary">
          <small class="checkbox-helper">Form Data: {{ formData | json }}</small>
        </div>
      </div>
    `,
    styles: [CHECKBOX_STORY_STYLES],
  }),
};
