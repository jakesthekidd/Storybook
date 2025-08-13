import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { colorPaletteManager } from '../../../theme/color-palette';

interface InputTextArgs {
  value: string;
  label: string;
  placeholder: string;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  autofocus: boolean;
  size: 'small' | 'large' | undefined;
  variant: 'outlined' | 'filled';
  invalid: boolean;
  showFloatLabel: boolean;
  type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  maxlength: number | undefined;
  minlength: number | undefined;
  autocomplete: string;
  spellcheck: boolean;
}

// Initialize color palette when this story loads
if (typeof document !== 'undefined') {
  colorPaletteManager.setThemeMode('light');
}

const meta: Meta<InputTextArgs> = {
  title: 'PrimeNG/InputText',
  decorators: [
    moduleMetadata({
      imports: [InputTextModule, FloatLabelModule, FormsModule],
    }),
  ],
  args: {
    value: '',
    label: 'Username',
    placeholder: 'Enter your username',
    disabled: false,
    readonly: false,
    required: false,
    autofocus: false,
    size: undefined,
    variant: 'outlined',
    invalid: false,
    showFloatLabel: true,
    type: 'text',
    maxlength: undefined,
    minlength: undefined,
    autocomplete: 'off',
    spellcheck: true
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Current input value'
    },
    label: {
      control: 'text',
      description: 'Float label text'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no float label'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    readonly: {
      control: 'boolean',
      description: 'Readonly state'
    },
    required: {
      control: 'boolean',
      description: 'Required field'
    },
    autofocus: {
      control: 'boolean',
      description: 'Automatically focus on load'
    },
    size: {
      control: 'select',
      options: [undefined, 'small', 'large'],
      description: 'Input size'
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled'],
      description: 'Input variant style'
    },
    invalid: {
      control: 'boolean',
      description: 'Invalid/error state'
    },
    showFloatLabel: {
      control: 'boolean',
      description: 'Show floating label'
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
      description: 'Input type'
    },
    maxlength: {
      control: 'number',
      description: 'Maximum character length'
    },
    minlength: {
      control: 'number',
      description: 'Minimum character length'
    },
    autocomplete: {
      control: 'text',
      description: 'HTML autocomplete attribute'
    },
    spellcheck: {
      control: 'boolean',
      description: 'Enable spellcheck'
    }
  },
  render: (args) => {
    const requiredAsterisk = args.required ? ' *' : '';
    const labelText = args.label + requiredAsterisk;
    
    return {
      template: `
        <div class="input-demo-container">
          <div class="input-wrapper">
            <div *ngIf="showFloatLabel; else noFloatLabel">
              <p-floatlabel>
                <input
                  pInputText
                  [id]="'input-' + type"
                  [(ngModel)]="value"
                  [type]="type"
                  [placeholder]="' '"
                  [disabled]="disabled"
                  [readonly]="readonly"
                  [required]="required"
                  [autofocus]="autofocus"
                  [maxlength]="maxlength || undefined"
                  [minlength]="minlength || undefined"
                  [autocomplete]="autocomplete"
                  [spellcheck]="spellcheck"
                  [class.p-inputtext-sm]="size === 'small'"
                  [class.p-inputtext-lg]="size === 'large'"
                  [class.p-invalid]="invalid"
                  [attr.data-variant]="variant"
                  class="palette-input float-label-input" />
                <label [for]="'input-' + type">{{labelText}}</label>
              </p-floatlabel>
            </div>
            
            <ng-template #noFloatLabel>
              <input 
                pInputText 
                [(ngModel)]="value"
                [type]="type"
                [placeholder]="placeholder"
                [disabled]="disabled"
                [readonly]="readonly"
                [required]="required"
                [autofocus]="autofocus"
                [maxlength]="maxlength || undefined"
                [minlength]="minlength || undefined"
                [autocomplete]="autocomplete"
                [spellcheck]="spellcheck"
                [class.p-inputtext-sm]="size === 'small'"
                [class.p-inputtext-lg]="size === 'large'"
                [class.p-invalid]="invalid"
                [attr.data-variant]="variant"
                class="palette-input" />
            </ng-template>
          </div>
          <div class="input-info">
            <small>🎨 Using Color Palette Manager</small>
            <small *ngIf="required" class="required-note">* Required field</small>
            <small *ngIf="invalid" class="error-note">⚠️ Invalid input</small>
          </div>
        </div>
      `,
      props: { ...args, labelText },
      ngOnInit: () => {
        // Initialize color palette when component loads
        if (typeof document !== 'undefined') {
          colorPaletteManager.setThemeMode('light');
          console.log('✅ InputText: Initialized Color Palette Manager');
        }
      },
      styles: [`
        .input-demo-container {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: var(--palette-surface-ground, #EFF2F4);
          border-radius: 12px;
          min-height: 120px;
          font-family: 'Inter', system-ui, sans-serif;
        }

        .input-wrapper {
          width: 100%;
          max-width: 400px;
        }

        .input-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          opacity: 0.7;
          font-size: 12px;
          color: var(--palette-text-muted, #666);
        }

        .required-note {
          color: var(--palette-danger, #DA1F2C) !important;
          font-weight: 500;
        }

        .error-note {
          color: var(--palette-danger, #DA1F2C) !important;
          font-weight: 500;
        }

        /* PALETTE-DRIVEN INPUT STYLES */
        
        .palette-input.p-inputtext {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          border: 2px solid var(--palette-surface-border, #E2E6EB) !important;
          border-radius: 8px !important;
          background: var(--palette-surface, #ffffff) !important;
          color: var(--palette-text-primary, #3D3D3D) !important;
          padding: 0.875rem 1rem !important;
          font-size: 14px !important;
          font-weight: 400 !important;
          transition: all 0.2s ease !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }

        /* Focus State */
        .palette-input.p-inputtext:focus {
          border-color: var(--palette-primary, #2474BB) !important;
          box-shadow: 0 0 0 3px var(--palette-blue-100, #D3E3F1) !important;
          outline: none !important;
          background: var(--palette-surface, #ffffff) !important;
        }

        /* Hover State */
        .palette-input.p-inputtext:hover:not(:disabled):not(:focus) {
          border-color: var(--palette-primary, #2474BB) !important;
        }

        /* Placeholder */
        .palette-input.p-inputtext::placeholder {
          color: var(--palette-text-muted, #A9B3C2) !important;
          opacity: 1 !important;
        }

        /* Disabled State */
        .palette-input.p-inputtext:disabled {
          background: var(--palette-surface-100, #F7F8F9) !important;
          border-color: var(--palette-surface-300, #EFF2F4) !important;
          color: var(--palette-surface-500, #C6CCD6) !important;
          cursor: not-allowed !important;
          opacity: 0.6 !important;
        }

        /* Readonly State */
        .palette-input.p-inputtext:read-only {
          background: var(--palette-surface-50, #FBFCFC) !important;
          border-color: var(--palette-surface-300, #EFF2F4) !important;
          cursor: default !important;
        }

        /* Invalid State */
        .palette-input.p-inputtext.p-invalid {
          border-color: var(--palette-danger, #DA1F2C) !important;
          background: var(--palette-red-50, #FBE9EA) !important;
        }

        .palette-input.p-inputtext.p-invalid:focus {
          border-color: var(--palette-danger, #DA1F2C) !important;
          box-shadow: 0 0 0 3px var(--palette-red-100, #F8D2D5) !important;
        }

        /* Size Variants */
        .palette-input.p-inputtext.p-inputtext-sm {
          padding: 0.625rem 0.75rem !important;
          font-size: 13px !important;
        }

        .palette-input.p-inputtext.p-inputtext-lg {
          padding: 1.125rem 1.25rem !important;
          font-size: 16px !important;
        }

        /* Filled Variant */
        .palette-input.p-inputtext[data-variant="filled"] {
          background: var(--palette-surface-100, #F7F8F9) !important;
          border: 2px solid transparent !important;
        }

        .palette-input.p-inputtext[data-variant="filled"]:focus {
          background: var(--palette-surface, #ffffff) !important;
          border-color: var(--palette-primary, #2474BB) !important;
        }

        .palette-input.p-inputtext[data-variant="filled"]:hover:not(:disabled):not(:focus) {
          background: var(--palette-surface-50, #FBFCFC) !important;
        }

        /* FLOAT LABEL STYLES */

        p-floatlabel {
          position: relative !important;
          display: block !important;
        }

        p-floatlabel label {
          font-family: 'Inter', system-ui, sans-serif !important;
          color: var(--palette-text-muted, #A9B3C2) !important;
          font-size: 14px !important;
          font-weight: 400 !important;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
          pointer-events: none !important;
          transform-origin: top left !important;
          position: absolute !important;
          left: 1rem !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          background: transparent !important;
          padding: 0 !important;
          z-index: 1 !important;
          user-select: none !important;
        }

        /* Float label when focused or has value (animated to floating position) */
        p-floatlabel label.p-float-label-active,
        p-floatlabel .palette-input.p-inputtext:focus + label,
        p-floatlabel .palette-input.p-inputtext:not(:placeholder-shown) + label {
          color: var(--palette-primary, #2474BB) !important;
          font-size: 12px !important;
          font-weight: 600 !important;
          transform: translateY(-2.25rem) translateX(-0.25rem) scale(0.85) !important;
          background: var(--palette-surface, #ffffff) !important;
          padding: 0 0.5rem !important;
        }

        /* Float label when input is focused */
        p-floatlabel .palette-input.p-inputtext:focus + label {
          color: var(--palette-primary, #2474BB) !important;
        }

        /* Float label for invalid state */
        p-floatlabel .palette-input.p-inputtext.p-invalid + label,
        p-floatlabel .palette-input.p-inputtext.p-invalid:focus + label {
          color: var(--palette-danger, #DA1F2C) !important;
        }

        /* Custom styles for different input types */
        .palette-input.p-inputtext[type="email"] {
          text-transform: lowercase;
        }

        .palette-input.p-inputtext[type="number"] {
          text-align: right;
        }

        .palette-input.p-inputtext[type="search"] {
          border-radius: 20px !important;
        }

        /* Webkit autofill override */
        .palette-input.p-inputtext:-webkit-autofill,
        .palette-input.p-inputtext:-webkit-autofill:focus,
        .palette-input.p-inputtext:-webkit-autofill:hover {
          -webkit-box-shadow: 0 0 0 1000px var(--palette-surface, #ffffff) inset !important;
          -webkit-text-fill-color: var(--palette-text-primary, #3D3D3D) !important;
          border-color: var(--palette-primary, #2474BB) !important;
        }
      `]
    };
  },
};

