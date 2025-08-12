import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

const meta: Meta = {
  title: 'Theme/Controls',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ButtonModule, ToastModule],
      providers: [MessageService],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const ThemeEditor: Story = {
  render: () => ({
    template: `
      <div class="theme-editor-container">
        <p-toast></p-toast>

        <div class="header-section">
          <h1 class="editor-title">🎨 Token Studio Theme Editor</h1>
          <p class="editor-subtitle">
            Powered by Transflo Design Tokens • Real-time PrimeNG Integration
          </p>
        </div>

        <div class="toolbar-section">
          <div class="toolbar-card">
            <h3>📦 Token Management</h3>
            <div class="toolbar-actions">
              <p-button
                label="Import Tokens"
                icon="pi pi-upload"
                severity="secondary"
                (click)="triggerFileInput()"
                [outlined]="true">
              </p-button>

              <p-button
                label="Export Current"
                icon="pi pi-download"
                severity="info"
                (click)="exportCurrentTokens()"
                [outlined]="true">
              </p-button>

              <p-button
                label="Reset to Default"
                icon="pi pi-refresh"
                severity="warning"
                (click)="resetToDefault()"
                [outlined]="true">
              </p-button>

              <input
                #fileInput
                type="file"
                accept=".json"
                (change)="importTokenFile($event)"
                style="display: none;"
              />
            </div>
          </div>
        </div>

        <div class="content-grid">
          <div class="info-section">
            <div class="info-card">
              <h3>🎯 Current Theme Status</h3>
              <div class="status-grid">
                <div class="status-item">
                  <span class="status-label">Active Mode:</span>
                  <span class="status-value" id="current-mode">Light</span>
                </div>
                <div class="status-item">
                  <span class="status-label">CSS Variables:</span>
                  <span class="status-value" id="css-var-count">Loading...</span>
                </div>
                <div class="status-item">
                  <span class="status-label">Token Source:</span>
                  <span class="status-value">transflo.tokens.json</span>
                </div>
                <div class="status-item">
                  <span class="status-label">PrimeNG Preset:</span>
                  <span class="status-value status-active">✓ Active</span>
                </div>
              </div>
            </div>

            <div class="preview-card">
              <h3>🎨 Live Color Preview</h3>
              <div class="color-swatches">
                <div class="swatch-row">
                  <div class="swatch primary" title="Primary"></div>
                  <div class="swatch secondary" title="Secondary"></div>
                  <div class="swatch success" title="Success"></div>
                  <div class="swatch warning" title="Warning"></div>
                  <div class="swatch danger" title="Danger"></div>
                </div>
                <div class="swatch-row">
                  <div class="swatch surface-0" title="Surface 0"></div>
                  <div class="swatch surface-100" title="Surface 100"></div>
                  <div class="swatch surface-300" title="Surface 300"></div>
                  <div class="swatch surface-600" title="Surface 600"></div>
                  <div class="swatch surface-900" title="Surface 900"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="demo-section">
            <div class="demo-card">
              <h3>🚀 Component Showcase</h3>
              <p class="demo-description">
                These components use your Token Studio theme in real-time.
                Switch between Light/Dark modes using the toolbar toggle.
              </p>

              <div class="demo-grid">
                <div class="demo-group">
                  <h4>Buttons</h4>
                  <div class="button-showcase">
                    <p-button label="Primary" severity="primary"></p-button>
                    <p-button label="Secondary" severity="secondary"></p-button>
                    <p-button label="Success" severity="success"></p-button>
                    <p-button label="Warning" severity="warning"></p-button>
                    <p-button label="Danger" severity="danger"></p-button>
                  </div>
                </div>

                <div class="demo-group">
                  <h4>Outlined Buttons</h4>
                  <div class="button-showcase">
                    <p-button label="Primary" severity="primary" [outlined]="true"></p-button>
                    <p-button label="Secondary" severity="secondary" [outlined]="true"></p-button>
                    <p-button label="Success" severity="success" [outlined]="true"></p-button>
                  </div>
                </div>
              </div>

              <div class="token-info">
                <h4>📋 Applied Token Mappings</h4>
                <div class="token-mappings">
                  <div class="mapping-item">
                    <code>theme.primary.color</code> → Button Primary Background
                  </div>
                  <div class="mapping-item">
                    <code>button.hover.background</code> → Button Hover States
                  </div>
                  <div class="mapping-item">
                    <code>surface.*</code> → Background & Surface Colors
                  </div>
                  <div class="mapping-item">
                    <code>global.textColor</code> → Text & Content Colors
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="instructions-section">
          <div class="instructions-card">
            <h3>💡 How to Use</h3>
            <div class="instruction-grid">
              <div class="instruction-item">
                <span class="instruction-number">1</span>
                <div class="instruction-content">
                  <strong>Theme Switching:</strong>
                  Use the Theme Mode toggle in the Storybook toolbar (🌞/🌙) to switch between Light and Dark variants instantly.
                </div>
              </div>
              <div class="instruction-item">
                <span class="instruction-number">2</span>
                <div class="instruction-content">
                  <strong>Import Custom Tokens:</strong>
                  Click "Import Tokens" to upload your own Token Studio JSON file. The theme will update immediately across all stories.
                </div>
              </div>
              <div class="instruction-item">
                <span class="instruction-number">3</span>
                <div class="instruction-content">
                  <strong>Export & Share:</strong>
                  Click "Export Current" to download the active theme tokens. Use this to share themes or create backups.
                </div>
              </div>
              <div class="instruction-item">
                <span class="instruction-number">4</span>
                <div class="instruction-content">
                  <strong>Live Preview:</strong>
                  Navigate to any PrimeNG component story to see your token changes applied in real-time with full theme integration.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        .color-control {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }
        .color-control label {
          min-width: 120px;
          font-weight: 500;
        }
        .color-control input[type="color"] {
          width: 40px;
          height: 32px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .color-control span {
          font-family: monospace;
          background: #f8f9fa;
          padding: 4px 8px;
          border-radius: 4px;
          border: 1px solid #ddd;
          min-width: 80px;
        }
        .range-control {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }
        .range-control label {
          min-width: 120px;
          font-weight: 500;
        }
        .range-control input[type="range"] {
          flex: 1;
        }
        .range-control span {
          font-family: monospace;
          background: #f8f9fa;
          padding: 4px 8px;
          border-radius: 4px;
          border: 1px solid #ddd;
          min-width: 50px;
        }
        .text-control {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }
        .text-control label {
          min-width: 120px;
          font-weight: 500;
        }
        .text-control select {
          flex: 1;
          padding: 6px 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
      </style>
    `,
    props: {
      updateCSSVar: (property: string, value: string) => {
        document.documentElement.style.setProperty(property, value);
        // Update the display value
        const propName = property.replace('--brand-', '').replace('-', '');
        const span = document.getElementById(propName + '-value');
        if (span) span.textContent = value;
      },
      
      exportTheme: () => {
        const styles = getComputedStyle(document.documentElement);
        const theme = {
          primary: styles.getPropertyValue('--brand-primary').trim(),
          secondary: styles.getPropertyValue('--brand-secondary').trim(),
          success: styles.getPropertyValue('--brand-success').trim(),
          warning: styles.getPropertyValue('--brand-warning').trim(),
          danger: styles.getPropertyValue('--brand-danger').trim(),
          borderRadius: styles.getPropertyValue('--brand-border-radius').trim(),
          fontFamily: styles.getPropertyValue('--brand-font-family').trim(),
          fontSizeBase: styles.getPropertyValue('--brand-font-size-base').trim(),
        };
        
        const blob = new Blob([JSON.stringify(theme, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'primeng-theme.json';
        a.click();
        URL.revokeObjectURL(url);
      },
      
      resetTheme: () => {
        const defaults = {
          '--brand-primary': '#007acc',
          '--brand-secondary': '#6c757d',
          '--brand-success': '#28a745',
          '--brand-warning': '#ffc107',
          '--brand-danger': '#dc3545',
          '--brand-border-radius': '6px',
          '--brand-font-family': '"Inter var", sans-serif',
          '--brand-font-size-base': '14px'
        };
        
        Object.entries(defaults).forEach(([prop, value]) => {
          document.documentElement.style.setProperty(prop, value);
        });
        
        // Reset UI controls
        const colorInputs = document.querySelectorAll('input[type="color"]');
        colorInputs.forEach((input: any, index) => {
          const values = ['#007acc', '#6c757d', '#28a745', '#ffc107', '#dc3545'];
          input.value = values[index];
        });
        
        window.location.reload();
      },
      
      importTheme: (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const theme = JSON.parse(e.target?.result as string);
            Object.entries(theme).forEach(([key, value]) => {
              const cssVar = '--brand-' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
              document.documentElement.style.setProperty(cssVar, value as string);
            });
            
            alert('Theme imported successfully! Navigate to component stories to see changes.');
          } catch (error) {
            alert('Failed to import theme. Please check the JSON format.');
          }
        };
        reader.readAsText(file);
      }
    }
  })
};
