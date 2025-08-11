import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

const meta: Meta = {
  title: 'PrimeNG/RadioButton',
  decorators: [
    moduleMetadata({
      imports: [RadioButtonModule, FormsModule],
    }),
  ],
  argTypes: {
    selectedValue: {
      control: 'text',
      description: 'Value of the selected radio button'
    },
    label: {
      control: 'text',
      description: 'Label text for the radio button'
    },
    value: {
      control: 'text',
      description: 'Value of the radio button'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    readonly: {
      control: 'boolean',
      description: 'Readonly state'
    },
    inputId: {
      control: 'text',
      description: 'Identifier of the focus input to match a label defined for the component'
    },
    name: {
      control: 'text',
      description: 'Name of the radio button group'
    }
  },
  args: {
    selectedValue: null,
    label: 'Radio Button Label',
    value: 'radio-value',
    disabled: false,
    readonly: false,
    inputId: 'radio',
    name: 'radiogroup'
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex align-items-center">
        <p-radioButton 
          [(ngModel)]="selectedValue"
          [value]="value"
          [disabled]="disabled"
          [readonly]="readonly"
          [inputId]="inputId"
          [name]="name">
        </p-radioButton>
        <label [for]="inputId" class="ml-2">{{ label }}</label>
      </div>
    `
  })
};

export const Primary: Story = {
  args: {
    selectedValue: 'radio-value',
    label: 'Selected Radio Button'
  }
};

export const Unselected: Story = {
  args: {
    selectedValue: null,
    label: 'Unselected Radio Button'
  }
};

export const Disabled: Story = {
  args: {
    selectedValue: null,
    disabled: true,
    label: 'Disabled Radio Button'
  }
};

export const DisabledSelected: Story = {
  args: {
    selectedValue: 'radio-value',
    disabled: true,
    label: 'Disabled Selected Radio Button'
  }
};

export const Readonly: Story = {
  args: {
    selectedValue: 'radio-value',
    readonly: true,
    label: 'Readonly Radio Button'
  }
};

export const RadioGroup: Story = {
  render: (args) => ({
    props: {
      selectedOption: 'option1',
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' }
      ]
    },
    template: `
      <div class="flex flex-column gap-3">
        <h6 class="m-0">Radio Button Group</h6>
        <div class="flex flex-column gap-2">
          <div class="flex align-items-center" *ngFor="let option of options">
            <p-radioButton 
              [(ngModel)]="selectedOption"
              [inputId]="option.value"
              [name]="'group'"
              [value]="option.value">
            </p-radioButton>
            <label [for]="option.value" class="ml-2">{{ option.label }}</label>
          </div>
        </div>
        <small class="text-600">Selected: {{ selectedOption }}</small>
      </div>
    `
  })
};

export const HorizontalGroup: Story = {
  render: (args) => ({
    props: {
      selectedSize: 'medium',
      sizes: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' }
      ]
    },
    template: `
      <div class="flex flex-column gap-3">
        <h6 class="m-0">Size Selection</h6>
        <div class="flex gap-4">
          <div class="flex align-items-center" *ngFor="let size of sizes">
            <p-radioButton 
              [(ngModel)]="selectedSize"
              [inputId]="size.value"
              [name]="'size'"
              [value]="size.value">
            </p-radioButton>
            <label [for]="size.value" class="ml-2">{{ size.label }}</label>
          </div>
        </div>
        <small class="text-600">Selected size: {{ selectedSize }}</small>
      </div>
    `
  })
};

export const WithDescriptions: Story = {
  render: (args) => ({
    props: {
      selectedPlan: 'standard',
      plans: [
        { 
          value: 'basic', 
          title: 'Basic Plan', 
          description: 'Perfect for individuals getting started',
          price: '$9/month'
        },
        { 
          value: 'standard', 
          title: 'Standard Plan', 
          description: 'Great for small teams and growing businesses',
          price: '$29/month'
        },
        { 
          value: 'premium', 
          title: 'Premium Plan', 
          description: 'Advanced features for enterprise needs',
          price: '$99/month'
        }
      ]
    },
    template: `
      <div class="flex flex-column gap-3">
        <h6 class="m-0">Choose Your Plan</h6>
        <div class="flex flex-column gap-3">
          <div class="surface-card border-round p-3 cursor-pointer hover:surface-hover transition-duration-150" 
               *ngFor="let plan of plans"
               [class.surface-100]="selectedPlan === plan.value"
               (click)="selectedPlan = plan.value">
            <div class="flex align-items-start gap-3">
              <p-radioButton 
                [(ngModel)]="selectedPlan"
                [inputId]="plan.value"
                [name]="'plan'"
                [value]="plan.value">
              </p-radioButton>
              <div class="flex-1">
                <label [for]="plan.value" class="font-semibold cursor-pointer">{{ plan.title }}</label>
                <div class="text-600 text-sm mt-1">{{ plan.description }}</div>
                <div class="text-primary font-semibold mt-2">{{ plan.price }}</div>
              </div>
            </div>
          </div>
        </div>
        <small class="text-600">Selected plan: {{ selectedPlan }}</small>
      </div>
    `
  })
};

export const Invalid: Story = {
  render: (args) => ({
    props: {
      selectedValue: null,
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    template: `
      <div class="flex flex-column gap-3">
        <h6 class="m-0 text-red-500">Are you sure? *</h6>
        <div class="flex gap-4">
          <div class="flex align-items-center" *ngFor="let option of options">
            <p-radioButton 
              [(ngModel)]="selectedValue"
              [inputId]="option.value"
              [name]="'confirmation'"
              [value]="option.value"
              class="ng-invalid ng-dirty">
            </p-radioButton>
            <label [for]="option.value" class="ml-2">{{ option.label }}</label>
          </div>
        </div>
        <small class="text-red-500">This field is required</small>
      </div>
    `
  })
};

export const FormIntegration: Story = {
  render: (args) => ({
    props: {
      formData: {
        priority: 'medium',
        category: 'feature',
        urgency: 'normal'
      }
    },
    template: `
      <div class="flex flex-column gap-4 p-4 surface-card border-round">
        <h5 class="m-0">Issue Details</h5>
        
        <div class="flex flex-column gap-2">
          <label class="font-semibold">Priority Level</label>
          <div class="flex gap-4">
            <div class="flex align-items-center">
              <p-radioButton 
                [(ngModel)]="formData.priority"
                inputId="priority-low"
                name="priority"
                value="low">
              </p-radioButton>
              <label for="priority-low" class="ml-2">Low</label>
            </div>
            <div class="flex align-items-center">
              <p-radioButton 
                [(ngModel)]="formData.priority"
                inputId="priority-medium"
                name="priority"
                value="medium">
              </p-radioButton>
              <label for="priority-medium" class="ml-2">Medium</label>
            </div>
            <div class="flex align-items-center">
              <p-radioButton 
                [(ngModel)]="formData.priority"
                inputId="priority-high"
                name="priority"
                value="high">
              </p-radioButton>
              <label for="priority-high" class="ml-2">High</label>
            </div>
          </div>
        </div>
        
        <div class="flex flex-column gap-2">
          <label class="font-semibold">Issue Type</label>
          <div class="flex gap-4">
            <div class="flex align-items-center">
              <p-radioButton 
                [(ngModel)]="formData.category"
                inputId="category-bug"
                name="category"
                value="bug">
              </p-radioButton>
              <label for="category-bug" class="ml-2">Bug</label>
            </div>
            <div class="flex align-items-center">
              <p-radioButton 
                [(ngModel)]="formData.category"
                inputId="category-feature"
                name="category"
                value="feature">
              </p-radioButton>
              <label for="category-feature" class="ml-2">Feature</label>
            </div>
            <div class="flex align-items-center">
              <p-radioButton 
                [(ngModel)]="formData.category"
                inputId="category-improvement"
                name="category"
                value="improvement">
              </p-radioButton>
              <label for="category-improvement" class="ml-2">Improvement</label>
            </div>
          </div>
        </div>
        
        <div class="mt-3 p-3 surface-100 border-round">
          <small class="text-600">Form Data: {{ formData | json }}</small>
        </div>
      </div>
    `
  })
};
