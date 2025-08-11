import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';

const meta: Meta = {
  title: 'PrimeNG/Calendar',
  decorators: [
    moduleMetadata({
      imports: [CalendarModule, FormsModule],
    }),
  ],
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

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
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
        [showWeek]="showWeek">
      </p-calendar>
    `
  })
};

export const Primary: Story = {
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

export const WithTime: Story = {
  args: {
    showTime: true,
    placeholder: 'Select date and time',
    dateFormat: 'mm/dd/yy',
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

export const Inline: Story = {
  render: (args) => ({
    props: {
      ...args,
      selectedDate: new Date()
    },
    template: `
      <div class="flex flex-column gap-3">
        <h6 class="m-0">Inline Calendar</h6>
        <p-calendar 
          [(ngModel)]="selectedDate"
          [inline]="true"
          [showButtonBar]="showButtonBar">
        </p-calendar>
        <small class="text-600">Selected: {{ selectedDate | date:'medium' }}</small>
      </div>
    `
  }),
  args: {
    showButtonBar: true
  }
};

export const MultipleSelection: Story = {
  render: (args) => ({
    props: {
      selectedDates: [new Date(), new Date(Date.now() + 86400000)],
      ...args
    },
    template: `
      <div class="flex flex-column gap-3">
        <p-calendar 
          [(ngModel)]="selectedDates"
          [placeholder]="placeholder"
          [selectionMode]="'multiple'"
          [showButtonBar]="true">
        </p-calendar>
        <small class="text-600">Selected dates: {{ selectedDates?.length || 0 }}</small>
      </div>
    `
  }),
  args: {
    placeholder: 'Select multiple dates'
  }
};

export const RangeSelection: Story = {
  render: (args) => ({
    props: {
      selectedRange: [new Date(), new Date(Date.now() + 7 * 86400000)],
      ...args
    },
    template: `
      <div class="flex flex-column gap-3">
        <p-calendar 
          [(ngModel)]="selectedRange"
          [placeholder]="placeholder"
          [selectionMode]="'range'"
          [showButtonBar]="true">
        </p-calendar>
        <small class="text-600" *ngIf="selectedRange && selectedRange[0] && selectedRange[1]">
          From: {{ selectedRange[0] | date:'mediumDate' }} 
          To: {{ selectedRange[1] | date:'mediumDate' }}
        </small>
      </div>
    `
  }),
  args: {
    placeholder: 'Select date range'
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

export const DifferentFormats: Story = {
  render: (args) => ({
    props: {
      date1: new Date(),
      date2: new Date(),
      date3: new Date(),
      date4: new Date()
    },
    template: `
      <div class="flex flex-column gap-4">
        <h6 class="m-0">Different Date Formats</h6>
        
        <div class="flex flex-column gap-2">
          <label class="font-semibold">US Format (mm/dd/yy)</label>
          <p-calendar 
            [(ngModel)]="date1"
            dateFormat="mm/dd/yy"
            placeholder="mm/dd/yy">
          </p-calendar>
        </div>
        
        <div class="flex flex-column gap-2">
          <label class="font-semibold">European Format (dd/mm/yy)</label>
          <p-calendar 
            [(ngModel)]="date2"
            dateFormat="dd/mm/yy"
            placeholder="dd/mm/yy">
          </p-calendar>
        </div>
        
        <div class="flex flex-column gap-2">
          <label class="font-semibold">ISO Format (yy-mm-dd)</label>
          <p-calendar 
            [(ngModel)]="date3"
            dateFormat="yy-mm-dd"
            placeholder="yy-mm-dd">
          </p-calendar>
        </div>
        
        <div class="flex flex-column gap-2">
          <label class="font-semibold">Custom Format (DD, MM d, yy)</label>
          <p-calendar 
            [(ngModel)]="date4"
            dateFormat="DD, MM d, yy"
            placeholder="Monday, January 1, 23">
          </p-calendar>
        </div>
      </div>
    `
  })
};

export const Invalid: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-column gap-2">
        <label class="font-semibold text-red-500">Birth Date *</label>
        <p-calendar 
          [(ngModel)]="selectedDate"
          [placeholder]="placeholder"
          [showIcon]="showIcon"
          class="ng-invalid ng-dirty">
        </p-calendar>
        <small class="text-red-500">Birth date is required</small>
      </div>
    `
  }),
  args: {
    placeholder: 'Required field'
  }
};

export const FormIntegration: Story = {
  render: (args) => ({
    props: {
      formData: {
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 86400000),
        meetingTime: new Date(),
        deadline: null
      }
    },
    template: `
      <div class="flex flex-column gap-4 p-4 surface-card border-round">
        <h5 class="m-0">Event Planning Form</h5>
        
        <div class="flex flex-column gap-2">
          <label class="font-semibold">Event Date Range</label>
          <div class="flex gap-3">
            <p-calendar 
              [(ngModel)]="formData.startDate"
              placeholder="Start date"
              dateFormat="mm/dd/yy">
            </p-calendar>
            <p-calendar 
              [(ngModel)]="formData.endDate"
              placeholder="End date"
              dateFormat="mm/dd/yy">
            </p-calendar>
          </div>
        </div>
        
        <div class="flex flex-column gap-2">
          <label class="font-semibold">Meeting Time</label>
          <p-calendar 
            [(ngModel)]="formData.meetingTime"
            [showTime]="true"
            placeholder="Select meeting time"
            dateFormat="mm/dd/yy">
          </p-calendar>
        </div>
        
        <div class="flex flex-column gap-2">
          <label class="font-semibold">Project Deadline</label>
          <p-calendar 
            [(ngModel)]="formData.deadline"
            placeholder="Optional deadline"
            [showButtonBar]="true">
          </p-calendar>
        </div>
        
        <div class="mt-3 p-3 surface-100 border-round">
          <small class="text-600">Form Data: {{ formData | json }}</small>
        </div>
      </div>
    `
  })
};
