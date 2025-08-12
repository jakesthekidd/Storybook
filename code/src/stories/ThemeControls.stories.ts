import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta = {
  title: 'Theme/Controls',
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
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
        <div id="token-status" style="position: fixed; top: 10px; right: 10px; background: var(--p-surface-100, #f1f5f9); border: 1px solid var(--p-surface-300, #cbd5e1); border-radius: 8px; padding: 8px 12px; font-size: 12px; z-index: 1000;">
          <div>🎨 <span id="theme-indicator">Loading...</span></div>
          <div>📊 <span id="css-vars-count">0</span> vars</div>
        </div>

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
        .theme-editor-container {
          padding: 24px;
          font-family: 'Inter', system-ui, sans-serif;
          background: var(--brand-surface, #ffffff);
          color: var(--brand-text-primary, #0f172a);
          min-height: 100vh;
        }

        .header-section {
          margin-bottom: 32px;
          text-align: center;
        }

        .editor-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0 0 8px 0;
          background: linear-gradient(135deg, var(--brand-primary, #3b82f6), #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .editor-subtitle {
          font-size: 1.1rem;
          color: var(--brand-secondary, #64748b);
          margin: 0;
        }

        .toolbar-section {
          margin-bottom: 32px;
        }

        .toolbar-card {
          background: var(--brand-surface, #ffffff);
          border: 1px solid var(--tf-root-surface-border, #e2e8f0);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .toolbar-card h3 {
          margin: 0 0 16px 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .toolbar-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }

        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
        }

        .info-card, .preview-card, .demo-card, .instructions-card {
          background: var(--brand-surface, #ffffff);
          border: 1px solid var(--tf-root-surface-border, #e2e8f0);
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .info-card h3, .preview-card h3, .demo-card h3, .instructions-card h3 {
          margin: 0 0 16px 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .status-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .status-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .status-label {
          font-size: 0.875rem;
          color: var(--brand-secondary, #64748b);
          font-weight: 500;
        }

        .status-value {
          font-size: 1rem;
          font-weight: 600;
          font-family: 'JetBrains Mono', monospace;
        }

        .status-active {
          color: #10b981;
        }

        .color-swatches {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .swatch-row {
          display: flex;
          gap: 8px;
        }

        .swatch {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          border: 2px solid var(--tf-root-surface-border, #e2e8f0);
          position: relative;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .swatch:hover {
          transform: scale(1.1);
        }

        .swatch.primary { background: var(--brand-primary, #3b82f6); }
        .swatch.secondary { background: var(--brand-secondary, #64748b); }
        .swatch.success { background: var(--tf-green-500, #10b981); }
        .swatch.warning { background: var(--tf-yellow-500, #f59e0b); }
        .swatch.danger { background: var(--tf-red-500, #ef4444); }
        .swatch.surface-0 { background: var(--tf-surface-0, #ffffff); }
        .swatch.surface-100 { background: var(--tf-surface-100, #f1f5f9); }
        .swatch.surface-300 { background: var(--tf-surface-300, #cbd5e1); }
        .swatch.surface-600 { background: var(--tf-surface-600, #475569); }
        .swatch.surface-900 { background: var(--tf-surface-900, #0f172a); }

        .demo-description {
          color: var(--brand-secondary, #64748b);
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .demo-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 24px;
        }

        .demo-group h4 {
          margin: 0 0 12px 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .button-showcase {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .token-info {
          border-top: 1px solid var(--tf-root-surface-border, #e2e8f0);
          padding-top: 24px;
        }

        .token-info h4 {
          margin: 0 0 16px 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .token-mappings {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mapping-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          background: var(--tf-surface-50, #f8fafc);
          border-radius: 6px;
          border-left: 3px solid var(--brand-primary, #3b82f6);
          font-size: 0.875rem;
        }

        .mapping-item code {
          background: var(--tf-surface-100, #f1f5f9);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          color: var(--brand-primary, #3b82f6);
        }

        .instructions-section {
          margin-top: 32px;
        }

        .instruction-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 768px) {
          .instruction-grid {
            grid-template-columns: 1fr;
          }
        }

        .instruction-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }

        .instruction-number {
          background: var(--brand-primary, #3b82f6);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          flex-shrink: 0;
        }

        .instruction-content {
          line-height: 1.6;
        }

        .instruction-content strong {
          color: var(--brand-text-primary, #0f172a);
          display: block;
          margin-bottom: 4px;
        }
      </style>
    `,
    props: {
      triggerFileInput: () => {
        const fileInput = document.querySelector('#fileInput') as HTMLInputElement;
        if (fileInput) {
          fileInput.click();
        }
      },

      importTokenFile: async (event: Event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) return;

        try {
          const text = await file.text();
          const tokenData = JSON.parse(text);

          // Validate Token Studio format
          if (!tokenData['lara-light'] && !tokenData['lara-dark']) {
            throw new Error('Invalid Token Studio format. File must contain "lara-light" or "lara-dark" theme objects.');
          }

          // Store in localStorage for persistence
          localStorage.setItem('custom-tokens', text);

          // Show success message
          console.log('✅ Tokens imported successfully');

          // Force reload to apply new tokens
          window.location.reload();

        } catch (error) {
          console.error('❌ Failed to import tokens:', error);
          alert(`Import failed: ${error instanceof Error ? error.message : 'Invalid JSON format'}`);
        }

        // Reset file input
        (event.target as HTMLInputElement).value = '';
      },

      exportCurrentTokens: async () => {
        try {
          // Try to get current theme mode
          const currentMode = localStorage.getItem('storybook-theme-mode') || 'light';

          // Import loadTokens dynamically
          const { loadTokens, exportTokensAsJSON } = await import('../theme/loadTokens');

          // Get current tokens and export
          const exportData = exportTokensAsJSON(currentMode as any);

          const blob = new Blob([exportData], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `transflo-tokens-${currentMode}-${new Date().toISOString().split('T')[0]}.json`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          console.log(`✅ Exported ${currentMode} theme tokens`);

        } catch (error) {
          console.error('❌ Export failed:', error);
          alert('Export failed. Please try again.');
        }
      },

      resetToDefault: () => {
        try {
          // Clear custom tokens from localStorage
          localStorage.removeItem('custom-tokens');

          console.log('✅ Reset to default tokens');

          // Reload to apply default tokens
          window.location.reload();

        } catch (error) {
          console.error('❌ Reset failed:', error);
          alert('Reset failed. Please try again.');
        }
      }
    },

    ngOnInit: () => {
      // Update status display when component initializes
      setTimeout(() => {
        const updateStatus = async () => {
          try {
            const currentMode = localStorage.getItem('storybook-theme-mode') || 'light';
            const modeElement = document.getElementById('current-mode');
            if (modeElement) {
              modeElement.textContent = currentMode.charAt(0).toUpperCase() + currentMode.slice(1);
            }

            // Count CSS variables
            const root = document.documentElement;
            const cssVarCount = Array.from(root.style).filter(prop => prop.startsWith('--tf-')).length;
            const countElement = document.getElementById('css-var-count');
            if (countElement) {
              countElement.textContent = cssVarCount.toString();
            }
          } catch (error) {
            console.error('Status update failed:', error);
          }
        };

        updateStatus();

        // Update status every 2 seconds
        setInterval(updateStatus, 2000);
      }, 100);
    }
  })
};
