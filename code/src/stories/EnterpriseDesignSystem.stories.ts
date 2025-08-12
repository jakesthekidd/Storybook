import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

const meta: Meta = {
  title: 'Enterprise/Design System',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ButtonModule, InputTextModule, CalendarModule],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const SystemVerification: Story = {
  render: () => ({
    template: `
      <div class="enterprise-verification">
        <header class="verification-header">
          <h1>🏢 Enterprise Design System Verification</h1>
          <p>Testing token propagation, Storybook controls integration, and PrimeNG component styling</p>
          
          <div class="system-status">
            <div class="status-item">
              <span class="status-label">Active Theme:</span>
              <span class="status-value" id="current-theme">Loading...</span>
            </div>
            <div class="status-item">
              <span class="status-label">CSS Variables:</span>
              <span class="status-value" id="css-var-count">0</span>
            </div>
            <div class="status-item">
              <span class="status-label">Last Update:</span>
              <span class="status-value" id="last-update">Never</span>
            </div>
          </div>
        </header>

        <section class="verification-section">
          <h2>🎯 Token-Driven Components</h2>
          <p>These components should reflect token changes immediately. Use the theme toggle in the toolbar to test.</p>
          
          <div class="component-grid">
            <div class="component-demo">
              <h3>Primary Actions</h3>
              <div class="button-group">
                <button pButton label="Primary" severity="primary" class="test-button"></button>
                <button pButton label="Secondary" severity="secondary" class="test-button"></button>
                <button pButton label="Success" severity="success" class="test-button"></button>
                <button pButton label="Warning" severity="warning" class="test-button"></button>
                <button pButton label="Danger" severity="danger" class="test-button"></button>
              </div>
            </div>
            
            <div class="component-demo">
              <h3>Button Variants</h3>
              <div class="button-group">
                <button pButton label="Outlined" severity="primary" [outlined]="true" class="test-button"></button>
                <button pButton label="Text" severity="primary" [text]="true" class="test-button"></button>
                <button pButton label="Raised" severity="primary" [raised]="true" class="test-button"></button>
                <button pButton label="Rounded" severity="primary" [rounded]="true" class="test-button"></button>
              </div>
            </div>
            
            <div class="component-demo">
              <h3>Form Controls</h3>
              <div class="form-group">
                <input pInputText placeholder="Token-driven input" class="test-input" />
                <p-calendar placeholder="Select date" class="test-calendar"></p-calendar>
              </div>
            </div>
          </div>
        </section>

        <section class="verification-section">
          <h2>🔧 Live Token Inspector</h2>
          <div class="token-inspector">
            <div class="token-category">
              <h4>Primary Colors</h4>
              <div class="token-list" id="primary-tokens">
                Loading...
              </div>
            </div>
            
            <div class="token-category">
              <h4>Surface Colors</h4>
              <div class="token-list" id="surface-tokens">
                Loading...
              </div>
            </div>
            
            <div class="token-category">
              <h4>Typography</h4>
              <div class="token-list" id="typography-tokens">
                Loading...
              </div>
            </div>
            
            <div class="token-category">
              <h4>Component Tokens</h4>
              <div class="token-list" id="component-tokens">
                Loading...
              </div>
            </div>
          </div>
        </section>

        <section class="verification-section">
          <h2>📊 Enterprise Metrics</h2>
          <div class="metrics-grid">
            <div class="metric-card">
              <div class="metric-value" id="components-tracked">0</div>
              <div class="metric-label">Components Tracked</div>
            </div>
            <div class="metric-card">
              <div class="metric-value" id="tokens-applied">0</div>
              <div class="metric-label">Tokens Applied</div>
            </div>
            <div class="metric-card">
              <div class="metric-value" id="render-time">0ms</div>
              <div class="metric-label">Last Render Time</div>
            </div>
            <div class="metric-card">
              <div class="metric-value" id="updates-count">0</div>
              <div class="metric-label">System Updates</div>
            </div>
          </div>
        </section>
      </div>
    `,
    styles: [`
      .enterprise-verification {
        padding: 2rem;
        font-family: var(--font-family, "Inter", system-ui, sans-serif);
        background: var(--surface-ground, #ffffff);
        color: var(--text-color, #0f172a);
        min-height: 100vh;
      }

      .verification-header {
        margin-bottom: 3rem;
        text-align: center;
      }

      .verification-header h1 {
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0 0 1rem 0;
        color: var(--primary-color, #3b82f6);
      }

      .verification-header p {
        font-size: 1.1rem;
        color: var(--text-color-secondary, #64748b);
        margin: 0 0 2rem 0;
      }

      .system-status {
        display: flex;
        justify-content: center;
        gap: 2rem;
        flex-wrap: wrap;
        padding: 1.5rem;
        background: var(--surface-overlay, #f1f5f9);
        border-radius: var(--border-radius, 6px);
        border: 1px solid var(--surface-border, #e2e8f0);
      }

      .status-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }

      .status-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-color-secondary, #64748b);
      }

      .status-value {
        font-size: 1.1rem;
        font-weight: 600;
        font-family: monospace;
        color: var(--text-color, #0f172a);
      }

      .verification-section {
        margin-bottom: 3rem;
      }

      .verification-section h2 {
        font-size: 1.75rem;
        font-weight: 600;
        margin: 0 0 1rem 0;
        color: var(--text-color, #0f172a);
      }

      .component-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }

      .component-demo {
        padding: 1.5rem;
        background: var(--surface-section, #ffffff);
        border: 1px solid var(--surface-border, #e2e8f0);
        border-radius: var(--border-radius, 6px);
      }

      .component-demo h3 {
        margin: 0 0 1rem 0;
        font-size: 1.25rem;
        font-weight: 600;
      }

      .button-group {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }

      .test-button {
        transition: all 0.2s ease !important;
      }

      .form-group {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .test-input, .test-calendar {
        width: 100%;
      }

      .token-inspector {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
      }

      .token-category {
        padding: 1.5rem;
        background: var(--surface-section, #ffffff);
        border: 1px solid var(--surface-border, #e2e8f0);
        border-radius: var(--border-radius, 6px);
      }

      .token-category h4 {
        margin: 0 0 1rem 0;
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--primary-color, #3b82f6);
      }

      .token-list {
        font-family: monospace;
        font-size: 0.875rem;
        line-height: 1.6;
        color: var(--text-color-secondary, #64748b);
      }

      .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
      }

      .metric-card {
        padding: 1.5rem;
        background: var(--surface-section, #ffffff);
        border: 1px solid var(--surface-border, #e2e8f0);
        border-radius: var(--border-radius, 6px);
        text-align: center;
      }

      .metric-value {
        font-size: 2rem;
        font-weight: 700;
        color: var(--primary-color, #3b82f6);
        margin-bottom: 0.5rem;
      }

      .metric-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-color-secondary, #64748b);
      }
    `],
    ngOnInit: () => {
      // Initialize enterprise design system monitoring
      let updateCount = 0;
      let lastRenderTime = Date.now();

      const updateStatus = () => {
        const theme = localStorage.getItem('storybook-theme-mode') || 'light';
        const themeElement = document.getElementById('current-theme');
        if (themeElement) themeElement.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);

        const root = document.documentElement;
        const cssVars = Array.from(root.style).filter(prop => 
          prop.startsWith('--p-') || 
          prop.startsWith('--primary-') || 
          prop.startsWith('--surface-') ||
          prop.startsWith('--text-')
        );

        const countElement = document.getElementById('css-var-count');
        if (countElement) countElement.textContent = cssVars.length.toString();

        const updateElement = document.getElementById('last-update');
        if (updateElement) updateElement.textContent = new Date().toLocaleTimeString();

        // Update token inspector
        updateTokenInspector(cssVars);

        // Update metrics
        updateMetrics(cssVars.length, updateCount++);
      };

      const updateTokenInspector = (cssVars: string[]) => {
        const primaryTokens = cssVars.filter(v => v.includes('primary')).slice(0, 5);
        const surfaceTokens = cssVars.filter(v => v.includes('surface')).slice(0, 5);
        const typographyTokens = cssVars.filter(v => v.includes('font') || v.includes('text')).slice(0, 3);
        const componentTokens = cssVars.filter(v => v.includes('button')).slice(0, 5);

        const updateTokenList = (id: string, tokens: string[]) => {
          const element = document.getElementById(id);
          if (element) {
            element.innerHTML = tokens.length > 0 
              ? tokens.map(token => {
                  const value = getComputedStyle(document.documentElement).getPropertyValue(token);
                  return `${token}: ${value || 'undefined'}`;
                }).join('<br>')
              : 'No tokens found';
          }
        };

        updateTokenList('primary-tokens', primaryTokens);
        updateTokenList('surface-tokens', surfaceTokens);
        updateTokenList('typography-tokens', typographyTokens);
        updateTokenList('component-tokens', componentTokens);
      };

      const updateMetrics = (tokenCount: number, updates: number) => {
        const metricsUpdates = [
          { id: 'components-tracked', value: document.querySelectorAll('.test-button, .test-input, .test-calendar').length },
          { id: 'tokens-applied', value: tokenCount },
          { id: 'render-time', value: `${Date.now() - lastRenderTime}ms` },
          { id: 'updates-count', value: updates }
        ];

        metricsUpdates.forEach(({ id, value }) => {
          const element = document.getElementById(id);
          if (element) element.textContent = value.toString();
        });
      };

      // Initial update
      updateStatus();

      // Listen for design system updates
      const handleUpdate = () => {
        lastRenderTime = Date.now();
        setTimeout(updateStatus, 50);
      };

      window.addEventListener('storybook-controls-changed', handleUpdate);
      window.addEventListener('storybook-story-rendered', handleUpdate);

      // Update every 2 seconds for live monitoring
      setInterval(updateStatus, 2000);
    }
  }),
};

