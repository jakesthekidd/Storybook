import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { colorPaletteManager, type ColorPalette, type ThemeMode } from '../../theme/color-palette';

interface ColorPaletteArgs {
  themeMode: ThemeMode;
  primaryColor: string;
  successColor: string;
  warningColor: string;
  dangerColor: string;
}

const meta: Meta<ColorPaletteArgs> = {
  title: 'Theme/ColorPalette',
  decorators: [moduleMetadata({ 
    imports: [FormsModule, ButtonModule, DropdownModule, CalendarModule, InputTextModule, ColorPickerModule] 
  })],
  args: {
    themeMode: 'light',
    primaryColor: '#2474BB',
    successColor: '#00BF30',
    warningColor: '#FFA300',
    dangerColor: '#DA1F2C'
  },
  argTypes: {
    themeMode: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Switch between light and dark theme modes'
    },
    primaryColor: {
      control: 'color',
      description: 'Primary brand color used across all components'
    },
    successColor: {
      control: 'color', 
      description: 'Success state color for positive actions'
    },
    warningColor: {
      control: 'color',
      description: 'Warning state color for caution states'
    },
    dangerColor: {
      control: 'color',
      description: 'Danger state color for destructive actions'
    }
  },
  render: (args) => {
    // Apply color palette changes when controls change
    colorPaletteManager.setThemeMode(args.themeMode);
    colorPaletteManager.updateColors({
      primary: args.primaryColor,
      success: args.successColor,
      warning: args.warningColor,
      danger: args.dangerColor
    });
    
    return {
      template: `
        <div class="color-palette-demo">
          <div class="palette-header">
            <h2>🎨 Color Palette Manager</h2>
            <p>Central control for all PrimeNG component colors. Change colors here and watch all components update instantly.</p>
          </div>
          
          <div class="palette-grid">
            <!-- Current Color Palette Display -->
            <div class="palette-section">
              <h3>Active Color Palette</h3>
              <div class="color-swatches">
                <div class="color-swatch">
                  <div class="color-box primary-color"></div>
                  <span>Primary</span>
                </div>
                <div class="color-swatch">
                  <div class="color-box success-color"></div>
                  <span>Success</span>
                </div>
                <div class="color-swatch">
                  <div class="color-box warning-color"></div>
                  <span>Warning</span>
                </div>
                <div class="color-swatch">
                  <div class="color-box danger-color"></div>
                  <span>Danger</span>
                </div>
              </div>
            </div>
            
            <!-- Live Component Examples -->
            <div class="palette-section">
              <h3>Live Component Examples</h3>
              <div class="component-examples">
                <div class="example-row">
                  <label>Buttons use palette colors:</label>
                  <div class="button-group">
                    <button pButton label="Primary" severity="primary" class="p-button-sm"></button>
                    <button pButton label="Success" severity="success" class="p-button-sm"></button>
                    <button pButton label="Warning" severity="warning" class="p-button-sm"></button>
                    <button pButton label="Danger" severity="danger" class="p-button-sm"></button>
                  </div>
                </div>
                
                <div class="example-row">
                  <label>Input field with palette focus color:</label>
                  <input pInputText placeholder="Focus me to see palette color" class="palette-input" />
                </div>
                
                <div class="example-row">
                  <label>Calendar with palette colors:</label>
                  <p-calendar [(ngModel)]="selectedDate" [showIcon]="true" class="palette-calendar"></p-calendar>
                </div>
              </div>
            </div>
            
            <!-- Theme Mode Switcher -->
            <div class="palette-section">
              <h3>Theme Mode</h3>
              <div class="theme-switcher">
                <p>Current mode: <strong>{{currentTheme}}</strong></p>
                <p class="helper-text">Switch between light and dark theme variants from your Token Studio JSON</p>
              </div>
            </div>
            
            <!-- Palette Info -->
            <div class="palette-section">
              <h3>How It Works</h3>
              <div class="info-content">
                <ul>
                  <li><strong>Centralized:</strong> All colors managed in one place</li>
                  <li><strong>Token-driven:</strong> Colors loaded from your Token Studio JSON</li>
                  <li><strong>Auto-propagation:</strong> Change one color, update all components</li>
                  <li><strong>Theme switching:</strong> Light/dark modes with different color values</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="palette-footer">
            <small>🔄 Changes apply instantly to all PrimeNG components across all stories</small>
          </div>
        </div>
      `,
      props: {
        currentTheme: args.themeMode,
        selectedDate: new Date()
      },
      styles: [`
        .color-palette-demo {
          padding: 2rem;
          background: var(--palette-surface-ground, #EFF2F4);
          border-radius: 12px;
          font-family: 'Inter', system-ui, sans-serif;
          min-height: 600px;
        }
        
        .palette-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .palette-header h2 {
          margin: 0 0 0.5rem 0;
          color: var(--palette-text-primary, #3D3D3D);
          font-size: 1.75rem;
          font-weight: 700;
        }
        
        .palette-header p {
          margin: 0;
          color: var(--palette-text-secondary, #666);
          font-size: 1rem;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .palette-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .palette-section {
          background: var(--palette-surface, #ffffff);
          border: 1px solid var(--palette-surface-border, #E2E6EB);
          border-radius: 8px;
          padding: 1.5rem;
        }
        
        .palette-section h3 {
          margin: 0 0 1rem 0;
          color: var(--palette-text-primary, #3D3D3D);
          font-size: 1.25rem;
          font-weight: 600;
        }
        
        .color-swatches {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
        }
        
        .color-swatch {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        
        .color-box {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          border: 2px solid var(--palette-surface-border, #E2E6EB);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .primary-color { background: var(--palette-primary, #2474BB); }
        .success-color { background: var(--palette-success, #00BF30); }
        .warning-color { background: var(--palette-warning, #FFA300); }
        .danger-color { background: var(--palette-danger, #DA1F2C); }
        
        .color-swatch span {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--palette-text-secondary, #666);
        }
        
        .component-examples {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .example-row {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .example-row label {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--palette-text-secondary, #666);
        }
        
        .button-group {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        
        .theme-switcher {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .theme-switcher strong {
          color: var(--palette-primary, #2474BB);
          text-transform: capitalize;
        }
        
        .helper-text {
          font-size: 0.875rem;
          color: var(--palette-text-muted, #999);
          margin: 0;
        }
        
        .info-content ul {
          margin: 0;
          padding-left: 1.5rem;
        }
        
        .info-content li {
          margin-bottom: 0.5rem;
          color: var(--palette-text-secondary, #666);
        }
        
        .info-content strong {
          color: var(--palette-text-primary, #3D3D3D);
        }
        
        .palette-footer {
          text-align: center;
          padding: 1rem;
          background: var(--palette-surface-hover, #FBFCFC);
          border: 1px solid var(--palette-surface-border, #E2E6EB);
          border-radius: 8px;
          color: var(--palette-text-muted, #999);
        }
        
        /* Component styling using palette colors */
        .p-button {
          font-family: 'Inter', system-ui, sans-serif !important;
          border-radius: 8px !important;
          transition: all 0.2s ease !important;
        }
        
        .p-button.p-button-primary {
          background: var(--palette-primary) !important;
          border-color: var(--palette-primary) !important;
        }
        
        .p-button.p-button-primary:hover {
          background: var(--palette-primary-hover) !important;
          border-color: var(--palette-primary-hover) !important;
        }
        
        .p-button.p-button-success {
          background: var(--palette-success) !important;
          border-color: var(--palette-success) !important;
        }
        
        .p-button.p-button-success:hover {
          background: var(--palette-success-hover) !important;
          border-color: var(--palette-success-hover) !important;
        }
        
        .p-button.p-button-warning {
          background: var(--palette-warning) !important;
          border-color: var(--palette-warning) !important;
        }
        
        .p-button.p-button-warning:hover {
          background: var(--palette-warning-hover) !important;
          border-color: var(--palette-warning-hover) !important;
        }
        
        .p-button.p-button-danger {
          background: var(--palette-danger) !important;
          border-color: var(--palette-danger) !important;
        }
        
        .p-button.p-button-danger:hover {
          background: var(--palette-danger-hover) !important;
          border-color: var(--palette-danger-hover) !important;
        }
        
        .palette-input {
          border: 1px solid var(--palette-surface-border) !important;
          border-radius: 8px !important;
          padding: 0.75rem !important;
          transition: all 0.2s ease !important;
          font-family: 'Inter', system-ui, sans-serif !important;
        }
        
        .palette-input:focus {
          border-color: var(--palette-primary) !important;
          box-shadow: 0 0 0 2px var(--palette-primary)20 !important;
          outline: none !important;
        }
        
        .palette-calendar .p-inputtext {
          border: 1px solid var(--palette-surface-border) !important;
          border-radius: 8px !important;
        }
        
        .palette-calendar .p-inputtext:focus {
          border-color: var(--palette-primary) !important;
          box-shadow: 0 0 0 2px var(--palette-primary)20 !important;
        }
        
        .palette-calendar .p-datepicker-trigger {
          background: var(--palette-primary) !important;
          border-color: var(--palette-primary) !important;
          border-radius: 8px !important;
        }
        
        .palette-calendar .p-datepicker-trigger:hover {
          background: var(--palette-primary-hover) !important;
          border-color: var(--palette-primary-hover) !important;
        }
      `]
    };
  }
};

export default meta;
type Story = StoryObj<ColorPaletteArgs>;

export const Interactive: Story = {
  args: {
    themeMode: 'light',
    primaryColor: '#2474BB',
    successColor: '#00BF30', 
    warningColor: '#FFA300',
    dangerColor: '#DA1F2C'
  }
};
