import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ButtonModule } from 'primeng/button';
import { applyTokens, type ThemeMode } from '../theme/simple-token-loader';

interface ThemeControlsArgs {
  theme: ThemeMode;
}

const meta: Meta<ThemeControlsArgs> = {
  title: 'Theme/Controls',
  decorators: [moduleMetadata({ imports: [ButtonModule] })],
  args: { 
    theme: 'light'
  },
  argTypes: {
    theme: { 
      control: 'radio', 
      options: ['light', 'dark'],
      description: 'Switch between light and dark theme'
    }
  },
  render: (args) => {
    // Apply tokens when theme changes
    if (typeof document !== 'undefined') {
      applyTokens(args.theme);
    }
    
    return {
      template: `
        <div class="theme-demo">
          <h3>Theme: {{currentTheme}}</h3>
          <p>Token Studio JSON values are now directly applied to PrimeNG components.</p>
          
          <div class="component-examples">
            <h4>Button Examples with Tokens:</h4>
            <div class="button-grid">
              <button pButton type="button" label="Primary" class="p-button p-button-primary"></button>
              <button pButton type="button" label="Secondary" class="p-button p-button-secondary"></button>
              <button pButton type="button" label="Success" class="p-button p-button-success"></button>
              <button pButton type="button" label="Info" class="p-button p-button-info"></button>
              <button pButton type="button" label="Warning" class="p-button p-button-warning"></button>
              <button pButton type="button" label="Danger" class="p-button p-button-danger"></button>
            </div>
            
            <h4>Outlined Buttons:</h4>
            <div class="button-grid">
              <button pButton type="button" label="Primary" class="p-button p-button-primary p-button-outlined"></button>
              <button pButton type="button" label="Secondary" class="p-button p-button-secondary p-button-outlined"></button>
              <button pButton type="button" label="Success" class="p-button p-button-success p-button-outlined"></button>
            </div>
          </div>
          
          <div class="token-debug">
            <h4>Active CSS Variables:</h4>
            <div class="token-list">
              <div class="token-item">--blue-500: <span class="color-box" [style.background]="'var(--blue-500)'"></span></div>
              <div class="token-item">--cyan-50: <span class="color-box" [style.background]="'var(--cyan-50)'"></span></div>
              <div class="token-item">--green-500: <span class="color-box" [style.background]="'var(--green-500)'"></span></div>
              <div class="token-item">--orange-500: <span class="color-box" [style.background]="'var(--orange-500)'"></span></div>
              <div class="token-item">--red-500: <span class="color-box" [style.background]="'var(--red-500)'"></span></div>
            </div>
          </div>
        </div>
      `,
      props: {
        currentTheme: args.theme
      },
      styles: [`
        .theme-demo {
          padding: 2rem;
          background: var(--surface-ground, #EFF2F4);
          border-radius: 8px;
          font-family: 'Inter', system-ui, sans-serif;
        }

        .theme-demo h3 {
          margin: 0 0 1rem 0;
          color: #333;
          text-transform: capitalize;
        }

        .theme-demo h4 {
          margin: 1.5rem 0 0.5rem 0;
          color: #555;
          font-size: 14px;
          font-weight: 600;
        }

        .component-examples {
          margin: 2rem 0;
        }

        .button-grid {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }

        .token-debug {
          margin-top: 2rem;
          padding: 1rem;
          background: rgba(255,255,255,0.5);
          border-radius: 6px;
          border: 1px solid var(--surface-400, #E2E6EB);
        }

        .token-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.5rem;
        }

        .token-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: monospace;
          font-size: 12px;
        }

        .color-box {
          width: 16px;
          height: 16px;
          border-radius: 3px;
          border: 1px solid rgba(0,0,0,0.1);
        }

        /* Apply token styles to buttons */
        .p-button {
          font-family: 'Inter', system-ui, sans-serif !important;
          font-weight: 500 !important;
          transition: all 0.2s ease !important;
          border: 1px solid transparent !important;
        }

        .p-button.p-button-primary {
          background: var(--blue-500) !important;
          border-color: var(--blue-500) !important;
          color: #ffffff !important;
        }
        .p-button.p-button-primary:hover:not(:disabled) {
          background: var(--blue-600) !important;
          border-color: var(--blue-600) !important;
        }

        .p-button.p-button-secondary {
          background: var(--cyan-50) !important;
          border-color: var(--surface-400) !important;
          color: var(--blue-700) !important;
        }
        .p-button.p-button-secondary:hover:not(:disabled) {
          background: var(--cyan-100) !important;
          border-color: var(--surface-500) !important;
        }

        .p-button.p-button-success {
          background: var(--green-500) !important;
          border-color: var(--green-500) !important;
          color: #ffffff !important;
        }
        .p-button.p-button-success:hover:not(:disabled) {
          background: var(--green-600) !important;
          border-color: var(--green-600) !important;
        }

        .p-button.p-button-info {
          background: var(--cyan-500) !important;
          border-color: var(--cyan-500) !important;
          color: #ffffff !important;
        }
        .p-button.p-button-info:hover:not(:disabled) {
          background: var(--cyan-600) !important;
          border-color: var(--cyan-600) !important;
        }

        .p-button.p-button-warning {
          background: var(--orange-500) !important;
          border-color: var(--orange-500) !important;
          color: #ffffff !important;
        }
        .p-button.p-button-warning:hover:not(:disabled) {
          background: var(--orange-600) !important;
          border-color: var(--orange-600) !important;
        }

        .p-button.p-button-danger {
          background: var(--red-500) !important;
          border-color: var(--red-500) !important;
          color: #ffffff !important;
        }
        .p-button.p-button-danger:hover:not(:disabled) {
          background: var(--red-600) !important;
          border-color: var(--red-600) !important;
        }

        .p-button.p-button-outlined {
          background: transparent !important;
        }
        .p-button.p-button-outlined.p-button-primary {
          color: var(--blue-500) !important;
          border-color: var(--blue-500) !important;
        }
        .p-button.p-button-outlined.p-button-secondary {
          color: var(--blue-700) !important;
          border-color: var(--surface-400) !important;
        }
        .p-button.p-button-outlined.p-button-success {
          color: var(--green-500) !important;
          border-color: var(--green-500) !important;
        }
      `]
    };
  }
};

export default meta;
type Story = StoryObj<ThemeControlsArgs>;

export const ThemeSwitcher: Story = {
  args: {
    theme: 'light'
  }
};
