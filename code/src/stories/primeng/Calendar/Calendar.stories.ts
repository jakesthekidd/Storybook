import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { colorPaletteManager } from '../../../theme/color-palette';

interface CalendarArgs {
  selectedDate: Date | null;
  placeholder: string;
  disabled: boolean;
  readonly: boolean;
  showIcon: boolean;
  icon: string;
  dateFormat: string;
  selectionMode: 'single' | 'multiple' | 'range';
  showTime: boolean;
  timeOnly: boolean;
  inline: boolean;
  showButtonBar: boolean;
  showWeek: boolean;
}

// Initialize color palette when this story loads
if (typeof document !== 'undefined') {
  colorPaletteManager.setThemeMode('light');
}

const meta: Meta<CalendarArgs> = {
  title: 'PrimeNG/Calendar',
  decorators: [moduleMetadata({ imports: [CalendarModule, FormsModule] })],
  args: {
    selectedDate: null,
    placeholder: 'Select a date',
    disabled: false,
    readonly: false,
    showIcon: true,
    icon: 'pi pi-calendar',
    dateFormat: 'mm/dd/yy',
    selectionMode: 'single',
    showTime: false,
    timeOnly: false,
    inline: false,
    showButtonBar: false,
    showWeek: false
  },
  argTypes: {
    selectedDate: {
      control: 'date',
      description: 'Selected date value'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no date is selected'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    readonly: {
      control: 'boolean',
      description: 'Readonly state'
    },
    showIcon: {
      control: 'boolean',
      description: 'Show calendar icon'
    },
    icon: {
      control: 'text',
      description: 'Icon to display'
    },
    dateFormat: {
      control: 'text',
      description: 'Format of the date'
    },
    selectionMode: {
      control: 'select',
      options: ['single', 'multiple', 'range'],
      description: 'Defines the quantity of the selection'
    },
    showTime: {
      control: 'boolean',
      description: 'Whether to display time picker'
    },
    timeOnly: {
      control: 'boolean',
      description: 'Whether to display time picker only'
    },
    inline: {
      control: 'boolean',
      description: 'When enabled, displays the calendar as inline'
    },
    showButtonBar: {
      control: 'boolean',
      description: 'Whether to display today and clear buttons'
    },
    showWeek: {
      control: 'boolean',
      description: 'Whether to display week numbers'
    }
  },
  render: (args) => ({
    template: `
      <div class="calendar-demo-container">
        <p-calendar
          [(ngModel)]="selectedDate"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [readonly]="readonly"
          [showIcon]="showIcon"
          [icon]="icon"
          [dateFormat]="dateFormat"
          [selectionMode]="selectionMode"
          [showTime]="showTime"
          [timeOnly]="timeOnly"
          [inline]="inline"
          [showButtonBar]="showButtonBar"
          [showWeek]="showWeek"
          class="token-calendar">
        </p-calendar>
        <div class="palette-info">
          <small>🎨 Colors from Color Palette Manager</small>
        </div>
      </div>
    `,
    props: args,
    ngOnInit: () => {
      // Initialize color palette when component loads
      if (typeof document !== 'undefined') {
        colorPaletteManager.setThemeMode('light');
        console.log('✅ Calendar: Initialized Color Palette Manager');
      }
    },
    styles: [`
      .calendar-demo-container {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        background: var(--palette-surface-ground, #EFF2F4);
        border-radius: 8px;
        min-height: 120px;
      }

      .palette-info {
        opacity: 0.7;
        font-family: 'Inter', system-ui, sans-serif;
        font-size: 12px;
        color: var(--palette-text-muted, #666);
      }

      /* PALETTE-DRIVEN CALENDAR STYLES */
      
      /* Calendar Input Field */
      .token-calendar .p-inputtext {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        border: 1px solid var(--palette-surface-border) !important;
        border-radius: 8px !important;
        background: var(--palette-surface) !important;
        color: var(--palette-text-primary) !important;
        padding: 0.75rem !important;
        transition: all 0.2s ease !important;
      }

      .token-calendar .p-inputtext:focus {
        border-color: var(--palette-primary) !important;
        box-shadow: 0 0 0 2px var(--palette-primary)20 !important;
        outline: none !important;
      }

      .token-calendar .p-inputtext::placeholder {
        color: var(--palette-text-muted) !important;
      }

      /* Calendar Icon - Uses Palette Primary Color */
      .token-calendar .p-button.p-datepicker-trigger,
      .token-calendar .p-datepicker-trigger.p-button,
      .token-calendar .p-datepicker-trigger {
        background: var(--palette-primary) !important;
        border: 1px solid var(--palette-primary) !important;
        border-radius: 8px !important;
        color: var(--palette-primary-contrast, #ffffff) !important;
        transition: all 0.2s ease !important;
      }

      .token-calendar .p-button.p-datepicker-trigger:hover,
      .token-calendar .p-datepicker-trigger.p-button:hover,
      .token-calendar .p-datepicker-trigger:hover {
        background: var(--palette-primary-hover) !important;
        border-color: var(--palette-primary-hover) !important;
      }

      /* Calendar Panel */
      .p-datepicker {
        border: 1px solid var(--palette-surface-border) !important;
        border-radius: 8px !important;
        background: var(--palette-surface) !important;
        font-family: 'Inter', system-ui, sans-serif !important;
      }

      /* Calendar Header */
      .p-datepicker .p-datepicker-header {
        background: var(--palette-surface-hover) !important;
        border-bottom: 1px solid var(--palette-surface-border) !important;
        border-radius: 8px 8px 0 0 !important;
        padding: 1rem !important;
      }

      .p-datepicker .p-datepicker-title {
        color: var(--palette-text-primary) !important;
        font-weight: 600 !important;
      }

      /* Navigation buttons */
      .p-datepicker .p-datepicker-prev,
      .p-datepicker .p-datepicker-next {
        background: transparent !important;
        border: 1px solid transparent !important;
        border-radius: 6px !important;
        color: var(--palette-primary) !important;
        transition: all 0.2s ease !important;
      }

      .p-datepicker .p-datepicker-prev:hover,
      .p-datepicker .p-datepicker-next:hover {
        background: var(--palette-primary)10 !important;
        border-color: var(--palette-primary) !important;
      }

      /* Calendar Table */
      .p-datepicker table {
        border-collapse: separate !important;
        border-spacing: 2px !important;
      }

      /* Day Headers */
      .p-datepicker .p-datepicker-calendar thead th {
        background: var(--surface-100) !important;
        color: var(--blue-700) !important;
        font-weight: 600 !important;
        padding: 0.75rem !important;
        border-radius: 6px !important;
      }

      /* Day Cells */
      .p-datepicker .p-datepicker-calendar td {
        padding: 2px !important;
      }

      .p-datepicker .p-datepicker-calendar td > span {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 2.5rem !important;
        height: 2.5rem !important;
        border-radius: 8px !important;
        transition: all 0.2s ease !important;
        font-weight: 500 !important;
        cursor: pointer !important;
      }

      /* Regular days */
      .p-datepicker .p-datepicker-calendar td:not(.p-datepicker-other-month) > span {
        color: var(--blue-700) !important;
        background: transparent !important;
      }

      .p-datepicker .p-datepicker-calendar td:not(.p-datepicker-other-month) > span:hover {
        background: var(--blue-50) !important;
        color: var(--blue-600) !important;
      }

      /* Today */
      .p-datepicker .p-datepicker-calendar td.p-datepicker-today > span {
        background: var(--cyan-50) !important;
        color: var(--blue-700) !important;
        border: 1px solid var(--cyan-500) !important;
      }

      .p-datepicker .p-datepicker-calendar td.p-datepicker-today > span:hover {
        background: var(--cyan-100) !important;
      }

      /* Selected date */
      .p-datepicker .p-datepicker-calendar td > span.p-highlight {
        background: var(--blue-500) !important;
        color: #ffffff !important;
        font-weight: 600 !important;
      }

      .p-datepicker .p-datepicker-calendar td > span.p-highlight:hover {
        background: var(--blue-600) !important;
      }

      /* Other month days */
      .p-datepicker .p-datepicker-calendar td.p-datepicker-other-month > span {
        color: var(--surface-500) !important;
        opacity: 0.6 !important;
      }

      /* Button Bar */
      .p-datepicker .p-datepicker-buttonbar {
        border-top: 1px solid var(--surface-400) !important;
        background: var(--surface-50) !important;
        padding: 1rem !important;
        border-radius: 0 0 8px 8px !important;
      }

      .p-datepicker .p-datepicker-buttonbar .p-button {
        font-family: 'Inter', system-ui, sans-serif !important;
        font-weight: 500 !important;
        border-radius: 6px !important;
        padding: 0.5rem 1rem !important;
        transition: all 0.2s ease !important;
      }

      .p-datepicker .p-datepicker-buttonbar .p-button.p-button-text {
        background: transparent !important;
        border: 1px solid transparent !important;
        color: var(--blue-500) !important;
      }

      .p-datepicker .p-datepicker-buttonbar .p-button.p-button-text:hover {
        background: var(--blue-50) !important;
        border-color: var(--blue-500) !important;
      }

      /* Time Picker */
      .p-datepicker .p-timepicker {
        border-top: 1px solid var(--surface-400) !important;
        background: var(--surface-50) !important;
        padding: 1rem !important;
      }

      .p-datepicker .p-timepicker .p-hour-picker,
      .p-datepicker .p-timepicker .p-minute-picker,
      .p-datepicker .p-timepicker .p-second-picker,
      .p-datepicker .p-timepicker .p-ampm-picker {
        color: var(--blue-700) !important;
        font-weight: 600 !important;
      }

      .p-datepicker .p-timepicker button {
        background: transparent !important;
        border: 1px solid var(--surface-400) !important;
        border-radius: 6px !important;
        color: var(--blue-500) !important;
        transition: all 0.2s ease !important;
      }

      .p-datepicker .p-timepicker button:hover {
        background: var(--blue-50) !important;
        border-color: var(--blue-500) !important;
      }

      /* Inline Calendar */
      .token-calendar .p-datepicker-inline {
        border: 1px solid var(--surface-400) !important;
        border-radius: 8px !important;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
      }

      /* Week Numbers */
      .p-datepicker .p-datepicker-calendar .p-datepicker-weeknumber {
        color: var(--surface-600) !important;
        font-weight: 600 !important;
        background: var(--surface-100) !important;
        border-radius: 6px !important;
      }

      /* Range Selection */
      .p-datepicker .p-datepicker-calendar td > span.p-highlight.p-datepicker-range {
        background: var(--blue-100) !important;
        color: var(--blue-700) !important;
      }

      .p-datepicker .p-datepicker-calendar td > span.p-highlight.p-datepicker-range-start,
      .p-datepicker .p-datepicker-calendar td > span.p-highlight.p-datepicker-range-end {
        background: var(--blue-500) !important;
        color: #ffffff !important;
      }

      /* Disabled State */
      .token-calendar .p-inputtext:disabled {
        background: var(--surface-100) !important;
        color: var(--surface-500) !important;
        opacity: 0.6 !important;
      }

      .token-calendar .p-datepicker-trigger:disabled {
        background: var(--surface-200) !important;
        border-color: var(--surface-200) !important;
        color: var(--surface-500) !important;
        opacity: 0.6 !important;
      }

      /* FINAL NUCLEAR OVERRIDE - Direct hex value enforcement */
      .token-calendar .p-datepicker-trigger,
      .token-calendar .p-button.p-datepicker-trigger,
      .p-datepicker-trigger.p-button {
        background-color: #2474BB !important;
        border-color: #2474BB !important;
      }

      .token-calendar .p-datepicker-trigger:hover,
      .token-calendar .p-button.p-datepicker-trigger:hover,
      .p-datepicker-trigger.p-button:hover {
        background-color: #2068A8 !important;
        border-color: #2068A8 !important;
      }
    `]
  }),
};

