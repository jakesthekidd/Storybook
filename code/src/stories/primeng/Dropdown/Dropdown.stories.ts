import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

interface DropdownOption {
  label: string;
  value: any;
  icon?: string;
}

const meta: Meta = {
  title: 'PrimeNG/Dropdown',
  decorators: [
    moduleMetadata({
      imports: [DropdownModule, FormsModule],
    }),
  ],
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of options to display'
    },
    selectedOption: {
      control: 'object',
      description: 'Selected option value'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    filter: {
      control: 'boolean',
      description: 'Enable filtering'
    },
    showClear: {
      control: 'boolean',
      description: 'Show clear button'
    },
    optionLabel: {
      control: 'text',
      description: 'Property name to use as the label of an option'
    },
    optionValue: {
      control: 'text',
      description: 'Property name to use as the value of an option'
    },
    size: {
      control: 'select',
      options: ['small', 'large'],
      description: 'Size of the dropdown'
    }
  },
  args: {
    options: [
      { label: 'New York', value: 'NY' },
      { label: 'Rome', value: 'RM' },
      { label: 'London', value: 'LDN' },
      { label: 'Istanbul', value: 'IST' },
      { label: 'Paris', value: 'PRS' }
    ],
    selectedOption: null,
    placeholder: 'Select a City',
    disabled: false,
    filter: false,
    showClear: false,
    optionLabel: 'label',
    optionValue: 'value',
    size: undefined
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-dropdown 
        [options]="options"
        [(ngModel)]="selectedOption"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [filter]="filter"
        [showClear]="showClear"
        [optionLabel]="optionLabel"
        [optionValue]="optionValue"
        [class]="size ? 'p-dropdown-' + size : ''">
      </p-dropdown>
    `
  })
};

export const WithValue: Story = {
  args: {
    selectedOption: 'NY'
  }
};

export const WithFilter: Story = {
  args: {
    filter: true,
    placeholder: 'Select a city (filterable)'
  }
};

export const WithClear: Story = {
  args: {
    showClear: true,
    selectedOption: 'RM',
    placeholder: 'Select a city (clearable)'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    selectedOption: 'LDN'
  }
};

export const Small: Story = {
  args: {
    size: 'small',
    placeholder: 'Small dropdown'
  }
};

export const Large: Story = {
  args: {
    size: 'large',
    placeholder: 'Large dropdown'
  }
};

export const WithIcons: Story = {
  render: (args) => ({
    props: {
      ...args,
      options: [
        { label: 'Australia', value: 'AU', icon: 'pi pi-flag' },
        { label: 'Brazil', value: 'BR', icon: 'pi pi-flag' },
        { label: 'China', value: 'CN', icon: 'pi pi-flag' },
        { label: 'Egypt', value: 'EG', icon: 'pi pi-flag' },
        { label: 'France', value: 'FR', icon: 'pi pi-flag' },
        { label: 'Germany', value: 'DE', icon: 'pi pi-flag' },
        { label: 'India', value: 'IN', icon: 'pi pi-flag' },
        { label: 'Japan', value: 'JP', icon: 'pi pi-flag' }
      ]
    },
    template: `
      <p-dropdown
        [options]="options"
        [(ngModel)]="selectedOption"
        [placeholder]="placeholder"
        optionLabel="label"
        optionValue="value">
        <ng-template let-country pTemplate="item">
          <div class="flex align-items-center gap-2">
            <i [class]="country.icon"></i>
            <span>{{ country.label }}</span>
          </div>
        </ng-template>
      </p-dropdown>
    `
  }),
  args: {
    placeholder: 'Select a Country'
  }
};

export const Invalid: Story = {
  render: (args) => ({
    props: args,
    template: `
      <p-dropdown 
        [options]="options"
        [(ngModel)]="selectedOption"
        [placeholder]="placeholder"
        optionLabel="label"
        optionValue="value"
        class="ng-invalid ng-dirty">
      </p-dropdown>
    `
  }),
  args: {
    placeholder: 'Invalid dropdown state'
  }
};

export const EmptyOptions: Story = {
  args: {
    options: [],
    placeholder: 'No options available'
  }
};
