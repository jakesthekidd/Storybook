import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'builder-input',
  template: `
    <div class="builder-input-wrapper">
      <label *ngIf="label" [for]="inputId" class="input-label">{{ label }}</label>
      <input 
        pInputText 
        [id]="inputId"
        [value]="value"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [type]="type"
        [size]="size"
        [class]="'builder-input ' + (variant === 'filled' ? 'p-filled' : '')"
        (input)="onInput($event)"
        (focus)="onFocus.emit($event)"
        (blur)="onBlur.emit($event)"
      />
      <small *ngIf="helpText" class="help-text">{{ helpText }}</small>
    </div>
  `,
  styles: [`
    .builder-input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }
    
    .input-label {
      font-weight: 500;
      color: var(--p-text-color, #0f172a);
      font-size: var(--p-font-size, 14px);
    }
    
    .builder-input {
      font-family: var(--p-font-family, "Inter", system-ui, sans-serif);
      border-radius: var(--p-border-radius, 6px);
      border: 1px solid var(--p-surface-300, #cbd5e1);
      padding: 0.5rem 0.75rem;
      transition: all 0.2s ease;
      width: 100%;
    }
    
    .builder-input:focus {
      outline: none;
      border-color: var(--p-primary-color, #3b82f6);
      box-shadow: 0 0 0 2px var(--p-primary-color, #3b82f6)33;
    }
    
    .help-text {
      color: var(--p-text-muted-color, #64748b);
      font-size: 0.875rem;
    }
  `]
})
export class BuilderInputComponent {
  @Input() label?: string;
  @Input() value: string = '';
  @Input() placeholder: string = 'Enter text...';
  @Input() disabled: boolean = false;
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' = 'text';
  @Input() size: 'small' | 'large' | null = null;
  @Input() variant: 'outlined' | 'filled' = 'outlined';
  @Input() helpText?: string;
  @Input() inputId: string = 'builder-input-' + Math.random().toString(36).substr(2, 9);
  
  @Output() valueChange = new EventEmitter<string>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();
  
  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}