export default meta;
type Story = StoryObj<CalendarArgs>;

// Main Interactive Story
export const Interactive: Story = {
  args: {
    selectedDate: null,
    placeholder: 'Select a date',
    disabled: false,
    readonly: false,
    showIcon: true,
    icon: 'pi pi-calendar',
    dateFormat: 'mm/dd/yy',
    selectionMode: 'single',
    showTime: false,
    timeOnly: false,
    inline: false,
    showButtonBar: false,
    showWeek: false
  }
};

// Quick Examples
export const BasicCalendar: Story = {
  args: { placeholder: 'Select a date' }
};

export const WithSelectedDate: Story = {
  args: { 
    selectedDate: new Date(),
    placeholder: 'Date selected'
  }
};

export const WithIcon: Story = {
  args: {
    showIcon: true,
    placeholder: 'Click icon to open calendar'
  }
};

export const WithoutIcon: Story = {
  args: {
    showIcon: false,
    placeholder: 'Click input to open calendar'
  }
};

export const WithTime: Story = {
  args: {
    showTime: true,
    placeholder: 'Select date and time',
    showButtonBar: true
  }
};

export const TimeOnly: Story = {
  args: {
    timeOnly: true,
    placeholder: 'Select time only',
    showButtonBar: true
  }
};

export const WithButtonBar: Story = {
  args: {
    showButtonBar: true,
    placeholder: 'Calendar with Today/Clear buttons'
  }
};

export const WithWeekNumbers: Story = {
  args: {
    showWeek: true,
    placeholder: 'Calendar with week numbers'
  }
};

export const InlineCalendar: Story = {
  args: {
    inline: true,
    selectedDate: new Date(),
    showButtonBar: true
  }
};

export const RangeSelection: Story = {
  args: {
    selectionMode: 'range',
    placeholder: 'Select date range',
    showButtonBar: true
  }
};

export const MultipleSelection: Story = {
  args: {
    selectionMode: 'multiple',
    placeholder: 'Select multiple dates',
    showButtonBar: true
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    selectedDate: new Date(),
    placeholder: 'Disabled calendar'
  }
};

export const Readonly: Story = {
  args: {
    readonly: true,
    selectedDate: new Date(),
    placeholder: 'Readonly calendar'
  }
};
