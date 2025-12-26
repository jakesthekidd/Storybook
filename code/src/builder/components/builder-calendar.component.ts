import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'builder-calendar',
  template: `
    <div class="builder-calendar-wrapper">
      <label *ngIf="label" [for]="calendarId" class="calendar-label">{{ label }}</label>
      <p-calendar
        [id]="calendarId"
        [ngModel]="value"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [inline]="inline"
        [showIcon]="showIcon"
        [dateFormat]="dateFormat"
        [selectionMode]="selectionMode"
        [minDate]="minDate"
        [maxDate]="maxDate"
        [showButtonBar]="showButtonBar"
        [showTime]="showTime"
        [timeOnly]="timeOnly"
        class="builder-calendar"
        (ngModelChange)="onDateChange($event)"
        (onSelect)="onSelect.emit($event)"
        (onFocus)="onFocus.emit($event)"
        (onBlur)="onBlur.emit($event)"
      ></p-calendar>
      <small *ngIf="helpText" class="help-text">{{ helpText }}</small>
    </div>
  `,
  styles: [`
    .builder-calendar-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }
    
    .calendar-label {
      font-weight: 500;
      color: var(--p-text-color, #0f172a);
      font-size: var(--p-font-size, 14px);
    }
    
    .builder-calendar {
      font-family: var(--p-font-family, "Inter", system-ui, sans-serif);
    }
    
    .help-text {
      color: var(--p-text-muted-color, #64748b);
      font-size: 0.875rem;
    }
  `]
})
export class BuilderCalendarComponent {
  @Input() label?: string;
  @Input() value: Date | Date[] | null = null;
  @Input() placeholder: string = 'Select date...';
  @Input() disabled: boolean = false;
  @Input() inline: boolean = false;
  @Input() showIcon: boolean = true;
  @Input() dateFormat: string = 'mm/dd/yy';
  @Input() selectionMode: 'single' | 'multiple' | 'range' = 'single';
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() showButtonBar: boolean = false;
  @Input() showTime: boolean = false;
  @Input() timeOnly: boolean = false;
  @Input() helpText?: string;
  @Input() calendarId: string = 'builder-calendar-' + Math.random().toString(36).substr(2, 9);
  
  @Output() valueChange = new EventEmitter<Date | Date[] | null>();
  @Output() onSelect = new EventEmitter<Date>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();
  
  onDateChange(date: Date | Date[] | null) {
    this.value = date;
    this.valueChange.emit(this.value);
  }
}