export default meta;
type Story = StoryObj<InputTextArgs>;

// Default Story
export const Default: Story = {
  args: {
    value: '',
    label: 'Username',
    placeholder: 'Enter your username',
    showFloatLabel: true,
    type: 'text'
  }
};

// Main Interactive Story with all controls
export const Interactive: Story = {
  args: {
    value: '',
    label: 'Username',
    placeholder: 'Enter your username',
    disabled: false,
    readonly: false,
    required: false,
    autofocus: false,
    size: undefined,
    variant: 'outlined',
    invalid: false,
    showFloatLabel: true,
    type: 'text',
    maxlength: undefined,
    minlength: undefined,
    autocomplete: 'username',
    spellcheck: false
  }
};

// Quick Examples
export const FloatLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter email',
    type: 'email',
    required: true,
    autocomplete: 'email'
  }
};

export const BasicInput: Story = {
  args: {
    showFloatLabel: false,
    placeholder: 'Basic input without float label',
    type: 'text'
  }
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    required: true,
    autocomplete: 'current-password',
    showFloatLabel: true
  }
};

export const WithValue: Story = {
  args: {
    value: 'john@example.com',
    label: 'Email',
    type: 'email',
    readonly: true
  }
};

export const InvalidState: Story = {
  args: {
    label: 'Email Address',
    value: 'invalid-email',
    type: 'email',
    invalid: true,
    required: true
  }
};

export const Disabled: Story = {
  args: {
    label: 'Username',
    value: 'john_doe',
    disabled: true
  }
};

export const SmallSize: Story = {
  args: {
    label: 'Search',
    type: 'search',
    size: 'small',
    placeholder: 'Search...'
  }
};

export const LargeSize: Story = {
  args: {
    label: 'Title',
    size: 'large',
    maxlength: 100
  }
};

export const FilledVariant: Story = {
  args: {
    label: 'Description',
    variant: 'filled',
    maxlength: 500
  }
};

export const NumberInput: Story = {
  args: {
    label: 'Age',
    type: 'number',
    placeholder: '18',
    minlength: 1,
    maxlength: 3
  }
};

export const PhoneInput: Story = {
  args: {
    label: 'Phone Number',
    type: 'tel',
    placeholder: '+1 (555) 123-4567',
    autocomplete: 'tel'
  }
};

export const URLInput: Story = {
  args: {
    label: 'Website',
    type: 'url',
    placeholder: 'https://example.com',
    autocomplete: 'url'
  }
};
