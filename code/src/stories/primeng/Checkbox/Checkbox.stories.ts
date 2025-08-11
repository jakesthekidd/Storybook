import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

const meta: Meta = {
  title: 'PrimeNG/Checkbox',
  decorators: [
    moduleMetadata({
      imports: [CheckboxModule, FormsModule],
    }),
  ],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Checked state of the checkbox'
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    readonly: {
      control: 'boolean',
      description: 'Readonly state'
    },
    binary: {
      control: 'boolean',
      description: 'Allows to select a boolean value instead of multiple values'
    },
    indeterminate: {
      control: 'boolean',
      description: 'Visual indeterminate state'
    },
    inputId: {
      control: 'text',
      description: 'Identifier of the focus input to match a label defined for the component'
    },
    name: {
      control: 'text',
      description: 'Name of the checkbox group'
    },
    value: {
      control: 'text',
      description: 'Value of the checkbox'
    }
  },
  args: {
    checked: false,
    label: 'Checkbox Label',
    disabled: false,
    readonly: false,
    binary: true,
    indeterminate: false,
    inputId: 'checkbox',
    name: 'checkbox',
    value: 'checkbox-value'
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex align-items-center">
        <p-checkbox 
          [(ngModel)]="checked"
          [disabled]="disabled"
          [readonly]="readonly"
          [binary]="binary"
          [inputId]="inputId"
          [name]="name"
          [value]="value">
        </p-checkbox>
        <label [for]="inputId" class="ml-2">{{ label }}</label>
      </div>
    `
  })
};

export const Primary: Story = {
  args: {
    checked: true,
    label: 'Primary Checkbox (Checked)'
  }
};

export const Unchecked: Story = {
  args: {
    checked: false,
    label: 'Unchecked Checkbox'
  }
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'Disabled Checkbox'
  }
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Disabled Checked Checkbox'
  }
};

export const Readonly: Story = {
  args: {
    checked: true,
    readonly: true,
    label: 'Readonly Checkbox'
  }
};

export const Indeterminate: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex align-items-center">
        <p-checkbox 
          [(ngModel)]="checked"
          [disabled]="disabled"
          [readonly]="readonly"
          [binary]="binary"
          [inputId]="inputId"
          [name]="name"
          [value]="value"
          class="p-checkbox-indeterminate">
        </p-checkbox>
        <label [for]="inputId" class="ml-2">{{ label }}</label>
      </div>
    `
  }),
  args: {
    checked: null,
    label: 'Indeterminate Checkbox',
    binary: false
  }
};

export const MultipleCheckboxes: Story = {
  render: (args) => ({
    props: {
      selectedOptions: ['option1'],
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' }
      ]
    },
    template: `
      <div class="flex flex-column gap-3">
        <h6 class="m-0">Multiple Checkboxes</h6>
        <div class="flex flex-column gap-2">
          <div class="flex align-items-center" *ngFor="let option of options">
            <p-checkbox 
              [(ngModel)]="selectedOptions"
              [inputId]="option.value"
              [name]="'group'"
              [value]="option.value">
            </p-checkbox>
            <label [for]="option.value" class="ml-2">{{ option.label }}</label>
          </div>
        </div>
        <small class="text-600">Selected: {{ selectedOptions | json }}</small>
      </div>
    `
  })
};

export const Invalid: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex align-items-center">
        <p-checkbox 
          [(ngModel)]="checked"
          [disabled]="disabled"
          [readonly]="readonly"
          [binary]="binary"
          [inputId]="inputId"
          [name]="name"
          [value]="value"
          class="ng-invalid ng-dirty">
        </p-checkbox>
        <label [for]="inputId" class="ml-2 text-red-500">{{ label }}</label>
      </div>
    `
  }),
  args: {
    label: 'Invalid Checkbox (Required)'
  }
};

export const WithCustomStyling: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-column gap-3">
        <div class="flex align-items-center">
          <p-checkbox 
            [(ngModel)]="checked"
            [inputId]="inputId"
            [binary]="binary"
            class="checkbox-lg">
          </p-checkbox>
          <label [for]="inputId" class="ml-2 font-semibold">{{ label }}</label>
        </div>
        <small class="text-600">Uses brand tokens for consistent theming</small>
      </div>
      <style>
        .checkbox-lg .p-checkbox-box {
          width: 1.5rem;
          height: 1.5rem;
        }
        .checkbox-lg .p-checkbox-icon {
          font-size: 1rem;
        }
      </style>
    `
  }),
  args: {
    checked: true,
    label: 'Large Custom Checkbox',
    inputId: 'custom-checkbox'
  }
};

export const FormIntegration: Story = {
  render: (args) => ({
    props: {
      formData: {
        notifications: true,
        newsletter: false,
        terms: false
      }
    },
    template: `
      <div class="flex flex-column gap-4 p-4 surface-card border-round">
        <h5 class="m-0">User Preferences</h5>
        
        <div class="flex align-items-center">
          <p-checkbox 
            [(ngModel)]="formData.notifications"
            inputId="notifications"
            [binary]="true">
          </p-checkbox>
          <label for="notifications" class="ml-2">Enable push notifications</label>
        </div>
        
        <div class="flex align-items-center">
          <p-checkbox 
            [(ngModel)]="formData.newsletter"
            inputId="newsletter"
            [binary]="true">
          </p-checkbox>
          <label for="newsletter" class="ml-2">Subscribe to newsletter</label>
        </div>
        
        <div class="flex align-items-center">
          <p-checkbox 
            [(ngModel)]="formData.terms"
            inputId="terms"
            [binary]="true">
          </p-checkbox>
          <label for="terms" class="ml-2">I agree to the terms and conditions *</label>
        </div>
        
        <div class="mt-3 p-3 surface-100 border-round">
          <small class="text-600">Form Data: {{ formData | json }}</small>
        </div>
      </div>
    `
  })
};
