import { Builder } from '@builder.io/sdk';
import { BuilderButtonComponent, BuilderInputComponent, BuilderCalendarComponent } from './components';

// Register Button Component
Builder.registerComponent(BuilderButtonComponent, {
  name: 'PrimeNG Button',
  inputs: [
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Button',
      required: true,
      helperText: 'The text displayed on the button'
    },
    {
      name: 'severity',
      type: 'enum',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Success', value: 'success' },
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Help', value: 'help' },
        { label: 'Danger', value: 'danger' },
        { label: 'Contrast', value: null }
      ],
      defaultValue: 'primary',
      helperText: 'Button color theme'
    },
    {
      name: 'size',
      type: 'enum',
      options: [
        { label: 'Normal', value: null },
        { label: 'Small', value: 'small' },
        { label: 'Large', value: 'large' }
      ],
      defaultValue: null,
      helperText: 'Button size'
    },
    {
      name: 'outlined',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Show button with outline style'
    },
    {
      name: 'raised',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Show button with raised effect'
    },
    {
      name: 'rounded',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Show button with rounded corners'
    },
    {
      name: 'text',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Show button as text only'
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Disable button interaction'
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Make button full width'
    },
    {
      name: 'icon',
      type: 'string',
      helperText: 'PrimeIcons class name (e.g., pi pi-search, pi pi-user)'
    }
  ],
  defaultStyles: {
    display: 'inline-block',
    marginBottom: '10px'
  }
});

// Register Input Component
Builder.registerComponent(BuilderInputComponent, {
  name: 'PrimeNG Input',
  inputs: [
    {
      name: 'label',
      type: 'string',
      helperText: 'Label text for the input field'
    },
    {
      name: 'placeholder',
      type: 'string',
      defaultValue: 'Enter text...',
      helperText: 'Placeholder text shown when input is empty'
    },
    {
      name: 'value',
      type: 'string',
      defaultValue: '',
      helperText: 'Current value of the input'
    },
    {
      name: 'type',
      type: 'enum',
      options: [
        { label: 'Text', value: 'text' },
        { label: 'Email', value: 'email' },
        { label: 'Password', value: 'password' },
        { label: 'Number', value: 'number' },
        { label: 'Phone', value: 'tel' },
        { label: 'URL', value: 'url' }
      ],
      defaultValue: 'text',
      helperText: 'Input field type'
    },
    {
      name: 'size',
      type: 'enum',
      options: [
        { label: 'Normal', value: null },
        { label: 'Small', value: 'small' },
        { label: 'Large', value: 'large' }
      ],
      defaultValue: null,
      helperText: 'Input field size'
    },
    {
      name: 'variant',
      type: 'enum',
      options: [
        { label: 'Outlined', value: 'outlined' },
        { label: 'Filled', value: 'filled' }
      ],
      defaultValue: 'outlined',
      helperText: 'Input field style variant'
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Disable input interaction'
    },
    {
      name: 'helpText',
      type: 'string',
      helperText: 'Help text displayed below the input'
    }
  ],
  defaultStyles: {
    display: 'block',
    width: '100%',
    marginBottom: '15px'
  }
});

// Register Calendar Component
Builder.registerComponent(BuilderCalendarComponent, {
  name: 'PrimeNG Calendar',
  group: 'Form Controls',
  image: 'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F4c4e4f4e4f4e4f4e4f4e4f4e4f4e4f4e',
  inputs: [
    {
      name: 'label',
      type: 'string',
      helperText: 'Label text for the calendar field'
    },
    {
      name: 'placeholder',
      type: 'string',
      defaultValue: 'Select date...',
      helperText: 'Placeholder text shown when no date is selected'
    },
    {
      name: 'dateFormat',
      type: 'enum',
      options: [
        { label: 'MM/DD/YY', value: 'mm/dd/yy' },
        { label: 'DD/MM/YY', value: 'dd/mm/yy' },
        { label: 'YYYY-MM-DD', value: 'yy-mm-dd' },
        { label: 'MMM DD, YYYY', value: 'M dd, yy' }
      ],
      defaultValue: 'mm/dd/yy',
      helperText: 'Date display format'
    },
    {
      name: 'selectionMode',
      type: 'enum',
      options: [
        { label: 'Single Date', value: 'single' },
        { label: 'Multiple Dates', value: 'multiple' },
        { label: 'Date Range', value: 'range' }
      ],
      defaultValue: 'single',
      helperText: 'Date selection mode'
    },
    {
      name: 'showIcon',
      type: 'boolean',
      defaultValue: true,
      helperText: 'Show calendar icon'
    },
    {
      name: 'inline',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Display calendar inline instead of popup'
    },
    {
      name: 'showTime',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Enable time selection'
    },
    {
      name: 'timeOnly',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Show time picker only'
    },
    {
      name: 'showButtonBar',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Show today and clear buttons'
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: false,
      helperText: 'Disable calendar interaction'
    },
    {
      name: 'helpText',
      type: 'string',
      helperText: 'Help text displayed below the calendar'
    }
  ],
  defaultStyles: {
    display: 'block',
    width: '100%',
    marginBottom: '15px'
  }
});

// Export registration function
export function registerBuilderComponents() {
  console.log('🎯 Builder.io components registered successfully!');
  console.log('📦 Available components: PrimeNG Button, PrimeNG Input, PrimeNG Calendar');
}
