import { Component, Input } from '@angular/core';

@Component({
  selector: 'builder-button',
  template: `
    <button 
      pButton 
      [label]="label"
      [severity]="severity"
      [outlined]="outlined"
      [disabled]="disabled"
      [icon]="icon"
      [size]="size"
      [raised]="raised"
      [rounded]="rounded"
      [text]="text"
      class="builder-button"
      [style.width]="fullWidth ? '100%' : 'auto'">
    </button>
  `,
  styles: [`
    .builder-button {
      font-family: var(--p-font-family, "Inter", system-ui, sans-serif);
      border-radius: var(--p-border-radius, 6px);
      transition: all 0.2s ease;
    }
  `]
})
export class BuilderButtonComponent {
  @Input() label: string = 'Button';
  @Input() severity: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger' | null = 'primary';
  @Input() outlined: boolean = false;
  @Input() disabled: boolean = false;
  @Input() icon?: string;
  @Input() size: 'small' | 'large' | null = null;
  @Input() raised: boolean = false;
  @Input() rounded: boolean = false;
  @Input() text: boolean = false;
  @Input() fullWidth: boolean = false;
}
