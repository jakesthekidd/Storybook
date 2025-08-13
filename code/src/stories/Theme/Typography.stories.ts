import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { colorPaletteManager } from '../../theme/color-palette';

interface TypographyArgs {
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  lineHeight: number;
  letterSpacing: number;
  textColor: string;
  showAllFonts: boolean;
  sampleText: string;
}

// Initialize color palette
if (typeof document !== 'undefined') {
  colorPaletteManager.setThemeMode('light');
}

const meta: Meta<TypographyArgs> = {
  title: 'Theme/Typography',
  decorators: [
    moduleMetadata({
      imports: [FormsModule, ButtonModule, DropdownModule, SliderModule],
    }),
  ],
  args: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 1.5,
    letterSpacing: 0,
    textColor: '#3D3D3D',
    showAllFonts: false,
    sampleText: 'The quick brown fox jumps over the lazy dog'
  },
  argTypes: {
    fontFamily: {
      control: 'select',
      options: [
        'Inter',
        'System UI',
        'Helvetica',
        'Arial',
        'Georgia', 
        'Times',
        'Courier',
        'Monaco',
        'Roboto',
        'Open Sans',
        'Lato',
        'Montserrat',
        'Poppins',
        'Source Sans Pro'
      ],
      description: 'Font family to display'
    },
    fontSize: {
      control: { type: 'range', min: 8, max: 72, step: 1 },
      description: 'Font size in pixels'
    },
    fontWeight: {
      control: 'select',
      options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
      description: 'Font weight'
    },
    lineHeight: {
      control: { type: 'range', min: 0.8, max: 3, step: 0.1 },
      description: 'Line height multiplier'
    },
    letterSpacing: {
      control: { type: 'range', min: -2, max: 4, step: 0.1 },
      description: 'Letter spacing in pixels'
    },
    textColor: {
      control: 'color',
      description: 'Text color'
    },
    showAllFonts: {
      control: 'boolean',
      description: 'Show all font examples'
    },
    sampleText: {
      control: 'text',
      description: 'Sample text to display'
    }
  },
  render: (args) => ({
    template: `
      <div class="typography-showcase">
        <div class="typography-header">
          <h1 class="typography-title">🔤 Typography & Font Library</h1>
          <p class="typography-subtitle">Complete typography system with font families, sizes, and styling controls</p>
        </div>

        <!-- Interactive Typography Controller -->
        <div class="typography-controller">
          <h2>Typography Controller</h2>
          <div class="sample-text" 
               [style.font-family]="getFontFamily(fontFamily)"
               [style.font-size.px]="fontSize"
               [style.font-weight]="fontWeight"
               [style.line-height]="lineHeight"
               [style.letter-spacing.px]="letterSpacing"
               [style.color]="textColor">
            {{sampleText}}
          </div>
          <div class="typography-specs">
            <span class="spec">{{fontFamily}} • {{fontSize}}px • {{fontWeight}} • {{lineHeight}} line height</span>
          </div>
        </div>

        <!-- Font Library Display -->
        <div class="font-library" *ngIf="showAllFonts">
          <h2>Font Library</h2>
          <div class="font-grid">
            <div class="font-card" *ngFor="let font of fontFamilies">
              <div class="font-header">
                <h3>{{font.name}}</h3>
                <span class="font-category">{{font.category}}</span>
              </div>
              <div class="font-sample" [style.font-family]="font.family">
                <div class="font-alphabet">Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm</div>
                <div class="font-numbers">1234567890 !&#64;#$%^&amp;*()</div>
                <div class="font-text">{{sampleText}}</div>
              </div>
              <div class="font-weights">
                <span class="weight-sample" 
                      *ngFor="let weight of font.weights" 
                      [style.font-family]="font.family"
                      [style.font-weight]="weight">
                  {{weight}}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Typography Scale -->
        <div class="typography-scale">
          <h2>Typography Scale</h2>
          <div class="scale-examples">
            <div class="scale-item" *ngFor="let scale of typographyScale">
              <div class="scale-label">{{scale.name}}</div>
              <div class="scale-specs">{{scale.size}}px • {{scale.weight}} • {{scale.lineHeight}}</div>
              <div class="scale-text" 
                   [style.font-size.px]="scale.size"
                   [style.font-weight]="scale.weight"
                   [style.line-height]="scale.lineHeight"
                   [style.font-family]="getFontFamily(fontFamily)">
                {{scale.example}}
              </div>
            </div>
          </div>
        </div>

        <!-- Usage Guidelines -->
        <div class="typography-guidelines">
          <h2>Usage Guidelines</h2>
          <div class="guidelines-grid">
            <div class="guideline-card">
              <h3>🎯 Primary Font</h3>
              <p><strong>Inter</strong> - Used for UI elements, body text, and most interface components</p>
              <div class="code-example">font-family: 'Inter', system-ui, sans-serif;</div>
            </div>
            <div class="guideline-card">
              <h3>📱 System Fallbacks</h3>
              <p><strong>System UI</strong> - Graceful fallback that uses the operating system's default font</p>
              <div class="code-example">font-family: system-ui, -apple-system, BlinkMacSystemFont;</div>
            </div>
            <div class="guideline-card">
              <h3>⚡ Performance</h3>
              <p>Fonts are loaded efficiently with fallbacks to prevent layout shift</p>
              <div class="code-example">font-display: swap;</div>
            </div>
            <div class="guideline-card">
              <h3>🎨 Color Integration</h3>
              <p>Typography colors use the same palette system as other components</p>
              <div class="code-example">color: var(--palette-text-primary);</div>
            </div>
          </div>
        </div>
      </div>
    `,
    props: {
      ...args,
      fontFamilies: [
        { 
          name: 'Inter', 
          family: "'Inter', system-ui, sans-serif", 
          category: 'Sans Serif',
          weights: ['300', '400', '500', '600', '700']
        },
        { 
          name: 'System UI', 
          family: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", 
          category: 'System',
          weights: ['400', '500', '600', '700']
        },
        { 
          name: 'Helvetica', 
          family: "'Helvetica Neue', Helvetica, Arial, sans-serif", 
          category: 'Sans Serif',
          weights: ['300', '400', '500', '700']
        },
        { 
          name: 'Georgia', 
          family: "Georgia, 'Times New Roman', serif", 
          category: 'Serif',
          weights: ['400', '700']
        },
        { 
          name: 'Monaco', 
          family: "Monaco, 'Courier New', monospace", 
          category: 'Monospace',
          weights: ['400']
        },
        { 
          name: 'Roboto', 
          family: "'Roboto', sans-serif", 
          category: 'Sans Serif',
          weights: ['300', '400', '500', '700', '900']
        }
      ],
      typographyScale: [
        { name: 'Display Large', size: 48, weight: '700', lineHeight: 1.2, example: 'Display Large Heading' },
        { name: 'Display Medium', size: 36, weight: '600', lineHeight: 1.2, example: 'Display Medium Heading' },
        { name: 'Heading 1', size: 32, weight: '600', lineHeight: 1.25, example: 'Primary Page Heading' },
        { name: 'Heading 2', size: 24, weight: '600', lineHeight: 1.3, example: 'Section Heading' },
        { name: 'Heading 3', size: 20, weight: '600', lineHeight: 1.4, example: 'Subsection Heading' },
        { name: 'Heading 4', size: 18, weight: '500', lineHeight: 1.4, example: 'Component Heading' },
        { name: 'Body Large', size: 16, weight: '400', lineHeight: 1.5, example: 'Large body text for important content and descriptions' },
        { name: 'Body Medium', size: 14, weight: '400', lineHeight: 1.5, example: 'Standard body text for most content and interface elements' },
        { name: 'Body Small', size: 12, weight: '400', lineHeight: 1.4, example: 'Small body text for captions and secondary information' },
        { name: 'Caption', size: 11, weight: '400', lineHeight: 1.3, example: 'Caption text for images and fine print' }
      ],
      getFontFamily: (family: string) => {
        const fontMap: { [key: string]: string } = {
          'Inter': "'Inter', system-ui, sans-serif",
          'System UI': "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          'Helvetica': "'Helvetica Neue', Helvetica, Arial, sans-serif",
          'Arial': "Arial, sans-serif",
          'Georgia': "Georgia, 'Times New Roman', serif",
          'Times': "'Times New Roman', Times, serif",
          'Courier': "'Courier New', Courier, monospace",
          'Monaco': "Monaco, 'Courier New', monospace",
          'Roboto': "'Roboto', sans-serif",
          'Open Sans': "'Open Sans', sans-serif",
          'Lato': "'Lato', sans-serif",
          'Montserrat': "'Montserrat', sans-serif",
          'Poppins': "'Poppins', sans-serif",
          'Source Sans Pro': "'Source Sans Pro', sans-serif"
        };
        return fontMap[family] || family;
      }
    },
    ngOnInit: () => {
      if (typeof document !== 'undefined') {
        colorPaletteManager.setThemeMode('light');
        console.log('✅ Typography: Initialized Color Palette Manager');
      }
    },
    styles: [`
      .typography-showcase {
        padding: 2rem;
        font-family: 'Inter', system-ui, sans-serif;
        background: var(--palette-surface-ground, #EFF2F4);
        border-radius: 12px;
        max-width: 1200px;
      }

      .typography-header {
        text-align: center;
        margin-bottom: 3rem;
        padding: 2rem;
        background: var(--palette-surface, #ffffff);
        border-radius: 12px;
        border: 1px solid var(--palette-surface-border, #E2E6EB);
      }

      .typography-title {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--palette-text-primary, #3D3D3D);
        margin: 0 0 0.5rem 0;
        line-height: 1.2;
      }

      .typography-subtitle {
        font-size: 1.125rem;
        color: var(--palette-text-muted, #A9B3C2);
        margin: 0;
        font-weight: 400;
      }

      .typography-controller {
        background: var(--palette-surface, #ffffff);
        padding: 2rem;
        border-radius: 12px;
        margin-bottom: 2rem;
        border: 1px solid var(--palette-surface-border, #E2E6EB);
      }

      .typography-controller h2 {
        margin: 0 0 1.5rem 0;
        color: var(--palette-text-primary, #3D3D3D);
        font-size: 1.5rem;
        font-weight: 600;
      }

      .sample-text {
        padding: 2rem;
        background: var(--palette-surface-50, #FBFCFC);
        border: 2px dashed var(--palette-surface-border, #E2E6EB);
        border-radius: 8px;
        margin-bottom: 1rem;
        min-height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
      }

      .typography-specs {
        text-align: center;
        opacity: 0.7;
        font-size: 0.875rem;
        color: var(--palette-text-muted, #A9B3C2);
      }

      .font-library {
        background: var(--palette-surface, #ffffff);
        padding: 2rem;
        border-radius: 12px;
        margin-bottom: 2rem;
        border: 1px solid var(--palette-surface-border, #E2E6EB);
      }

      .font-library h2 {
        margin: 0 0 1.5rem 0;
        color: var(--palette-text-primary, #3D3D3D);
        font-size: 1.5rem;
        font-weight: 600;
      }

      .font-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 1.5rem;
      }

      .font-card {
        border: 1px solid var(--palette-surface-border, #E2E6EB);
        border-radius: 8px;
        padding: 1.5rem;
        background: var(--palette-surface-50, #FBFCFC);
      }

      .font-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
      }

      .font-header h3 {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--palette-text-primary, #3D3D3D);
      }

      .font-category {
        font-size: 0.75rem;
        color: var(--palette-text-muted, #A9B3C2);
        background: var(--palette-surface-200, #F3F5F7);
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-weight: 500;
      }

      .font-sample {
        margin-bottom: 1rem;
      }

      .font-alphabet {
        font-size: 1rem;
        color: var(--palette-text-primary, #3D3D3D);
        margin-bottom: 0.5rem;
      }

      .font-numbers {
        font-size: 0.875rem;
        color: var(--palette-text-muted, #A9B3C2);
        margin-bottom: 0.5rem;
      }

      .font-text {
        font-size: 0.875rem;
        color: var(--palette-text-primary, #3D3D3D);
        line-height: 1.4;
      }

      .font-weights {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }

      .weight-sample {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
        background: var(--palette-surface-100, #F7F8F9);
        border-radius: 4px;
        color: var(--palette-text-primary, #3D3D3D);
      }

      .typography-scale {
        background: var(--palette-surface, #ffffff);
        padding: 2rem;
        border-radius: 12px;
        margin-bottom: 2rem;
        border: 1px solid var(--palette-surface-border, #E2E6EB);
      }

      .typography-scale h2 {
        margin: 0 0 1.5rem 0;
        color: var(--palette-text-primary, #3D3D3D);
        font-size: 1.5rem;
        font-weight: 600;
      }

      .scale-examples {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .scale-item {
        padding: 1rem;
        border: 1px solid var(--palette-surface-border, #E2E6EB);
        border-radius: 8px;
        background: var(--palette-surface-50, #FBFCFC);
      }

      .scale-label {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--palette-primary, #2474BB);
        margin-bottom: 0.25rem;
      }

      .scale-specs {
        font-size: 0.75rem;
        color: var(--palette-text-muted, #A9B3C2);
        margin-bottom: 0.75rem;
      }

      .scale-text {
        color: var(--palette-text-primary, #3D3D3D);
      }

      .typography-guidelines {
        background: var(--palette-surface, #ffffff);
        padding: 2rem;
        border-radius: 12px;
        border: 1px solid var(--palette-surface-border, #E2E6EB);
      }

      .typography-guidelines h2 {
        margin: 0 0 1.5rem 0;
        color: var(--palette-text-primary, #3D3D3D);
        font-size: 1.5rem;
        font-weight: 600;
      }

      .guidelines-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
      }

      .guideline-card {
        padding: 1.5rem;
        border: 1px solid var(--palette-surface-border, #E2E6EB);
        border-radius: 8px;
        background: var(--palette-surface-50, #FBFCFC);
      }

      .guideline-card h3 {
        margin: 0 0 0.75rem 0;
        font-size: 1rem;
        font-weight: 600;
        color: var(--palette-text-primary, #3D3D3D);
      }

      .guideline-card p {
        margin: 0 0 1rem 0;
        font-size: 0.875rem;
        line-height: 1.5;
        color: var(--palette-text-primary, #3D3D3D);
      }

      .code-example {
        font-family: Monaco, 'Courier New', monospace;
        font-size: 0.75rem;
        background: var(--palette-surface-100, #F7F8F9);
        padding: 0.5rem;
        border-radius: 4px;
        color: var(--palette-text-primary, #3D3D3D);
        border: 1px solid var(--palette-surface-border, #E2E6EB);
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        .typography-showcase {
          padding: 1rem;
        }
        
        .font-grid {
          grid-template-columns: 1fr;
        }
        
        .guidelines-grid {
          grid-template-columns: 1fr;
        }
        
        .typography-title {
          font-size: 2rem;
        }
      }
    `]
  }),
};

