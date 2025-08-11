import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

const meta: Meta = {
  title: 'PrimeNG/InputText',
  decorators: [
    moduleMetadata({
      imports: [InputTextModule, FormsModule],
    }),
  ],
  argTypes: {
    value: {
      control: 'text',
      description: 'Input value'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    readonly: {
      control: 'boolean',
      description: 'Readonly state'
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'Size of the input'
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled'],
      description: 'Variant of the input'
    }
  },
  args: {
    value: '',
    placeholder: 'Enter text...',
    disabled: false,
    readonly: false,
    size: undefined,
    variant: 'outlined'
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <input 
        pInputText 
        [(ngModel)]="value"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [readonly]="readonly"
        [class]="'p-inputtext-' + size"
        [attr.data-variant]="variant" />
    `
  })
};

export const WithValue: Story = {
  args: {
    value: 'Sample text input'
  }
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Type something here...'
  }
};

export const Disabled: Story = {
  args: {
    value: 'Disabled input',
    disabled: true
  }
};

export const Readonly: Story = {
  args: {
    value: 'Readonly input',
    readonly: true
  }
};

export const Small: Story = {
  args: {
    size: 'small',
    placeholder: 'Small input'
  }
};

export const Large: Story = {
  args: {
    size: 'large',
    placeholder: 'Large input'
  }
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    placeholder: 'Filled variant'
  }
};

export const Invalid: Story = {
  render: (args) => ({
    props: args,
    template: `
      <input 
        pInputText 
        [(ngModel)]="value"
        [placeholder]="placeholder"
        class="ng-invalid ng-dirty" />
    `
  }),
  args: {
    placeholder: 'Invalid input state'
  }
};

export const Focus: Story = {
  render: (args) => ({
    props: args,
    template: `
      <input 
        pInputText 
        [(ngModel)]="value"
        [placeholder]="placeholder"
        class="p-focus" />
    `
  }),
  args: {
    placeholder: 'Focused input state'
  }
};
