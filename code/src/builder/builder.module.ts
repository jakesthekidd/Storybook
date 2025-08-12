import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG imports
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

// Builder components
import { BuilderButtonComponent } from './components/builder-button.component';
import { BuilderInputComponent } from './components/builder-input.component';
import { BuilderCalendarComponent } from './components/builder-calendar.component';

@NgModule({
  declarations: [
    BuilderButtonComponent,
    BuilderInputComponent,
    BuilderCalendarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CalendarModule
  ],
  exports: [
    BuilderButtonComponent,
    BuilderInputComponent,
    BuilderCalendarComponent
  ]
})
export class BuilderComponentsModule {}
