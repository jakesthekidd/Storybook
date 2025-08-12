import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta = {
  title: 'Theme/Controls',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const ThemeEditor: Story = {
  render: () => ({
    template: `
      <div style="padding: 20px; font-family: system-ui, sans-serif;">
        <h2 style="margin-bottom: 20px;">🎨 PrimeNG Theme Editor</h2>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
          <div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="margin-top: 0;">Brand Colors</h3>
            <div class="color-control">
              <label>Primary Color:</label>
              <input type="color" value="#007acc" (input)="updateCSSVar('--brand-primary', $event.target.value)" />
              <span id="primary-value">#007acc</span>
            </div>
            <div class="color-control">
              <label>Secondary Color:</label>
              <input type="color" value="#6c757d" (input)="updateCSSVar('--brand-secondary', $event.target.value)" />
              <span id="secondary-value">#6c757d</span>
            </div>
            <div class="color-control">
              <label>Success Color:</label>
              <input type="color" value="#28a745" (input)="updateCSSVar('--brand-success', $event.target.value)" />
              <span id="success-value">#28a745</span>
            </div>
            <div class="color-control">
              <label>Warning Color:</label>
              <input type="color" value="#ffc107" (input)="updateCSSVar('--brand-warning', $event.target.value)" />
              <span id="warning-value">#ffc107</span>
            </div>
            <div class="color-control">
              <label>Danger Color:</label>
              <input type="color" value="#dc3545" (input)="updateCSSVar('--brand-danger', $event.target.value)" />
              <span id="danger-value">#dc3545</span>
            </div>
          </div>
          
          <div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="margin-top: 0;">Layout & Typography</h3>
            <div class="range-control">
              <label>Border Radius:</label>
              <input type="range" min="0" max="20" value="6" (input)="updateCSSVar('--brand-border-radius', $event.target.value + 'px')" />
              <span id="radius-value">6px</span>
            </div>
            <div class="text-control">
              <label>Font Family:</label>
              <select (change)="updateCSSVar('--brand-font-family', $event.target.value)">
                <option value='"Inter var", sans-serif'>Inter</option>
                <option value='"Roboto", sans-serif'>Roboto</option>
                <option value='"Open Sans", sans-serif'>Open Sans</option>
                <option value='system-ui, sans-serif'>System UI</option>
              </select>
            </div>
            <div class="range-control">
              <label>Base Font Size:</label>
              <input type="range" min="12" max="18" value="14" (input)="updateCSSVar('--brand-font-size-base', $event.target.value + 'px')" />
              <span id="fontsize-value">14px</span>
            </div>
          </div>
        </div>
        
        <div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #f8f9fa;">
          <h3 style="margin-top: 0;">🎛️ Actions</h3>
          <button 
            style="padding: 10px 20px; margin-right: 10px; background: var(--brand-primary, #007acc); color: white; border: none; border-radius: 6px; cursor: pointer;"
            (click)="exportTheme()"
          >
            Export Theme JSON
          </button>
          <button 
            style="padding: 10px 20px; margin-right: 10px; background: var(--brand-secondary, #6c757d); color: white; border: none; border-radius: 6px; cursor: pointer;"
            (click)="resetTheme()"
          >
            Reset to Default
          </button>
          <input 
            type="file" 
            accept=".json" 
            (change)="importTheme($event)"
            style="margin-left: 10px;"
          />
        </div>

        <div style="margin-top: 30px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h3 style="margin-top: 0;">🔍 Live Preview</h3>
          <p>Use the <strong>Theme</strong> switcher in the toolbar above (🌞/🌙) to toggle between Light and Dark modes.</p>
          <p>Then navigate to any PrimeNG component story to see your theme changes applied in real-time!</p>
          
          <div style="display: flex; gap: 10px; align-items: center; margin-top: 20px;">
            <div style="width: 30px; height: 30px; background: var(--brand-primary, #007acc); border-radius: 4px;"></div>
            <div style="width: 30px; height: 30px; background: var(--brand-secondary, #6c757d); border-radius: 4px;"></div>
            <div style="width: 30px; height: 30px; background: var(--brand-success, #28a745); border-radius: 4px;"></div>
            <div style="width: 30px; height: 30px; background: var(--brand-warning, #ffc107); border-radius: 4px;"></div>
            <div style="width: 30px; height: 30px; background: var(--brand-danger, #dc3545); border-radius: 4px;"></div>
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
