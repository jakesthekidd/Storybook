import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { colorPaletteManager, storybookColorPalette, type CompleteColorPalette, type ThemeMode } from '../../theme/color-palette';

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
  parameters: {
    docs: {
      description: {
        component: 'Complete Color Palette Manager with ALL Token Studio colors. All colors are referenceable as CSS variables.'
      }
    },
    // Integrate with Storybook's ColorPalette addon
    colorPalette: storybookColorPalette
  },
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
      description: 'Primary brand color (Blue 500)'
    },
    successColor: {
      control: 'color', 
      description: 'Success state color (Green 500)'
    },
    warningColor: {
      control: 'color',
      description: 'Warning state color (Orange 500)'
    },
    dangerColor: {
      control: 'color',
      description: 'Danger state color (Red 500)'
    }
  },
  render: (args) => {
    // Apply color palette changes when controls change
    colorPaletteManager.setThemeMode(args.themeMode);
    colorPaletteManager.updateColors({
      'primary': args.primaryColor,
      'blue-500': args.primaryColor,
      'success': args.successColor,
      'green-500': args.successColor,
      'warning': args.warningColor,
      'orange-500': args.warningColor,
      'danger': args.dangerColor,
      'red-500': args.dangerColor
    });
    
    const palette = colorPaletteManager.getPalette();
    
    return {
      template: `
        <div class="complete-palette-demo">
          <div class="palette-header">
            <h2>🎨 Complete Color Palette Manager</h2>
            <p>ALL Token Studio colors are loaded and referenceable. Change controls to see components update instantly.</p>
            <div class="color-count">
              <strong>{{colorCount}} colors available</strong> - All referenceable as CSS variables
            </div>
          </div>
          
          <div class="palette-grid">
            <!-- Live Component Examples -->
            <div class="palette-section">
              <h3>Live Component Examples</h3>
              <div class="component-examples">
                <div class="example-row">
                  <label>Buttons using semantic colors:</label>
                  <div class="button-group">
                    <button pButton label="Primary" severity="primary" class="p-button-sm"></button>
                    <button pButton label="Success" severity="success" class="p-button-sm"></button>
                    <button pButton label="Warning" severity="warning" class="p-button-sm"></button>
                    <button pButton label="Danger" severity="danger" class="p-button-sm"></button>
                  </div>
                </div>
                
                <div class="example-row">
                  <label>Calendar with primary color:</label>
                  <p-calendar [(ngModel)]="selectedDate" [showIcon]="true" class="palette-calendar"></p-calendar>
                </div>
                
                <div class="example-row">
                  <label>Input with focus color:</label>
                  <input pInputText placeholder="Focus me to see primary color" class="palette-input" />
                </div>
              </div>
            </div>
            
            <!-- Color Scale Examples -->
            <div class="palette-section">
              <h3>Blue Scale (Primary)</h3>
              <div class="color-scale">
                <div class="color-swatch" *ngFor="let shade of blueShades">
                  <div class="color-box" [style.background]="'var(--blue-' + shade + ')'"></div>
                  <span>{{shade}}</span>
                  <small>--blue-{{shade}}</small>
                </div>
              </div>
            </div>
            
            <div class="palette-section">
              <h3>Surface Scale</h3>
              <div class="color-scale">
                <div class="color-swatch" *ngFor="let shade of surfaceShades">
                  <div class="color-box" [style.background]="'var(--surface-' + shade + ')'"></div>
                  <span>{{shade}}</span>
                  <small>--surface-{{shade}}</small>
                </div>
              </div>
            </div>
            
            <div class="palette-section">
              <h3>Semantic Colors</h3>
              <div class="color-scale">
                <div class="color-swatch">
                  <div class="color-box" style="background: var(--green-500)"></div>
                  <span>Success</span>
                  <small>--green-500</small>
                </div>
                <div class="color-swatch">
                  <div class="color-box" style="background: var(--cyan-500)"></div>
                  <span>Info</span>
                  <small>--cyan-500</small>
                </div>
                <div class="color-swatch">
                  <div class="color-box" style="background: var(--orange-500)"></div>
                  <span>Warning</span>
                  <small>--orange-500</small>
                </div>
                <div class="color-swatch">
                  <div class="color-box" style="background: var(--red-500)"></div>
                  <span>Danger</span>
                  <small>--red-500</small>
                </div>
              </div>
            </div>
            
            <!-- Complete Color Reference -->
            <div class="palette-section full-width">
              <h3>Complete Color Reference</h3>
              <div class="color-reference">
                <div class="color-family" *ngFor="let family of colorFamilies">
                  <h4>{{family.name}}</h4>
                  <div class="color-row">
                    <div class="color-ref-item" *ngFor="let color of family.colors">
                      <div class="color-ref-box" [style.background]="color.value"></div>
                      <div class="color-ref-info">
                        <span class="color-name">{{color.name}}</span>
                        <code class="css-var">{{color.cssVar}}</code>
                        <small class="hex-value">{{color.value}}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="usage-info">
            <h3>🚀 Usage</h3>
            <div class="usage-examples">
              <div class="usage-item">
                <strong>CSS:</strong>
                <code>background: var(--blue-500);</code>
              </div>
              <div class="usage-item">
                <strong>With fallback:</strong>
                <code>color: var(--primary, #2474BB);</code>
              </div>
              <div class="usage-item">
                <strong>Component reference:</strong>
                <code>var(--palette-primary)</code>
              </div>
            </div>
          </div>
        </div>
      `,
      props: {
        currentTheme: args.themeMode,
        selectedDate: new Date(),
        colorCount: Object.keys(palette).length,
        blueShades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
        surfaceShades: ['0', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
        colorFamilies: [
          {
            name: 'Blue (Primary)',
            colors: [
              { name: 'Blue 50', cssVar: '--blue-50', value: palette['blue-50'] },
              { name: 'Blue 100', cssVar: '--blue-100', value: palette['blue-100'] },
              { name: 'Blue 500', cssVar: '--blue-500', value: palette['blue-500'] },
              { name: 'Blue 700', cssVar: '--blue-700', value: palette['blue-700'] },
              { name: 'Blue 900', cssVar: '--blue-900', value: palette['blue-900'] }
            ]
          },
          {
            name: 'Green (Success)',
            colors: [
              { name: 'Green 50', cssVar: '--green-50', value: palette['green-50'] },
              { name: 'Green 100', cssVar: '--green-100', value: palette['green-100'] },
              { name: 'Green 500', cssVar: '--green-500', value: palette['green-500'] },
              { name: 'Green 700', cssVar: '--green-700', value: palette['green-700'] },
              { name: 'Green 900', cssVar: '--green-900', value: palette['green-900'] }
            ]
          },
          {
            name: 'Surface',
            colors: [
              { name: 'Surface 0', cssVar: '--surface-0', value: palette['surface-0'] },
              { name: 'Surface 100', cssVar: '--surface-100', value: palette['surface-100'] },
              { name: 'Surface 400', cssVar: '--surface-400', value: palette['surface-400'] },
              { name: 'Surface 700', cssVar: '--surface-700', value: palette['surface-700'] },
              { name: 'Surface 900', cssVar: '--surface-900', value: palette['surface-900'] }
            ]
          },
          {
            name: 'Other Colors',
            colors: [
              { name: 'Orange 500', cssVar: '--orange-500', value: palette['orange-500'] },
              { name: 'Red 500', cssVar: '--red-500', value: palette['red-500'] },
              { name: 'Cyan 500', cssVar: '--cyan-500', value: palette['cyan-500'] },
              { name: 'Purple 500', cssVar: '--purple-500', value: palette['purple-500'] },
              { name: 'Teal 500', cssVar: '--teal-500', value: palette['teal-500'] }
            ]
          }
        ]
      },
      styles: [`
        .complete-palette-demo {
          padding: 2rem;
          background: var(--palette-surface-ground, #EFF2F4);
          border-radius: 12px;
          font-family: 'Inter', system-ui, sans-serif;
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
          margin: 0 0 1rem 0;
          color: var(--palette-text-secondary, #666);
          font-size: 1rem;
        }
        
        .color-count {
          background: var(--palette-primary, #2474BB);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          display: inline-block;
          font-size: 0.875rem;
        }
        
        .palette-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .palette-section {
          background: var(--palette-surface-0, #ffffff);
          border: 1px solid var(--palette-surface-border, #E2E6EB);
          border-radius: 8px;
          padding: 1.5rem;
        }
        
        .palette-section.full-width {
          grid-column: 1 / -1;
        }
        
        .palette-section h3, .palette-section h4 {
          margin: 0 0 1rem 0;
          color: var(--palette-text-primary, #3D3D3D);
          font-weight: 600;
        }
        
        .component-examples {
          display: flex;
          flex-direction: column;
          gap: 1rem;
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
        
        .color-scale, .color-row {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        
        .color-swatch {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          min-width: 60px;
        }
        
        .color-box {
          width: 40px;
          height: 40px;
          border-radius: 6px;
          border: 1px solid var(--palette-surface-border, #E2E6EB);
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .color-swatch span {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--palette-text-primary, #3D3D3D);
        }
        
        .color-swatch small {
          font-size: 0.625rem;
          color: var(--palette-text-muted, #999);
          font-family: monospace;
        }
        
        .color-reference {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .color-family h4 {
          font-size: 1rem;
          margin-bottom: 0.75rem;
          color: var(--palette-primary, #2474BB);
        }
        
        .color-ref-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          background: var(--palette-surface-50, #FBFCFC);
          border-radius: 6px;
          min-width: 200px;
        }
        
        .color-ref-box {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          border: 1px solid var(--palette-surface-border, #E2E6EB);
          flex-shrink: 0;
        }
        
        .color-ref-info {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
        }
        
        .color-name {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--palette-text-primary, #3D3D3D);
        }
        
        .css-var {
          font-size: 0.75rem;
          font-family: monospace;
          color: var(--palette-primary, #2474BB);
          background: var(--palette-surface-100, #F7F8F9);
          padding: 0.125rem 0.25rem;
          border-radius: 3px;
        }
        
        .hex-value {
          font-size: 0.625rem;
          color: var(--palette-text-muted, #999);
          font-family: monospace;
        }
        
        .usage-info {
          background: var(--palette-surface-0, #ffffff);
          border: 1px solid var(--palette-surface-border, #E2E6EB);
          border-radius: 8px;
          padding: 1.5rem;
        }
        
        .usage-info h3 {
          margin: 0 0 1rem 0;
          color: var(--palette-text-primary, #3D3D3D);
        }
        
        .usage-examples {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .usage-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .usage-item code {
          background: var(--palette-surface-100, #F7F8F9);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.875rem;
          color: var(--palette-primary, #2474BB);
        }
        
        /* Component styling using palette */
        .p-button {
          font-family: 'Inter', system-ui, sans-serif !important;
          border-radius: 8px !important;
        }
        
        .palette-input {
          border: 1px solid var(--palette-surface-border) !important;
          border-radius: 8px !important;
          padding: 0.75rem !important;
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
        
        .palette-calendar .p-datepicker-trigger {
          background: var(--palette-primary) !important;
          border-color: var(--palette-primary) !important;
          border-radius: 8px !important;
        }
      `]
    };
  }
};