export default meta;
type Story = StoryObj<TypographyArgs>;

// Main Interactive Story
export const Interactive: Story = {
  args: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 1.4,
    letterSpacing: 0,
    textColor: '#2474BB',
    showAllFonts: true,
    sampleText: 'The quick brown fox jumps over the lazy dog'
  }
};

// Typography Scale Examples
export const TypographyScale: Story = {
  args: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 1.5,
    letterSpacing: 0,
    textColor: '#3D3D3D',
    showAllFonts: false,
    sampleText: 'Typography scale demonstration'
  }
};

// Font Family Showcase
export const FontFamilies: Story = {
  args: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 1.5,
    letterSpacing: 0,
    textColor: '#3D3D3D',
    showAllFonts: true,
    sampleText: 'Exploring different font families'
  }
};

// Large Display Text
export const DisplayText: Story = {
  args: {
    fontFamily: 'Inter',
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 1.2,
    letterSpacing: -1,
    textColor: '#2474BB',
    showAllFonts: false,
    sampleText: 'Display Heading'
  }
};

// Body Text Examples
export const BodyText: Story = {
  args: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 1.6,
    letterSpacing: 0,
    textColor: '#3D3D3D',
    showAllFonts: false,
    sampleText: 'This is an example of body text that might be used in paragraphs, descriptions, and general content throughout the application.'
  }
};

// Monospace Code Text
export const CodeText: Story = {
  args: {
    fontFamily: 'Monaco',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 1.4,
    letterSpacing: 0,
    textColor: '#2474BB',
    showAllFonts: false,
    sampleText: 'const example = "Hello World"; // Code example'
  }
};
