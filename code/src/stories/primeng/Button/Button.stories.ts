import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ButtonModule } from 'primeng/button';

const meta: Meta = {
  title: 'PrimeNG/Button',
  decorators: [
    moduleMetadata({
      imports: [ButtonModule],
    }),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Button label text'
    },
    icon: {
      control: 'text',
      description: 'Icon class name'
    },
    iconPos: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Position of the icon'
    },
    severity: {
      control: 'select',
      options: ['secondary', 'success', 'info', 'warning', 'help', 'danger'],
      description: 'Severity of the button'
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'Size of the button'
    },
    outlined: {
      control: 'boolean',
      description: 'Outlined button style'
    },
    text: {
      control: 'boolean',
      description: 'Text button style'
    },
    raised: {
      control: 'boolean',
      description: 'Raised button style'
    },
    rounded: {
      control: 'boolean',
      description: 'Rounded button style'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state'
    }
  },
  args: {
    label: 'Button',
    icon: '',
    iconPos: 'left',
    severity: undefined,
    size: undefined,
    outlined: false,
    text: false,
    raised: false,
    rounded: false,
    disabled: false,
    loading: false
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-button 
        [label]="label"
        [icon]="icon"
        [iconPos]="iconPos"
        [severity]="severity"
        [size]="size"
        [outlined]="outlined"
        [text]="text"
        [raised]="raised"
        [rounded]="rounded"
        [disabled]="disabled"
        [loading]="loading">
      </p-button>
    `
  })
};

export const Primary: Story = {
  args: {
    label: 'Primary Button'
  }
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    severity: 'secondary'
  }
};

export const Success: Story = {
  args: {
    label: 'Success Button',
    severity: 'success'
  }
};

export const Info: Story = {
  args: {
    label: 'Info Button',
    severity: 'info'
  }
};

export const Warning: Story = {
  args: {
    label: 'Warning Button',
    severity: 'warning'
  }
};

export const Danger: Story = {
  args: {
    label: 'Danger Button',
    severity: 'danger'
  }
};

export const Outlined: Story = {
  args: {
    label: 'Outlined Button',
    outlined: true
  }
};

export const Text: Story = {
  args: {
    label: 'Text Button',
    text: true
  }
};

export const Raised: Story = {
  args: {
    label: 'Raised Button',
    raised: true
  }
};

export const Rounded: Story = {
  args: {
    label: 'Rounded Button',
    rounded: true
  }
};

export const WithIcon: Story = {
  args: {
    label: 'With Icon',
    icon: 'pi pi-check'
  }
};

export const IconOnly: Story = {
  args: {
    icon: 'pi pi-check',
    label: ''
  }
};

export const Loading: Story = {
  args: {
    label: 'Loading Button',
    loading: true
  }
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    disabled: true
  }
};

export const Small: Story = {
  args: {
    label: 'Small Button',
    size: 'small'
  }
};

export const Large: Story = {
  args: {
    label: 'Large Button',
    size: 'large'
  }
};

export const WithBrandTokens: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-column gap-3">
        <h6 class="m-0">Brand Token Integration</h6>
        <div class="flex gap-3">
          <p-button
            label="Primary Brand"
            class="brand-button-primary">
          </p-button>
          <p-button
            label="Secondary Brand"
            severity="secondary"
            class="brand-button-secondary">
          </p-button>
        </div>
        <small class="text-600">Uses PrimeNG theme tokens. Customize in tokens.css.</small>
      </div>
      <style>
        .brand-button-primary {
          background: var(--brand-primary) !important;
          border-color: var(--brand-primary) !important;
          color: white !important;
          padding: var(--brand-button-padding-y) var(--brand-button-padding-x) !important;
          font-weight: var(--brand-button-font-weight) !important;
          border-radius: var(--brand-border-radius) !important;
          box-shadow: var(--brand-shadow) !important;
        }
        .brand-button-primary:hover {
          background: var(--brand-primary-dark) !important;
          border-color: var(--brand-primary-dark) !important;
        }
        .brand-button-secondary {
          background: var(--brand-secondary) !important;
          border-color: var(--brand-secondary) !important;
        }
        .brand-button-secondary:hover {
          background: var(--brand-secondary-dark) !important;
          border-color: var(--brand-secondary-dark) !important;
        }
      </style>
    `
  })
};