export default meta;
type Story = StoryObj<ColorPaletteArgs>;

export const CompleteColorPalette: Story = {
  args: {
    themeMode: 'light',
    primaryColor: '#2474BB',
    successColor: '#00BF30', 
    warningColor: '#FFA300',
    dangerColor: '#DA1F2C'
  }
};

export const AllColorsDocumentation: Story = {
  render: () => {
    const palette = colorPaletteManager.getPalette();
    const allColors = colorPaletteManager.getAllColorReferences();
    
    return {
      template: `
        <div class="color-documentation">
          <h2>📖 Complete Color Documentation</h2>
          <p>All <strong>{{totalColors}}</strong> colors from your Token Studio JSON are loaded and available as CSS variables.</p>
          
          <div class="color-list">
            <div class="color-item" *ngFor="let colorRef of colorRefs">
              <div class="color-preview" [style.background]="colorRef.value"></div>
              <code class="css-variable">{{colorRef.name}}</code>
              <span class="hex-value">{{colorRef.value}}</span>
            </div>
          </div>
        </div>
      `,
      props: {
        totalColors: Object.keys(allColors).length / 2, // Divided by 2 because we have both --palette- and -- versions
        colorRefs: Object.entries(allColors)
          .filter(([key]) => key.startsWith('--palette-'))
          .slice(0, 50) // Show first 50 for demo
          .map(([name, value]) => ({ name, value }))
      },
      styles: [`
        .color-documentation {
          padding: 2rem;
          background: var(--palette-surface-0, #ffffff);
          border-radius: 8px;
          font-family: 'Inter', system-ui, sans-serif;
        }
        
        .color-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 0.5rem;
          margin-top: 2rem;
        }
        
        .color-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          border: 1px solid var(--palette-surface-border, #E2E6EB);
          border-radius: 6px;
          background: var(--palette-surface-50, #FBFCFC);
        }
        
        .color-preview {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          border: 1px solid var(--palette-surface-border, #E2E6EB);
          flex-shrink: 0;
        }
        
        .css-variable {
          font-family: monospace;
          font-size: 0.75rem;
          background: var(--palette-surface-100, #F7F8F9);
          padding: 0.125rem 0.25rem;
          border-radius: 3px;
          flex: 1;
        }
        
        .hex-value {
          font-family: monospace;
          font-size: 0.625rem;
          color: var(--palette-text-muted, #999);
        }
      `]
    };
  }
};