export const TokenPropagationTest: Story = {
  render: () => ({
    template: `
      <div class="propagation-test">
        <h1>🔄 Token Propagation Test</h1>
        <p>Switch themes using the toolbar to verify instant propagation across all components.</p>
        
        <div class="test-grid">
          <div class="test-section" *ngFor="let severity of severities">
            <h3>{{severity | titlecase}} Buttons</h3>
            <div class="button-row">
              <button pButton [label]="severity + ' Normal'" [severity]="severity"></button>
              <button pButton [label]="severity + ' Outlined'" [severity]="severity" [outlined]="true"></button>
              <button pButton [label]="severity + ' Text'" [severity]="severity" [text]="true"></button>
            </div>
          </div>
        </div>
        
        <div class="propagation-metrics">
          <h3>Propagation Metrics</h3>
          <div class="metric-row">
            <span>Last Theme Change:</span>
            <span id="theme-change-time">Never</span>
          </div>
          <div class="metric-row">
            <span>Propagation Time:</span>
            <span id="propagation-time">0ms</span>
          </div>
          <div class="metric-row">
            <span>Components Updated:</span>
            <span id="components-updated">0</span>
          </div>
        </div>
      </div>
    `,
    props: {
      severities: ['primary', 'secondary', 'success', 'info', 'warning', 'danger']
    },
    styles: [`
      .propagation-test {
        padding: 2rem;
        font-family: var(--font-family, "Inter", system-ui, sans-serif);
      }
      
      .test-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin: 2rem 0;
      }
      
      .test-section {
        padding: 1.5rem;
        border: 1px solid var(--surface-border, #e2e8f0);
        border-radius: var(--border-radius, 6px);
        background: var(--surface-section, #ffffff);
      }
      
      .button-row {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      
      .propagation-metrics {
        margin-top: 3rem;
        padding: 1.5rem;
        background: var(--surface-overlay, #f1f5f9);
        border-radius: var(--border-radius, 6px);
      }
      
      .metric-row {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--surface-border, #e2e8f0);
      }
      
      .metric-row:last-child {
        border-bottom: none;
      }
    `]
  }),
};
